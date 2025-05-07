import {
  FaArrowAltCircleRight,
  FaArrowRight,
  FaBars,
  FaClock,
  FaComment,
  FaCommentAlt,
  FaEye,
  FaFlag,
  FaHome,
  FaPlusCircle,
  FaQuoteLeft,
  FaTags,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { addComment, getComments } from "../../services/commentApiService";
import {
  getReactionsForPost,
  reactToPost,
} from "../../services/reactionApiService";
import { useCallback, useEffect, useState } from "react";

import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import AuthorInfoModal from "../../components/authorInfoModal/AuthorInfoModal";
import BlogReadingTimeCounter from "../../components/blogReadingTimeCounter/BlogReadingTimeCounter";
import BookmarkButton from "../../components/bookmarkButton/BookmarkButton";
import CTAButton from "../../components/buttons/CTAButton";
import CommentCard from "../../components/comment/CommentCard";
import SocialMediaLinks from "../../components/socialMediaLinks/SocialMediaLinks";
import dateFormatter from "../../utils/dateFormatter";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useFlagBlogPost from "../../hooks/useFlagBlogPost";
import { useMutation } from "@tanstack/react-query";
import useWordCount from "../../admin/adminHooks/useWordCount";

const BlogDetailsPage = () => {
  const { user } = useAuth();
  const blog = useLoaderData();
  const slug = blog?.slug || blog?.blog?.slug;
  const wordCount = useWordCount(blog?.content);
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [reactions, setReactions] = useState({ likes: 0, dislikes: 0 });
  const {
    _id,
    title,
    author,
    content,
    category,
    tags,
    excerpt,
    image,
    publishAt,
    flaggedReason,
  } = blog || {};

  const navigate = useNavigate();
  const location = useLocation();
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [isViewCommentsOpen, setIsViewCommentsOpen] = useState(false);
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const { mutate, isLoading } = useFlagBlogPost();
  const [reason, setReason] = useState("");
  const [customComment, setCustomComment] = useState("");
  const [fetchedComments, setFetchedComments] = useState([]);
  // Comment form related code
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

  // Handle mutation TanStack Query to Add Comment
  const { mutate: submitComment, isPending } = useMutation({
    mutationFn: (formData) => addComment(slug, formData),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        // Reset the form
        setFormData({
          name: "",
          email: "",
          content: "",
        });
        fetchCommentsList?.();
      }
    },
    onError: (error) => {
      if (error.response && error.response.data?.message) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Something went wrong while commenting.");
      }
    },
  });

  const predefinedReasons = [
    "Spam",
    "Offensive Content",
    "Misinformation",
    "Misleading Information",
    "Harassment",
    "Other",
  ];

  /**==========================================
   * FETCH COMMENTS LIST
   *===========================================*/
  const fetchCommentsList = useCallback(async () => {
    const commentData = await getComments(slug);
    if (commentData) {
      setFetchedComments(commentData);
    }
  }, [slug]);

  useEffect(() => {
    fetchCommentsList();
  }, [fetchCommentsList]);

  /**==========================================
   * FETCH LIKE AND DISLIKES
   *===========================================*/
  const fetchReactions = useCallback(async () => {
    const reactionsData = await getReactionsForPost(slug);
    if (reactionsData) {
      setReactions(reactionsData);
    }
  }, [slug]);

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  const handleLike = async (slug) => {
    try {
      const response = await reactToPost(slug, { type: "like" });
      if (response.success) {
        toast.success(response.message);
        fetchReactions();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Something went wrong while reacting to the post.");
      }
    }
  };

  /**==========================================
   * HANDLE DISLIKES
   *===========================================*/
  const handleDislike = async (slug) => {
    try {
      const response = await reactToPost(slug, { type: "dislike" });
      if (response?.success) {
        toast.success(response?.message);
        fetchReactions();
      }
    } catch (error) {
      if (error.response && error.response.data?.message) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Something went wrong while reacting to the post.");
      }
    }
  };

  /**==========================================
   * HANDLE VIEW COMMENTS TOGGLER
   *===========================================*/
  const handleViewCommentsToggle = () => {
    setIsViewCommentsOpen((prev) => !prev);
  };

  /**==============================================
   * FAGGING POST TOGGLER & FLAG POST FUNCTIONALITY
   *===============================================*/
  const handleFlagToggle = () => {
    setIsFlagOpen((prev) => !prev);
    if (!user) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
  };

  const handleFlagPost = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
    if (!reason) {
      alert("Please select a reason for flagging the post.");
      return;
    }

    mutate({
      slug,
      reason,
      comment: customComment || reason,
    });
  };

  if (blog.error) return <div>Error!</div>;
  if (!blog || blog.length === 0) return <div>No blog found</div>;

  console.log("Form data:", formData);

  /**==================================================
   * COMMENTING FUNCTIONALITY AND COMMENT FORM TOGGLER
   *===================================================*/
  const handleCommentBoxToggle = () => {
    setIsCommentBoxOpen((prev) => !prev);
    if (!user) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    const { name, email, content } = formData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name field is required. ";
    if (!email.trim()) newErrors.email = "Email field is required. ";
    if (!content.trim()) newErrors.content = "Content field is required. ";
    if (content.trim().length < 5)
      newErrors.content = "Content field should have at least 5 characters. ";
    if (content.trim().length > 300)
      newErrors.content = "Content field should be within 300 characters. ";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Add comment
    submitComment(formData);
    fetchCommentsList();
  };

  return (
    <div className="lg:py-4 py-2 dark:bg-gray-800 dark:text-gray-200 shadow-lg">
      {isLoading && <AdminLoader />}

      <div className="lg:max-w-3xl mx-auto">
        <div className="lg:space-y-4 space-y-2">
          {/* Blog content wrapper begins */}
          {/* Blog post title begins */}
          <div className="">
            <Link to="/" className="m-0">
              <h2 className="lg:text-4xl font-extrabold text-gray-900 first-letter:font-roboto first-letter:capitalize first-letter:text-amber-600 first-letter:font-extrabold lg:first-letter:text-5xl first-letter:text-extra-bold">
                {title}
              </h2>
            </Link>
          </div>
          {/* Blog post title ends */}

          {/* Author, follow, reading time, published at section begins */}
          <div className="lg:flex items-center lg:space-y-0 space-y-2 lg:space-x-4 space-x-2">
            <div className="hover:link">
              <div className="flex items-center lg:space-x-3 space-x-2 hover-target">
                <div className="relative">
                  <AuthorInfoModal
                    user={user}
                    title="Bishwajit Paul"
                    author={author}
                  >
                    <>
                      <p>Email: {user?.email}</p>
                      <p>Role: Admin</p>
                      <p>
                        <Link
                          to="https://www.test.com"
                          className="link underline m-0"
                        >
                          I teach everything I know at
                        </Link>
                      </p>
                      <SocialMediaLinks />
                    </>
                  </AuthorInfoModal>
                </div>
              </div>
            </div>

            <div className="">
              <div className="w-20 h-8 rounded-full border border-1 border-gray-800 px-4 py-2 flex items-center justify-center hover:bg-gray-600 hover:text-base-200 text-gray-600">
                Follow
              </div>
            </div>
            <div className="h-8 border border-gray-300 rounded-full shadow-sm flex items-center lg:space-x-2 lg:px-4 px-2 py-2 hover:bg-gray-600 hover:text-base-200 text-gray-600">
              <span>Read in:</span>
              <span className="italic">
                {<BlogReadingTimeCounter content={content} />}
              </span>
            </div>
            <div className="border border-gray-300 rounded-full shadow-sm h-8 lg:px-4 px-2 py-2 hover:bg-gray-600 hover:text-base-200 flex items-center">
              <p className="text-gray-600 flex items-center space-x-2 hover:text-base-200">
                <FaClock className="" />
                <span>{dateFormatter(publishAt)}</span>
              </p>
            </div>
          </div>
          {/* Author, follow, reading time, published at section ends */}

          {/* Flagging and dislikes flagged section begins */}
          <div className="lg:flex items-center lg:space-x-4 lg:space-y-0 space-y-2">
            {/* Flagged reason display begins */}
            <div className="">
              {flaggedReason.length > 0 ? (
                flaggedReason.map((reason) => (
                  <div
                    key={reason._id}
                    className="flex items-center w-fit font-bold lg:text-[17px] text-xs lg:space-x-2 space-x-1"
                  >
                    <span>
                      <FaFlag />
                    </span>

                    <span
                      className={`${
                        reason.length > 0
                          ? "text-red-500 bg-base-100"
                          : "bg-amber-500"
                      } animate-pulse px- rounded-md`}
                    >
                      {reason}
                    </span>
                  </div>
                ))
              ) : (
                <span className="flex items-center w-fit font-bold rounded-md lg:text-[17px] text-xs lg:space-x-2">
                  <span>{reason.length}</span>
                </span>
              )}
            </div>
            {/* Flagged reason display ends */}
            <div>||</div>
            {/* Likes dislikes section begins */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center lg:space-x-2 space-x-1">
                <span className="">
                  <FaThumbsUp />
                </span>
                <span className="flex items-center justify-between rounded-sm border border-gray-500 p-2 w-6 h-6">
                  {reactions.likeCount}
                </span>
              </div>
              <div className="flex items-center lg:space-x-2 space-x-1">
                <span className="">
                  <FaThumbsDown />
                </span>
                <span className="flex items-center justify-between rounded-sm border border-gray-500 p-2 w-6 h-6">
                  {reactions.dislikeCount}
                </span>
              </div>
            </div>
            {/* Likes dislikes section ends */}

            <div className="">||</div>

            {/* Social media links section begins */}
            <div className="">
              <SocialMediaLinks />
            </div>
            {/* Social media links section ends */}
          </div>
          {/* Flagging and dislikes flagged section ends */}

          {/* Category & tags section begins */}
          <div className="lg:flex grid gap-2 items-center lg:space-x-2">
            <div className="flex items-center">
              <span className="flex items-center w-fit font-bold rounded-md mr-2 py-1 lg:text-[17px] text-xs">
                <span>
                  <FaBars />
                </span>
              </span>
              <span className="">
                {category ? (
                  <span className="bg-gray-200 flex items-center w-fit font-bold text-gray-600  rounded-md px-2 py-1 mr-2 lg:text-[17px] text-xs capitalize">
                    {category.name}
                  </span>
                ) : (
                  "N/A"
                )}
              </span>
            </div>
            <div>||</div>
            <div className="">
              <div className="flex items-center">
                <span className="flex items-center w-fit font-bold   rounded-md mr-2 lg:text-[17px] text-xs">
                  <span>
                    <FaTags />
                  </span>
                </span>
                {tags && tags.length > 0 ? (
                  tags.map((tag) => (
                    <span key={tag._id}>
                      <span className="bg-gray-200 flex items-center w-fit font-bold text-gray-600  rounded-md px-2 py-1 mr-2 lg:text-[17px] text-xs">
                        {tag.name}
                      </span>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">No tags available</span>
                )}
              </div>
            </div>
          </div>
          {/* Category & tags section ends */}

          {/* Comments-count & bookmarks section begins */}
          <div className="flex items-center lg:space-x-2 space-x-1">
            <span>
              <FaComment />
            </span>
            <span className="w-6 h-6 p-1 flex items-center justify-center rounded-full bg-gray-200 shadow-sm font-semibold">
              {fetchedComments.length > 0 ? fetchedComments.length : 0}
            </span>
            <span className="">
              <BookmarkButton blogId={_id} />
            </span>
          </div>
          {/* Comments-count & bookmarks section ends */}

          {/* Excerpt section begins */}
          <div className="lg:py-4 py-2">
            {excerpt ? (
              <div className="lg:min-h-32 min-h-32">
                <div className="min-h-[40px] relative">
                  <FaQuoteLeft className="absolute top-0 text-xl font-bold text-gray-600 dark:text-gray-300" />
                  <p
                    className="absolute top-0 indent-7 font-bold lg:text-gray-600 text-gray-500 italic lg:text-xl dark:text-gray-300 py-2"
                    dangerouslySetInnerHTML={{
                      __html: excerpt ? blog.excerpt : "N/A",
                    }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-red-500 text-md font-bold">
                😃 No blog summary is available now.
              </p>
            )}
          </div>
          {/* Excerpt section ends */}

          {/* Blog image section begins */}
          <div className="lg:my-10 my-4">
            <Link to="/" className="m-0">
              <img
                src={`${apiURL}${image}`}
                alt={title.slice(0, 15)}
                className="w-full min-h-48 object-cover shadow-md rounded-lg"
              />
            </Link>
          </div>
          {/* Blog image section ends */}

          {/* Blog post content section begins */}
          <div className="">
            <p
              dangerouslySetInnerHTML={{
                __html: content,
              }}
              className="prose max-w-none list-decimal text-gray-700 mb-4 indent-7"
            ></p>
          </div>

          <div className="flex items-center lg:justify-start justify-center lg:space-x-6 space-x-2">
            <p className="text-gray-500">
              <span className="lg:text-xl text-sm text-gray-500">
                Words count:
              </span>{" "}
              <span className="italic lg:text-xl text-sm text-gray-500">
                {wordCount}
              </span>{" "}
            </p>
          </div>
          {/* Blog post content section ends */}
        </div>
        {/* Blog content wrapper ends */}

        <div className="flex w-full flex-col">
          <div className="divider font-bold">Like Dislike Section</div>
        </div>

        {/* Like & dislike button begins */}
        <div className="lg:flex grid gap-2 items-center justify-center lg:space-x-16 lg:space-y-0 space-y-4 lg:py-6 py-4">
          <div className="relative">
            <CTAButton
              onClick={() => handleLike(slug)}
              label={`${reactions.likeCount > 0 ? "Liked" : "Like"}`}
              icon={<FaThumbsUp />}
              variant="primary"
              className="btn lg:text-xl text-sm lg:btn-md btn-sm rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90 lg:w-40 w-40"
            />
            <div className="absolute -top-5 -left-5 size-8 rounded-full bg-teal-500 shadow-md text-base-100 flex items-center justify-center font-semibold">
              {reactions.likeCount}
            </div>
          </div>

          <div className="relative">
            <CTAButton
              label={`${reactions.dislikeCount > 0 ? "Disliked" : "Dislike"}`}
              onClick={() => handleDislike(slug)}
              icon={<FaThumbsDown />}
              variant="warning"
              className="btn lg:text-xl text-sm lg:btn-md btn-sm rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90 lg:w-40 w-40"
            />

            <div className="absolute -top-5 -left-5 size-8 rounded-full bg-amber-700 shadow-md text-base-100 flex items-center justify-center">
              {reactions.dislikeCount}
            </div>
          </div>
          {!isFlagOpen ? (
            <CTAButton
              onClick={handleFlagToggle}
              label="Flag Post"
              icon={<FaFlag />}
              variant="info"
              className="btn lg:text-xl text-sm lg:btn-md btn-sm rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90 lg:w-40 w-40"
            />
          ) : (
            <>
              <CTAButton
                onClick={handleFlagPost}
                label="Flag Post Now"
                icon={<FaFlag />}
                variant="info"
                className="btn lg:text-xl text-sm lg:btn-md btn-sm rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90 lg:w-48 w-40"
              />
              {isFlagOpen && (
                <div className="lg:w-48 w-40">
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="select lg:select-md select-sm lg:w-48 w-40"
                  >
                    <option disabled value="">
                      Select one reason
                    </option>
                    {predefinedReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>

                  {reason === "Other" && (
                    <textarea
                      className="textarea textarea-bordered w-full max-w-xs"
                      rows="3"
                      placeholder="Custom comment..."
                      value={customComment}
                      onChange={(e) => setCustomComment(e.target.value)}
                    />
                  )}
                </div>
              )}
              <CTAButton
                onClick={handleFlagToggle}
                label="Cancel Flagging"
                icon={<FaFlag />}
                variant="warning"
                className="btn lg:text-xl text-sm lg:btn-md btn-sm rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90 lg:w-52 w-40"
              />
            </>
          )}
        </div>
        {/* Like & dislike button ends */}
      </div>

      {/* Comments section begins */}
      <div className="lg:flex w-full flex-col lg:max-w-3xl mx-auto">
        <div className="divider font-bold">Comments Section</div>
      </div>
      <div className="lg:mx-auto lg:w-1/2 w-full">
        <div className="flex items-center justify-between lg:space-x- space-x-6 lg:py-6 py-4 lg:px-0 px-2">
          <CTAButton
            onClick={handleCommentBoxToggle}
            label={isCommentBoxOpen ? "Hide Comment Box" : "Add Comment"}
            icon={<FaComment />}
            variant="primary"
            className="btn lg:text-xl text-sm lg:btn-md btn-sm rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90"
          />
          <div className="relative">
            <button
              type="button"
              className="border border-1 font-normal border-gray-500 min-w-32 rounded-full py-1 px-4 transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90 flex items-center space-x-2 shadow-sm"
            >
              <span>
                <FaCommentAlt />
              </span>{" "}
              <span>Add comment</span>
            </button>

            <div className="absolute 6-8 w-8 border border-1 border-gray-500 rounded-full p-1 -top-5 -left-6 flex items-center justify-center shadow-sm text-sm">
              10
            </div>
          </div>
          <div className="relative">
            <CTAButton
              onClick={handleViewCommentsToggle}
              label={isViewCommentsOpen ? "Hide Comments" : "View Comments"}
              icon={<FaEye />}
              variant="info"
              className="btn lg:text-xl text-sm lg:btn-md btn-sm rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90 lg:w-56 w-[152px]"
            />
            <div className="absolute -top-5 -left-5 size-8 bg-teal-600 text-white font-semibold flex items-center justify-center rounded-full shadow-md">
              {fetchedComments.length > 0 ? fetchedComments.length : 0}
            </div>
          </div>
        </div>
      </div>

      {/* Comments list & comment form box begins */}
      {isCommentBoxOpen && (
        <div className="my-4">
          <div className="mx-auto lg:w-1/2 w-full bg-gray-200 lg:p-8 p-2 rounded-lg shadow-sm">
            <div className="lg:my-4 my-2">
              <h2 className="font-bold lg:text-3xl text-xl flex items-center">
                <FaCommentAlt className="mr-1" /> Add Your Comment
              </h2>
            </div>
            <form
              action=""
              onSubmit={handleSubmitComment}
              className="lg:space-y-3 space-y-2"
            >
              <input
                onChange={handleChange}
                type="text"
                name="name"
                value={formData.name}
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
              <input
                onChange={handleChange}
                type="email"
                value={formData.email}
                name="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
              <textarea
                onChange={handleChange}
                className="textarea w-full"
                name="content"
                value={formData.content}
                type="text"
                id=""
                rows="4"
                cols="50"
                placeholder="Your Comment"
              ></textarea>
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content}</p>
              )}

              <div className="flex items-center space-x-4 mt-4">
                <CTAButton
                  label={isPending ? "Submitting..." : "Submit Comment"}
                  disabled={isPending}
                  type="submit"
                  icon={<FaPlusCircle />}
                  variant="primary"
                  className="btn lg:text-xl text-sm lg:btn-md btn-sm rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90"
                />
                <CTAButton
                  onClick={handleCommentBoxToggle}
                  type="submit"
                  label="Cancel"
                  icon={<FaArrowAltCircleRight />}
                  variant="secondary"
                  className="btn lg:text-xl text-sm lg:btn-md btn-sm rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90"
                />
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="">
        {isViewCommentsOpen && (
          <div className="lg:px-4 px-2">
            <div className="px-2 border-b-2">
              <h2 className="lg:text-2xl text-xl mb-4 font-bold text-gray-600 first-letter:font-roboto first-letter:capitalize first-letter:text-amber-600 first-letter:font-extrabold lg:first-letter:text-5xl first-letter:text-extra-bold flex items-center">
                <FaComment className="mr-1" /> Comments List{" "}
                <span className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-400 p-[2px] ml-2">
                  {fetchedComments?.length > 0 ? fetchedComments?.length : 0}
                </span>
              </h2>
            </div>
            {fetchedComments.length > 0 ? (
              fetchedComments?.map((comment, index) => (
                <CommentCard
                  key={comment._id}
                  comment={comment}
                  slug={slug}
                  onDataChanged={fetchCommentsList}
                  index={index}
                />
              ))
            ) : (
              <p className="flex justify-center lg:text-xl text-gray-500 lg:pt-6 pt-2">
                No comments yet. Be the first to comment right now!
              </p>
            )}
          </div>
        )}
      </div>
      {/* Comments list & comment box ends */}

      {/* Floating button to lead to homepage begins */}
      <div className="">
        <Link to="/">
          <div
            className="tooltip fixed top-1/2 left-[10%] transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 z-50 text-orange-500 px-3 py-1 shadow-lg h-14 w-14 opacity-50 rounded-full border border-gray-400 flex items-center justify-center"
            data-tip="Go Home Page"
          >
            <FaArrowRight className="text-gray-500 text-xl" />
          </div>
        </Link>
      </div>
      {/* Floating button to lead to homepage ends */}

      {/* Comments section ends */}
      <div className="lg:flex justify-end items-center space-x-4 lg:px-0 px-1">
        <Link to="/" className="m-0 flex items-center w-full">
          <CTAButton
            label="Go Home Page"
            icon={<FaHome />}
            variant="secondary"
            className="btn lg:text-xl text-sm lg:w-1/2 w-full mx-auto lg:btn-md btn-sm rounded-lg"
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogDetailsPage;

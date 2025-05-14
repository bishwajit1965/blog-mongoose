import {
  FaArrowAltCircleRight,
  FaArrowLeft,
  FaClock,
  FaComment,
  FaCommentAlt,
  FaEye,
  FaEyeSlash,
  FaFlag,
  FaHome,
  FaPlusCircle,
  FaQuoteLeft,
  FaRegTimesCircle,
  FaTags,
  FaThList,
  FaThumbsDown,
  FaThumbsUp,
  FaTimesCircle,
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
import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import AuthorInfoModal from "../../components/authorInfoModal/AuthorInfoModal";
import BlogDetailsPageSkeleton from "./BlogDetailsPageSkeleton";
import BlogReadingTimeCounter from "../../components/blogReadingTimeCounter/BlogReadingTimeCounter";
import BookmarkButton from "../../components/bookmarkButton/BookmarkButton";
import Button from "../../components/buttons/Button";
import CTAButton from "../../components/buttons/CTAButton";
import CommentCard from "../../components/comment/CommentCard";
import SocialMediaLinks from "../../components/socialMediaLinks/SocialMediaLinks";
import dateFormatter from "../../utils/dateFormatter";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useFlagBlogPost from "../../hooks/useFlagBlogPost";
import { useMutation } from "@tanstack/react-query";
import useWordCount from "../../admin/adminHooks/useWordCount";

// Button active state style
const style = {
  active:
    "bg-teal-500 text-gray-100 hover:bg-emerald-700 border border-1 border-emerald-400 shadow-md focus:ring-2 focus:ring-offset-2 transition-transform duration-300 border-none",
};

const BlogDetailsPage = () => {
  const { user } = useAuth();
  const blog = useLoaderData();
  const slug = blog?.slug || blog?.blog?.slug;
  const wordCount = useWordCount(blog?.content);
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [isViewCommentsOpen, setIsViewCommentsOpen] = useState(false);
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const { mutate, isLoading } = useFlagBlogPost();
  const [reason, setReason] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [customComment, setCustomComment] = useState("");
  const [fetchedComments, setFetchedComments] = useState([]);
  const [activeComment, setActiveComment] = useState(false);
  const navigate = useNavigate();
  const leftColumnRef = useRef(null);
  const controls = useAnimation();
  const location = useLocation();
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a delay
    return () => clearTimeout(timer);
  }, []);

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

  /**==========================================
   * HANDLE LIKES
   *===========================================*/
  const handleLike = async (slug) => {
    try {
      const response = await reactToPost(slug, { type: "like" });
      if (response.success) {
        toast.success(response.message);
        fetchReactions();
        handleLikePostToggler();
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
        handleDislikedPostToggler();
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
    handleCommentsViewToggler();
  };

  /**==============================================
   * FAGGING POST TOGGLER & FLAG POST FUNCTIONALITY
   *===============================================*/
  const handleFlagToggle = () => {
    setIsFlagOpen((prev) => !prev);
    handleFlagPostToggler();
    handleCancelFlagPostNowToggler();
    if (!user) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
  };

  /**======================================================
   * VANISH THE LEFT FLOATING TEXT BOX ON SCROLL TOP BEGINS
   *=======================================================*/
  useEffect(() => {
    const handleScroll = () => {
      if (leftColumnRef.current) {
        const rect = leftColumnRef.current.getBoundingClientRect();
        if (rect.top <= 80) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: isVisible ? 1 : 0,
      transition: { duration: 0.5 },
    });
  }, [isVisible, controls]);
  /**======================================================
   * VANISH THE LEFT FLOATING TEXT BOX ON SCROLL TOP ENDS
   *=======================================================*/

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
    handleFlagPostNowToggler();

    mutate({
      slug,
      reason,
      comment: customComment || reason,
    });
  };

  /**==========================================
   * HANDLE ACTIVE BUTTON TOGGLE VIEW
   *===========================================*/
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [flag, setFlag] = useState(false);
  const [flagPostNow, setFlagPostNow] = useState(false);
  const [cancelFlag, setCancelFlag] = useState(false);

  const handleActiveButton = () => {
    setActiveComment((prev) => !prev);
  };

  const handleCommentsViewToggler = () => {
    setIsOpenComments((prev) => !prev);
  };

  const handleLikePostToggler = () => {
    setIsDisliked(false);
    setIsLiked((prev) => !prev);
  };
  const handleDislikedPostToggler = () => {
    setIsLiked(false);
    setIsDisliked((prev) => !prev);
  };

  const handleFlagPostToggler = () => {
    setFlag((prev) => !prev);
  };

  const handleFlagPostNowToggler = () => {
    setFlagPostNow((prev) => !prev);
  };
  const handleCancelFlagPostNowToggler = () => {
    setCancelFlag((prev) => !prev);
    setFlagPostNow((prev) => !prev);
  };

  if (blog.error) return <div>Error!</div>;
  if (!blog || blog.length === 0) return <div>No blog found</div>;

  console.log("Form data:", formData);

  /**==================================================
   * COMMENTING FUNCTIONALITY AND COMMENT FORM TOGGLER
   *===================================================*/
  const handleCommentBoxToggle = () => {
    setIsCommentBoxOpen((prev) => !prev);
    handleActiveButton();
    if (!user) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
  };

  /**==========================================
   * LOAD DATA TO RESPECTIVE VARIABLE PROPS
   *===========================================*/
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**==========================================
   * HANDLE SUBMIT THE FORM DATA TO PROCESS
   *===========================================*/
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

  if (loading) {
    return (
      <div className="col-span-12 lg:col-span-8">
        {[...Array(1)].map((_, index) => (
          <BlogDetailsPageSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="lg:py-4 p-2 dark:bg-gray-800 dark:text-gray-200 lg:shadow-lg relative">
      {isLoading && <AdminLoader />}

      {/* Floating text box left top begins */}
      <div>
        <motion.div
          ref={leftColumnRef}
          animate={controls}
          className="w-[14rem] bg-gray-100 p-4 absolute top-6 left-2 rounded-md invisible lg:visible shadow-md"
        >
          <div className="border-b w-full border-gray-400">
            <h1 className="text-xl font-bold">✅Hello Viewers!!</h1>
          </div>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            tenetur velit excepturi voluptatem iusto, dolorum consectetur aut
            sed, consequuntur nisi adipisci molestias distinctio pariatur vitae
            et voluptatibus sit error. Odio.
          </p>
        </motion.div>
      </div>
      {/* Floating text box left top ends */}

      <div className="lg:max-w-3xl mx-auto">
        <div className="lg:space-y-3 space-y-2">
          {/* Blog content wrapper begins */}
          {/* Blog post title begins */}
          <div className="lg:mb-7">
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
          <div className="lg:flex items-center lg:space-x-8 lg:space-y-0 space-y-2">
            {/* Flagged reason display begins */}
            <div className="flex items-center lg:space-x-3 space-x-2">
              <span>
                <FaFlag />
              </span>
              {flaggedReason.length > 0 ? (
                flaggedReason.map((reason) => (
                  <div
                    key={reason._id}
                    className="flex items-center w-fit font-bold lg:text-[17px] text-xs lg:space-x-2 space-x-1"
                  >
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

            {/* Likes dislikes section begins */}
            <div className="flex items-center lg:space-x-4">
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

            {/* Social media links section begins */}
            <div className="flex justify-end">
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
                  <FaThList />
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
                      <span className="bg-gray-200 flex items-center w-fit font-bold text-gray-600 rounded-md px-2 py-1 mr-2 lg:text-[17px] text-xs">
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
              <div className="lg:min-h-24 min-h-40">
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
          <div className="lg:pt-6 pt-4">
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
        <div className="grid lg:grid-cols-3 grid-col-1 gap-2 items-center justify-center w-full lg:justify-between lg:space-x- lg:space-y-0 space-y-4 lg:py-4 py-4">
          <div className="relative lg:flex lg:justify-start grid justify-center">
            <Button
              onClick={() => handleLike(slug)}
              label={`${reactions.likeCount > 0 ? "Liked Post" : "Like Post"}`}
              icon={reactions.likeCount > 0 ? <FaThumbsUp /> : <FaThumbsDown />}
              variant={isLiked ? "active" : "white"}
              className="lg:min-w-44 min-w-44"
            />
            <div
              className={`${
                reactions.likeCount > 0 ? style.active : "white"
              } absolute lg:-top-5 lg:-left-5 -top-5 -right-5 w-8 h-8 p-1 border border-1 border-gray-400 rounded-full flex items-center justify-center`}
            >
              {reactions.likeCount}
            </div>
          </div>

          <div className="relative lg:flex lg:justify-center grid justify-center">
            <Button
              label={`${
                reactions.dislikeCount > 0 ? "Disliked Post" : "Dislike Post"
              }`}
              onClick={() => handleDislike(slug)}
              icon={
                reactions.dislikeCount > 0 ? <FaThumbsDown /> : <FaThumbsUp />
              }
              variant={isDisliked ? "active" : "white"}
              className="lg:min-w-44 min-w-44"
            />
            <div
              className={`${
                reactions.dislikeCount > 0 ? style.active : "white"
              } absolute lg:-top-5 lg:left-4 -top-5 -right-5 w-8 h-8 p-1 border border-1 border-gray-400 rounded-full flex items-center justify-center`}
            >
              {reactions.dislikeCount}
            </div>
          </div>
          {!isFlagOpen ? (
            <div className="lg:flex lg:justify-end">
              <Button
                onClick={handleFlagToggle}
                label="Flag Post"
                icon={<FaFlag />}
                variant={flag ? "active" : "white"}
                className="lg:min-w-44 min-w-44"
              />
            </div>
          ) : (
            <>
              <div className="lg:flex lg:justify-end grid justify-center">
                <Button
                  onClick={handleFlagPost}
                  label="Flag Post Now"
                  icon={<FaFlag />}
                  variant={flagPostNow ? "active" : "white"}
                  disabled={isPending}
                  className="lg:min-w-44 min-w-44"
                />
              </div>
              {isFlagOpen && (
                <div className="">
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="select lg:select-sm select-sm lg:max-w-44 max-w-44 rounded-full"
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
                      className="textarea textarea-bordered lg:max-w-44 max-w-44 "
                      rows="3"
                      placeholder="Custom comment..."
                      value={customComment}
                      onChange={(e) => setCustomComment(e.target.value)}
                    />
                  )}
                </div>
              )}
              <div className="flex lg:justify-center justify-center flex-start">
                <Button
                  onClick={handleFlagToggle}
                  label="Cancel Flagging"
                  icon={<FaRegTimesCircle />}
                  variant={cancelFlag ? "white" : "warning"}
                  className="lg:min-w-44 min-w-44 flex justify-end"
                />
              </div>
            </>
          )}
        </div>
        {/* Like & dislike button ends */}
      </div>

      {/* Comments section begins */}
      <div className="lg:flex w-full flex-col lg:max-w-3xl mx-auto">
        <div className="divider font-bold">Comments Section</div>
      </div>

      <div className="lg:max-w-3xl mx-auto w-full">
        <div className="lg:flex grid gap-6 items-center lg:justify-between justify-center lg:py-4 py-4 lg:px-0 px-2">
          <div className="relative">
            <Button
              onClick={handleCommentBoxToggle}
              icon={!activeComment ? <FaComment /> : <FaTimesCircle />}
              label={activeComment ? "Hide Form" : "Add Comment"}
              variant={activeComment ? "active" : "white"}
              className="lg:text-[1rem] text-[1rem] lg:min-w-44 min-w-44"
            />
            <div
              className={`${
                activeComment ? style.active : "white"
              } absolute lg:-top-5 lg:-left-5 -top-5 -right-5 w-8 h-8 p-1 border border-1 border-gray-400 rounded-full flex items-center justify-center`}
            >
              {fetchedComments.length > 0 ? fetchedComments.length : 0}
            </div>
          </div>
          <div className="relative">
            <Button
              onClick={handleViewCommentsToggle}
              label={isViewCommentsOpen ? "Hide Comments" : "View Comments"}
              icon={!isViewCommentsOpen ? <FaEye /> : <FaEyeSlash />}
              variant={isOpenComments ? "active" : "white"}
              className="lg:text-[1rem] text-[1rem] lg:min-w-44 min-w-44"
            />
            <div
              className={`${
                isOpenComments ? style.active : "white"
              } absolute -top-5 -left-5 w-8 h-8 p-1 border border-1 border-gray-400 rounded-full flex items-center justify-center`}
            >
              {fetchedComments.length > 0 ? fetchedComments.length : 0}
            </div>
          </div>
        </div>
      </div>

      {/* Comments list & comment form box begins */}
      {isCommentBoxOpen && (
        <div className="my-4">
          <div className="mx-auto lg:max-w-3xl w-full bg-gray-200 lg:p-8 p-2 rounded-lg shadow-sm">
            <div className="lg:my-4 my-2">
              <h2 className="font-bold lg:text-3xl text-xl flex items-center">
                <FaCommentAlt className="mr-1" /> Add Comment
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
                  className="btn lg:text-normal text-sm btn-sm transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90"
                />
                <CTAButton
                  onClick={handleCommentBoxToggle}
                  type="submit"
                  label="Cancel"
                  icon={<FaArrowAltCircleRight />}
                  variant="warning"
                  className="btn lg:text-normal text-sm btn-sm transition-all duration-200 ease-in-out transform hover:scale-105 hover:brightness-90"
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
            className="tooltip fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 z-50 text-orange-500 px-3 py-1 shadow-lg h-14 w-14 opacity-50 rounded-full border border-gray-400 flex items-center justify-center"
            data-tip="Go Home Page"
          >
            <FaArrowLeft className="text-gray-500 text-xl" />
          </div>
        </Link>
      </div>
      {/* Floating button to lead to homepage ends */}

      {/* Comments section ends */}

      <div className="lg:flex justify-end items-center space-x-4 lg:px-0 px-1">
        <Link to="/" className="m-0 flex items-center w-full">
          <Button
            label="Go Home Page"
            icon={<FaHome />}
            variant="secondary"
            className="btn lg:text-xl text-sm lg:max-w-3xl w-full mx-auto lg:btn-md btn-sm rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogDetailsPage;

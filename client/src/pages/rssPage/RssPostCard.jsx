import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import CTAButton from "../../components/buttons/CTAButton";

const RssPostCard = ({ post }) => {
  const { link, title, description, publishDate, image } = post;

  console.log("Post", post);
  return (
    <div className="lg:col-span-4 col-span-12 border dark:border-slate-700 rounded-md p-2 relative shadow-md dark:bg-slate-900">
      <div className="mb-12 text-slate-500 lg:space-y-2 space-y-1">
        <img
          src={image}
          alt={post.title}
          className="w-full h-52 object-cover rounded-md"
        />
        <h1 className="text-2xl font-bold text-slate-500">
          {title.slice(0, 60)}
        </h1>
        <p dangerouslySetInnerHTML={{ __html: description.slice(0, 160) }} />
        <p className="text-slate-500 font-bold">
          {" "}
          Published on:
          <em>{new Date(publishDate).toLocaleString()}</em>
        </p>
      </div>
      <Link to={link} className="m-0 absolute bottom-2">
        <CTAButton
          label="Read More"
          className="btn btn-sm"
          icon={<FaArrowCircleRight />}
          variant="success"
        />
      </Link>
    </div>
  );
};

export default RssPostCard;

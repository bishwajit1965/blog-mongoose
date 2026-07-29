import { useCallback, useEffect, useState } from "react";
import {
  getAuthorBlogCount,
  getAuthorComingSoonPosts,
  getAuthorFollowers,
  getAuthorLatestPosts,
  getAuthorOnlineStatus,
  getAuthorPublicProfile,
} from "../../services/publicAuthorProfileService";
import { useParams } from "react-router-dom";
import AuthorProfileHeader from "./AuthorProfileHeader";
import AuthorLatestPosts from "./AuthorLatestPosts";
import AuthorComingSoonPosts from "./AuthorComingSoonPosts";
import { getAuthorFollowStatus } from "../../services/publicAuthorFollowStatusService";

const AuthorProfile = () => {
  const { authorId } = useParams();
  const [profile, setProfile] = useState({});
  const [blogCount, setBlogCount] = useState(0);
  const [onlineStatus, setOnlineStatus] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [comingSoonPosts, setComingSoonPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followersCount, setFollowersCount] = useState({});
  const [authorFollowStatus, setAuthorFollowStatus] = useState({});

  console.log("Author Id", authorId);
  console.log("Followers response", followers);
  console.log("On line status", onlineStatus);
  console.log("Author follow status", authorFollowStatus);

  const fetchAuthorPublicProfileFeatures = useCallback(async (authorId) => {
    const [
      profileResponse,
      blogCountResponse,
      onLineResponse,
      latestPostResponse,
      comingSoonPostsResponse,
      followersResponse,
      authorFollowStatusResponse,
    ] = await Promise.all([
      getAuthorPublicProfile(authorId),
      getAuthorBlogCount(authorId),
      getAuthorOnlineStatus(authorId),
      getAuthorLatestPosts(authorId),
      getAuthorComingSoonPosts(authorId),
      getAuthorFollowers(authorId),
      getAuthorFollowStatus(authorId),
    ]);

    if (profileResponse) {
      setProfile(profileResponse?.data);
    }

    if (blogCountResponse) {
      setBlogCount(blogCountResponse?.data);
    }

    if (onLineResponse) {
      setOnlineStatus(onLineResponse?.data);
    }

    if (latestPostResponse) {
      setLatestPosts(latestPostResponse?.data);
    }
    if (comingSoonPostsResponse) {
      setComingSoonPosts(comingSoonPostsResponse?.data);
    }

    if (followersResponse) {
      setFollowers(followersResponse?.data?.followers || []);
      setFollowersCount(followersResponse?.data?.followersCount);
    }

    if (authorFollowStatusResponse) {
      setAuthorFollowStatus(authorFollowStatusResponse?.data);
    }
  }, []);

  useEffect(() => {
    fetchAuthorPublicProfileFeatures(authorId);
  }, [fetchAuthorPublicProfileFeatures, authorId]);

  console.log("Profile of Author", profile);

  return (
    <div className="lg:max-w-7xl mx-auto">
      <div className="lg:space-y-8 space-y-4">
        <div className="p-4">
          <AuthorProfileHeader
            profile={profile}
            blogCount={blogCount}
            onlineStatus={onlineStatus}
            followers={followers}
            followerCount={followersCount}
          />
        </div>

        <div className="lg:space-y-8 space-y-4 p-4">
          <h1 className="lg:text-3xl text-xl font-bold">Latest Blog Posts</h1>
          <AuthorLatestPosts latestPosts={latestPosts} />
        </div>

        <div className="lg:space-y-8 space-y-4 p-4">
          <h1 className="lg:text-3xl text-xl font-bold">Coming Soon Posts</h1>
          <AuthorComingSoonPosts comingSoonPosts={comingSoonPosts} />
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;

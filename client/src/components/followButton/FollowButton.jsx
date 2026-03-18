import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../buttons/Button";
import { useFollowUser, useUnfollowUser } from "../../hooks/userFollowers";

const FollowButton = ({ authorId, isFollowingInitial }) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const handleClick = () => {
    if (isFollowing) {
      unfollowMutation.mutate(authorId, {
        onSuccess: (data) => {
          toast.success(data.message || "Unfollowed successfully");
          setIsFollowing(false);
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to unfollow");
        },
      });
    } else {
      followMutation.mutate(authorId, {
        onSuccess: (data) => {
          toast.success(data.message || "Followed successfully");
          setIsFollowing(true);
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to follow");
        },
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={followMutation.isLoading || unfollowMutation.isLoading}
      label={isFollowing ? "Unfollow" : "Follow"}
      variant="white"
    />
  );
};

export default FollowButton;

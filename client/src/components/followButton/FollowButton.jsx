import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../buttons/Button";
import { useFollowUser, useUnfollowUser } from "../../hooks/userFollowers";

const FollowButton = ({ authorId, isFollowingInitial, onSuccess }) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const handleClick = () => {
    if (isFollowing) {
      unfollowMutation.mutate(authorId, {
        onSuccess: (data) => {
          toast.success(data.message || "Unfollowed successfully");
          setIsFollowing(false);
          onSuccess();
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
          onSuccess();
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
      disabled={followMutation?.isPending || unfollowMutation?.isPending}
      label={isFollowing ? "Unfollow" : "Follow"}
      variant={isFollowing ? "success" : "outline"}
    />
  );
};

export default FollowButton;

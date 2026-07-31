import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../buttons/Button";
import { useFollowUser, useUnfollowUser } from "../../hooks/userFollowers";
import { LucideIcon } from "../lucideIcon/LucideIcons";

const FollowButton = ({ authorId, isFollowingInitial, onSuccess }) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  console.log("FOLLOW BUTTON PROP:", isFollowingInitial);
  console.log("FOLLOW BUTTON STATE:", isFollowing);
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

  useEffect(() => {
    setIsFollowing(isFollowingInitial);
  }, [isFollowingInitial]);

  return (
    <Button
      onClick={handleClick}
      disabled={followMutation?.isPending || unfollowMutation?.isPending}
      icon={
        isFollowing ? (
          <LucideIcon.UserMinus size={16} />
        ) : (
          <LucideIcon.UserPlus size={16} />
        )
      }
      label={isFollowing ? "Unfollow" : "Follow"}
      variant={isFollowing ? "outline" : "success"}
    />
  );
};

export default FollowButton;

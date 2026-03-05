import Button from "../buttons/Button";
import { toast } from "react-toastify";
import useApiMutation from "../../hooks/useApiMutation";
import { useState } from "react";

const FollowButton = ({ firebaseUid, isFollowingInitial }) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);

  const followMutation = useApiMutation({
    url: `/users/follow/${firebaseUid}/follow`,
    method: "put",
    onSuccess: () => {
      toast.success("Followed successfully");
      setIsFollowing(true);
    },
    onError: () => toast.error("Failed to follow"),
  });

  const unfollowMutation = useApiMutation({
    url: `/users/follow/${firebaseUid}/unfollow`,
    method: "delete",
    onSuccess: () => {
      toast.success("Unfollowed successfully");
      setIsFollowing(false);
    },
    onError: () => toast.error("Failed to unfollow"),
  });

  const handleClick = () => {
    isFollowing ? unfollowMutation.mutate() : followMutation.mutate();
  };

  return (
    <div className="flex items-center">
      <Button
        onClick={handleClick}
        disabled={followMutation.isPending || unfollowMutation.isPending}
        label={isFollowing ? "Unfollow" : "Follow"}
        variant="white"
      />
    </div>
  );
};

export default FollowButton;

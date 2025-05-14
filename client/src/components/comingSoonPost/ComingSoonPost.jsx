import { useLocation, useNavigate } from "react-router-dom";

import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import Button from "../buttons/Button";
import { CircleCheckBig } from "lucide-react";
import ComingSoonPostCard from "./ComingSoonPostCard";
import { createRequest } from "../../services/requestApiService";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useGetComingSoonPost from "../../hooks/useGetComingSoonPost";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const ComingSoonPost = ({
  title = "Send Coming Soon Request!",
  message = "We are working on something amazing ! Request unhesitatingly & stay tuned for updates!",
  buttonLabel = "Notify Me!",
}) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { data, isPending, isError } = useGetComingSoonPost();

  // Handle mutation TanStack Query to Add Comment
  const { mutate: submitRequest, isPending: isLoading } = useMutation({
    mutationFn: (formData) => createRequest(formData),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        // Reset the form
        setEmail("");
        setName("");
        setTopic("");
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

  const handleSubmitRequest = (e) => {
    e.preventDefault();

    const comingSoonData = {
      name: name,
      email: email,
      topic: topic,
    };

    if (!user) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
    submitRequest(comingSoonData);
  };

  if (isPending) return <AdminLoader />;

  if (isError)
    return (
      <div className="flex justify-between">
        <p>{isError.message}</p>
      </div>
    );

  return (
    <div className="">
      {data?.length === 0 ? (
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-md border border-gray-200 shadow-lg p-4 text-center max-w-md"
          >
            <CircleCheckBig size={48} className="text-blue-500 mb-2" />
            <h1 className="lg:text-2xl text-xl font-semibold mb-2">{title}</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <form action="" onSubmit={handleSubmitRequest}>
              <div className="mb-2">
                <input
                  type="name"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full mb-22"
                />
              </div>

              {name && (
                <div className="mb-2">
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full mb-22"
                  />
                </div>
              )}
              {email && (
                <div className="mb-2">
                  <textarea
                    name="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Your opinion..."
                    className="w-full rounded-md p-2"
                    id=""
                  ></textarea>
                </div>
              )}

              <Button
                type="submit"
                label={buttonLabel}
                className=""
                variant="white"
                disabled={isLoading || !email || !name || !topic}
              >
                {isLoading ? "Submitting..." : buttonLabel}
              </Button>
            </form>
          </motion.div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-2 justify-between">
          {data.map((post) => (
            <ComingSoonPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComingSoonPost;

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import SocialMediaLinks from "../../components/socialMediaLinks/SocialMediaLinks";
import { LucideIcon } from "../../components/lucideIcon/LucideIcons";
import useAuth from "../../hooks/useAuth";
import { createContact } from "../../admin/adminServices/contactService";
import {
  notifyError,
  notifySuccess,
} from "../../admin/adminComponent/adminToastNotification/AdminToastNotification";
import Button from "../../components/buttons/Button";
import { motion } from "framer-motion";
import PageTitle from "../../components/pageTitle/PageTitle";
import { Input } from "../../admin/ui/Input";
import Textarea from "../../admin/ui/Textarea";
import { Link } from "react-router-dom";

const ContactMe = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const { user } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() === "") {
      notifyError("Name is required.");
      return;
    }
    if (!form.email.trim() === "") {
      notifyError("Email is required.");
      return;
    }
    if (!form.message.trim()) {
      notifyError("Message is required.");
      return;
    }

    try {
      setLoading(true);
      const contactPayload = {
        name: user.displayName,
        email: user.email,
        message: form.message,
      };
      console.log("Contact payload", contactPayload);
      await createContact(contactPayload);
      notifySuccess("Message uploaded successfully!");
    } catch (error) {
      console.error("Error in uploading contact message", error);
    } finally {
      setLoading(false);
    }
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <div>
      <Helmet>
        <title>Nova Journal || Contact Page</title>
      </Helmet>

      <motion.section
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=""
      >
        <PageTitle
          title="Contact"
          decoratedText="Me"
          icon={<LucideIcon.Rocket />}
        />

        <div className="max-w-2xl mx-auto text-base-content dark:text-base-300 border dark:border-gray-700 rounded-xl lg:p-6 p-4 shadow hover:shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <h1 className="lg:text-xl text-sm font-extrabold text-gray-700 dark:text-gray-400 flex items-center gap-2">
              <LucideIcon.UserCircle /> Contact with the Nova Journal Super
              Admin
            </h1>
            <Input
              type="text"
              name="name"
              value={user?.displayName || "N/A/GitHubUser"}
              readOnly="readOnly"
              onChange={handleChange}
              placeholder="Your Name"
              className="dark:bg-gray-700 dark:text-gray-400"
              icon={LucideIcon.User}
            />
            <Input
              type="email"
              name="email"
              value={user?.email || "N/A/GithubEmail"}
              readOnly="readOnly"
              onChange={handleChange}
              placeholder="Your Email"
              className="dark:bg-gray-700 dark:text-gray-400"
              icon={LucideIcon.Mail}
            />

            <Textarea
              name="message"
              value={form?.message}
              onChange={handleChange}
              placeholder="Your Message..."
              className="dark:bg-gray-700 dark:text-gray-400"
            ></Textarea>
            <Button
              type="submit"
              variant="indigo"
              disabled={loading}
              icon={
                loading ? (
                  <LucideIcon.Loader className="animate-spin" />
                ) : (
                  <LucideIcon.MailPlus />
                )
              }
              label={loading ? "Sending Message..." : "Send Message"}
              className="w-full py-2"
            />
          </form>

          <div className="text-center text-gray-600 pt-4">
            <p className="flex items-center justify-center">
              <LucideIcon.Mail size={16} />
              <a href="mailto:minu@gmail.com" className="hover:underline">
                paul.bishwajit09@gmail.com
              </a>
            </p>

            <Link
              target="__blank"
              to="https://portfolio-h5k5.vercel.app"
              className="link text-blue-500 text-sm m-0 flex items-center  justify-center gap-2"
            >
              <LucideIcon.Briefcase size={16} /> My Portfolio Link
            </Link>
            <div className="divider m-2 dark:divider-neutral"></div>
            <div className="space-y-2">
              <p>Follow me on: </p>
              <div className="flex justify-center">
                <SocialMediaLinks />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactMe;

import { useState } from "react";
import SocialMediaLinks from "../../components/socialMediaLinks/SocialMediaLinks";
import { LucideIcon } from "../../components/lucideIcon/LucideIcons";
import useAuth from "../../hooks/useAuth";
import { createContact } from "../../admin/adminServices/contactService";
import {
  notifyError,
  notifySuccess,
} from "../../admin/adminComponent/adminToastNotification/AdminToastNotification";
import { motion } from "framer-motion";
import PageTitle from "../../components/pageTitle/PageTitle";
import { Input } from "../../admin/ui/Input";
import { Link } from "react-router-dom";
import Seo from "../../components/seo/Seo";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LucideUserCog2 } from "lucide-react";
import CTAButton from "../../components/buttons/CTAButton";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header options
    ["bold", "italic", "underline"], // Basic formatting
    [{ list: "ordered" }, { list: "bullet" }], // Ordered & unordered lists
    [{ indent: "-1" }, { indent: "+1" }], // Indentation
    ["blockquote", "code-block"], // Block elements
    ["image", "link", "video"], // Media options
    [{ align: [] }], // Alignment options
    [{ color: [] }, { background: [] }], // Text color and background color
    ["clean"], // Remove formatting
  ],
};
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
      await createContact(contactPayload);
      notifySuccess("Message sent successfully!!");
    } catch (error) {
      console.error("Error in sending message", error);
    } finally {
      setLoading(false);
    }
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <div>
      <Seo
        title="Contact Bishwajit Paul | Nova Journal"
        description="Get in touch with Bishwajit Paul for software development discussions, technical collaboration, project inquiries, and professional communication through Nova Journal."
        url="/contact-me"
        schemaType="ContactPage"
      />

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

        <div className="max-w-2xl mx-auto text-base-content bg-white dark:text-base-300 border dark:border-gray-700 dark:bg-gray-800 rounded-xl lg:p-6 p-4 shadow-lg hover:shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <h1 className="lg:text-xl text-sm font-extrabold text-gray-700 dark:text-gray-400 flex items-center gap-2">
              <LucideIcon.UserCircle />
              Hi, {user?.displayName} • Contact the Author 24/7
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

            <ReactQuill
              theme="snow"
              modules={quillModules}
              value={form.message || ""}
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  message: value,
                }));
              }}
            />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <CTAButton
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                icon={
                  loading ? (
                    <LucideIcon.Loader className="animate-spin" />
                  ) : (
                    <LucideIcon.MailPlus size={20} />
                  )
                }
                label={loading ? "Sending Message..." : "Send Message"}
                className=""
              />

              <div className="">
                <h2 className="border-b border-gray-300 dark:border-gray-600 dark:text-gray-400 mb-1 text-medium font-bold flex items-center gap-1 pb-0.5">
                  <LucideUserCog2 size={16} />
                  Admin Contact Info
                </h2>
                <p className="flex items-center">
                  <LucideIcon.Mail
                    size={14}
                    className="dark:hover:text-blue-500 text-gray-700 dark:text-gray-400"
                  />
                  <a
                    href="mailto:minu@gmail.com"
                    className="text-sm dark:hover:text-blue-500 dark:text-gray-400"
                  >
                    paul.bishwajit09@gmail.com
                  </a>
                </p>

                <Link
                  target="__blank"
                  to="https://portfolio-h5k5.vercel.app"
                  className="hover:link dark:hover:text-blue-500 text-sm m-0 flex items-center dark:text-gray-400 justify-start gap-2"
                >
                  <LucideIcon.Briefcase
                    size={14}
                    className="dark:hover:text-blue-500"
                  />{" "}
                  My Portfolio Link
                </Link>
              </div>
            </div>
          </form>

          <div className="text-center text-gray-600 pt-4">
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

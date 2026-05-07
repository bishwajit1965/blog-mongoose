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

const ContactMe = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const { user } = useAuth();
  console.log("User", user);
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
        <title>Nova Blogging Platform || Contact Page</title>
      </Helmet>

      <section className="max-w-2xl mx-auto p-6 md:p-12 text-base-content dark:text-base-300 border dark:border-gray-700 rounded-md">
        <h2 className="text-3xl font-bold mb-6 text-center flex items-center gap-2">
          <LucideIcon.Rocket />
          Contact Me
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={user?.displayName || "N/A/GitHubUser"}
            readOnly="readOnly"
            onChange={handleChange}
            placeholder="Your Name"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-base-300"
          />
          <input
            type="email"
            name="email"
            value={user?.email || "N/A/GithubEmail"}
            readOnly="readOnly"
            onChange={handleChange}
            placeholder="Your Email"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-base-300"
          />
          <textarea
            name="message"
            value={form?.message}
            onChange={handleChange}
            placeholder="Your Message..."
            className="border rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-base-300"
          ></textarea>
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

        <div className="mt-6 text-center text-gray-600">
          <p>
            Email:{" "}
            <a href="mailto:minu@gmail.com" className="underline">
              minusupadmin@gmail.com
            </a>
          </p>
          <p>Phone: +880 1234 567890</p>
          <p>Follow me on: </p>
        </div>
        <div className="flex justify-center">
          <SocialMediaLinks />
        </div>
      </section>
    </div>
  );
};

export default ContactMe;

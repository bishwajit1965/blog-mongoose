// src/client/components/AboutMe.jsx
import { Helmet } from "react-helmet-async";
import Avatar from "/assets/bishwajit-1.jpg";
import { motion } from "framer-motion";
import PageTitle from "../../components/pageTitle/PageTitle";
import { Link } from "react-router-dom";
import { LucideIcon } from "../../components/lucideIcon/LucideIcons";
import SocialMediaLinks from "../../components/socialMediaLinks/SocialMediaLinks";

const AboutMe = () => {
  return (
    <>
      <Helmet>
        <title>Nova Journal ||About Me Page</title>
      </Helmet>
      <motion.section
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto text-base-content dark:text-gray-400"
      >
        <PageTitle title="About" decoratedText="Me" />

        <div className="flex flex-col md:flex-row items-center gap-10 dark:text-gray-400">
          {/* Profile Image */}
          <div className="">
            <img
              src={Avatar}
              alt="Bishwajit Paul"
              className="lg:w-56 lg:h-56 w-36 h-36 rounded-full object-cover shadow-lg border-4"
            />

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

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Bishwajit Paul
            </h1>

            <h2 className="text-xl md:text-2xl font-bold">
              MERN Full Stack Developer
            </h2>

            <p className="leading-relaxed">
              Welcome to my developer diary — a place where I document my
              journey of learning, building, debugging, and improving as a
              software developer.
            </p>

            <p className="leading-relaxed">
              I enjoy creating modern web applications, exploring software
              architecture, solving real-world development problems, and sharing
              practical lessons from my experiences.
            </p>

            <p className="leading-relaxed">
              Through this platform, I share technical articles about
              programming, software engineering practices, project development,
              and the continuous process of becoming a better developer.
            </p>

            <p className="italic text-gray-600 dark:text-gray-400">
              Building software is not only about writing code; it is about
              understanding problems, making decisions, and creating solutions
              that last.
            </p>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Technologies & Tools
              </h3>

              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "Mongoose",
                  "Tailwind CSS",
                  "Vite",
                  "JavaScript",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-slate-800 dark:text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default AboutMe;

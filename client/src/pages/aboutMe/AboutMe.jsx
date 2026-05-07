// src/client/components/AboutMe.jsx
import { Helmet } from "react-helmet-async";
import Avatar from "/assets/bishwajit-1.jpg";

const AboutMe = () => {
  return (
    <>
      <Helmet>
        <title>Nova Blogging Platform ||About Me Page</title>
      </Helmet>
      <section className="max-w-6xl mx-auto p-6 md:p-12 text-base-content dark:text-base-300">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Photo */}
          <img
            src={Avatar}
            alt="Bishwajit Paul"
            className="lg:w-56 lg:h-56 w-36 h-36 rounded-full object-cover shadow-lg border-4"
          />

          {/* Bio */}
          <div className="">
            <h2 className="lg:text-3xl text-lg font-extrabold mb-2 flex flex-wrap items-center gap-2">
              <span>Bishwajit Paul</span>
            </h2>
            <h2 className="lg:text-xl text-lg font-bold mb-2 flex flex-wrap items-center gap-2">
              <span className="text-amber-500 lg:text-2xl text-xl font-extrabold">
                MERN
              </span>{" "}
              <span>Full Stack Developer</span>
            </h2>
            <p className="mb-4">
              Full-stack developer passionate about building clean, efficient,
              and scalable web applications. Experienced in React, Node.js,
              MongoDB, and Tailwind CSS. Always learning, always coding.
            </p>
            <p className="mb-4 italic text-gray-600 dark:text-gray-500">
              “Turning coffee into code, one project at a time ☕💻”
            </p>

            {/* Skills */}
            <h3 className="text-xl font-semibold mb-2">Tech Stack:</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "Node.js",
                "Express",
                "MongoDB",
                "Tailwind CSS",
                "Vite",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-slate-800 dark:text-slate-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;

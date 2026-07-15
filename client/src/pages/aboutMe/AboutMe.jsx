// src/client/components/AboutMe.jsx
import { Helmet } from "react-helmet-async";
import Avatar from "/assets/bishwajit-1.jpg";

const AboutMe = () => {
  return (
    <>
      <Helmet>
        <title>Nova Journal ||About Me Page</title>
      </Helmet>
      <section className="max-w-6xl mx-auto p-6 md:p-12 text-base-content dark:text-base-300">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Profile Image */}
          <img
            src={Avatar}
            alt="Bishwajit Paul"
            className="lg:w-56 lg:h-56 w-36 h-36 rounded-full object-cover shadow-lg border-4"
          />

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
      </section>
    </>
  );
};

export default AboutMe;

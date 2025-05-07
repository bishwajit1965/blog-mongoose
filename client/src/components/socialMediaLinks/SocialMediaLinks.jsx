import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

const links = [
  {
    id: 1,
    name: "Face-book",
    icon: <FaFacebook />,
    uri: "https:www.facebook.com",
  },
  {
    id: 2,
    name: "Twitter",
    icon: <FaTwitter />,
    uri: "https:www.twitter.com",
  },
  {
    id: 3,
    name: "GitHub",
    icon: <FaGithub />,
    uri: "https:www.github.com",
  },
  {
    id: 4,
    name: "Linkedin",
    icon: <FaLinkedin />,
    uri: "https:www.linkedin.com",
  },
  {
    id: 5,
    name: "Instagram",
    icon: <FaInstagram />,
    uri: "https:www.instagram.com",
  },
  {
    id: 6,
    name: "Pinterest",
    icon: <FaPinterest />,
    uri: "https:www.pinterest.com",
  },
];

const SocialMediaLinks = () => {
  return (
    <div>
      {links.length > 0
        ? links.map((link) => (
            <ul key={link.id} className="inline-flex my-2">
              <li className="flex">
                <a href={link.uri} target="_blank" className="">
                  <span className="text-xl">{link.icon}</span>
                  {/* <span className="text-red-500">{link.name}</span> */}
                </a>
              </li>
            </ul>
          ))
        : ""}
    </div>
  );
};

export default SocialMediaLinks;

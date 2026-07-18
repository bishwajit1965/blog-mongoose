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
    icon: <FaFacebook size={20} />,
    uri: "https:www.facebook.com",
  },
  {
    id: 2,
    name: "Twitter",
    icon: <FaTwitter size={20} />,
    uri: "https:www.twitter.com",
  },
  {
    id: 3,
    name: "GitHub",
    icon: <FaGithub size={20} />,
    uri: "https:www.github.com",
  },
  {
    id: 4,
    name: "Linkedin",
    icon: <FaLinkedin size={20} />,
    uri: "https:www.linkedin.com",
  },
  {
    id: 5,
    name: "Instagram",
    icon: <FaInstagram size={20} />,
    uri: "https:www.instagram.com",
  },
  {
    id: 6,
    name: "Pinterest",
    icon: <FaPinterest size={20} />,
    uri: "https:www.pinterest.com",
  },
];

const SocialMediaLinks = () => {
  return (
    <div className="flex items-center">
      {links?.length > 0
        ? links?.map((link) => (
            <ul key={link.id} className="inline-flex m-0 p-0">
              <li className="inline-flex items-center">
                <a href={link?.uri} target="_blank" className="ml-0 mr-6">
                  <span className="text-xl dark:text-gray-400">
                    {link?.icon}
                  </span>
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

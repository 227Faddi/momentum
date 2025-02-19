import { FaGithub, FaLinkedin, FaUserAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SocialLink } from "./ui/Button";

const Footer = () => {
  return (
    <footer className="mt-40 sm:mt-auto  p-5 text-center text-gray-700">
      <div className="flex flex-col gap-5 md:flex-row justify-around items-center">
        <p className="mb-0 col">© 2024 Momentum. Moving forward together.</p>
        <div>
          <SocialLink link="https://x.com/khoumaDev" icon={<FaXTwitter />} />
          <SocialLink
            link="https://www.linkedin.com/in/faliloukhouma/"
            icon={<FaLinkedin />}
          />
          <SocialLink
            link="https://github.com/227Faddi/momentum"
            icon={<FaGithub />}
          />
          <SocialLink link="https://faliloukhouma.com/" icon={<FaUserAlt />} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

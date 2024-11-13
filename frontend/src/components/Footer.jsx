import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { SocialLink } from './ui/Button';

const Footer = () => {
  return (
    <footer className="mt-auto p-5 text-center">
      <div className="flex flex-col gap-5 md:flex-row justify-around items-center">
        <p className="mb-0 col">© 2024 Momentum. Moving forward together.</p>
        <div>
          <SocialLink link="https://x.com/khoumaDev" icon={<FaXTwitter />} />
          <SocialLink
            link="https://www.linkedin.com/in/serigne-khouma/"
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

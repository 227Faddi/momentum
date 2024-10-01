import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";


const SocialLink = ({ link, icon}) => {
    return (
      <a
          href={ link }
          className="ml-2 relative p-0.5 inline-flex items-center justify-center overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
          style={{ width: 60, height: 60 }}
      >
          <span className="text-lg relative transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0 flex items-center justify-center w-full h-full">
              { icon }
          </span>
      </a>
    )
}
  

const Footer = () => {
  return (
    <footer className="mt-auto p-5 text-center">
        <div className="flex flex-col gap-5 md:flex-row justify-around items-center">
            <p className="mb-0 col">© 2024 Momentum. Moving forward together.</p>
            <div>
                <SocialLink
                    link='https://x.com/khoumaDev'
                    icon={ <FaXTwitter /> }
                />
                <SocialLink
                    link='https://www.linkedin.com/in/serigne-khouma/'
                    icon={ <FaLinkedin /> }
                />
                <SocialLink
                    link='https://github.com/227Faddi/momentum'
                    icon={ <FaGithub /> }
                />
                <SocialLink
                    link='https://faliloukhouma.com/'
                    icon={ <FaUserAlt /> }
                />
            </div>
        </div>
    </footer>
  )
}

export default Footer
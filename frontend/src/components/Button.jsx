import { Link } from 'react-router-dom';

const primary = "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
const secondary = "ml-2 relative p-0.5 inline-flex items-center justify-center overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"

export const SubmitButton = ({ text }) => {
  return (
    <button
      type="submit"
      className={ 'w-full ' + primary}
    >
      { text }
    </button>
  )
}

export const LinkButton = ({ text, route }) => {
  return (
    <Link
      to={ route }
      className={primary}
    >
      { text }
    </Link>
  )
}

export const SocialLink = ({ link, icon}) => {
  return (
    <a
        href={ link }
        className={secondary}
        style={{ width: 60, height: 60 }}
    >
        <span className="text-lg relative transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0 flex items-center justify-center w-full h-full">
            { icon }
        </span>
    </a>
  )
}

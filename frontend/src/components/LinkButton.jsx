import { Link } from 'react-router-dom';

const LinkButton = ({ text, route }) => {
  return (
    <Link
      to={ route }
      className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      { text }
    </Link>
  )
}

export default LinkButton
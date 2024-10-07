import { useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { user } from '../services/api/auth';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import LinkButton from '../components/LinkButton';

const HomePage = () => {
    const { serverUrl, setUser, token, setToken } = useOutletContext()
    const navigate = useNavigate();
    const query = new URLSearchParams(window.location.search);
    const socialAuth = query.has('google') || query.has('github');
  
    useEffect(() => {
      if(socialAuth){
        const getUser = async () => {
            console.log('stay')
            await user()
            setUser(JSON.parse(localStorage.getItem('user')))
            setToken(localStorage.getItem('token'))
            if(token){
                navigate('/dashboard/personal')
            } else{
                navigate(0)
            }
        }
        getUser()
      }
    }, [socialAuth]);

    return (
        <div className="text-center flex flex-col justify-center items-center flex-grow pb-5 my-10">
            <p className="lg:w-1/2 text-6xl my-3 px-3">
                Set Your Goals, Achieve Success, and Earn Points for Every Milestone You
                Reach. Start Planning Today!
            </p>
            <div className="flex gap-4 my-4">
                <LinkButton route={'/login'} text={'Login'} />
                <LinkButton route={'/signup'} text={'Sign Up'} />
            </div>
            <a
                href={`${serverUrl}/auth/google`}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    <FaGoogle className="inline text-xl mr-2"/>
                    Login with Google
                </span>
            </a>
            <a
                href={`${serverUrl}/auth/github`}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    <FaGithub className="inline text-xl mr-2"/>
                    Login with GitHub
                </span>
            </a>
        </div>
    )
}

export default HomePage
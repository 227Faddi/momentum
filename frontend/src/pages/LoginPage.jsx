import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { login } from '../services/api/auth';
import Spinner from '../components/Spinner';

const LoginPage = () => {
    const { user, setUser, setToken } = useOutletContext()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [ email, setEmail ] = useState('guest@gmail.com');
    const [ password, setPassword ] = useState('helloworld');

    const postLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        const credentials = {
            email: email,
            password: password
        }
        const response = await login(credentials)
        setLoading(false)
        if(response.ok){
            setUser(JSON.parse(localStorage.getItem('user')))
            setToken(localStorage.getItem('token'))
            navigate('/dashboard/personal')
        }
    }

    if(loading){
        return <Spinner loading={loading} size={1} color='#000' /> 
    }

    return (
        <div className="flex flex-col justify-center items-center flex-grow pb-5 my-10 px-5">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={postLogin}>
                    <h1 className="text-xl font-medium text-gray-900">
                        Sign in to Momentum
                    </h1>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="guest@gmail.com"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5  "
                            required={true}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="helloworld"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5  "
                            required={true}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Login
                    </button>
                    <div className="text-sm font-medium text-gray-500 ">
                        Not registered?{" "}
                        <Link
                            to='/signup'
                            className="text-violet-700 hover:underline"
                        >
                            Create account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
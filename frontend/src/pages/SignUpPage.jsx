import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/api/auth';
import { SubmitButton } from '../components/Button';
import Spinner from '../components/Spinner';
import DataContext from '../contexts/DataContext'


const SignUpPage = () => {
  const { setUser, setToken } = useContext(DataContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const postSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    const credentials = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    const response = await signup(credentials);
    setLoading(false);
    if (response.ok) {
      setUser(JSON.parse(localStorage.getItem('user')));
      setToken(localStorage.getItem('token'));
      navigate('/dashboard/personal');
    }
  };

  if (loading) {
    return <Spinner loading={loading} size={1} />;
  }

  return (
    <div className="flex flex-col justify-center items-center flex-grow pb-5 my-10 px-12">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={postSignup}>
          <h1 className="text-xl font-medium text-gray-900">
            Sign up to Momentum
          </h1>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5  "
              placeholder="Enter username"
              required={true}
            />
          </div>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5  "
              placeholder="Enter email"
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
              placeholder="Enter password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5  "
              required={true}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5  "
              required={true}
            />
          </div>
          <SubmitButton text="Sign up" />
          <div className="text-sm font-medium text-gray-500 ">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-700 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

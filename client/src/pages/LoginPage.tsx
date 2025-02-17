import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useLoginMutation } from "../api/auth";
import { setTokens } from "../state/authSlice";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." })
    .max(30, { message: "Email cannot exceed 30 characters." })
    .trim()
    .toLowerCase(),
  password: z.string().min(1, { message: "Password is required." }),
});

type FormType = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      const result = await login(data);
      dispatch(
        setTokens({
          accessToken: result.data?.accessToken,
          refreshToken: result.data?.refreshToken,
        })
      );
      if (result.error) {
        return toast.error("An error occurred. Please try again.");
      }
      navigate("/dashboard/personal");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center flex-grow pb-5 my-10 px-12">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-xl text-center font-medium text-gray-900">
            Sign in to Momentum
          </h1>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900s">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
              placeholder="Your Email"
            />
            <p className="text-red-700 h-4 text-sm sm:text-base">
              {errors?.email?.message}
            </p>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
              placeholder="Your Password"
            />
            <p className="text-red-700 h-4 text-sm sm:text-base">
              {errors?.password?.message}
            </p>
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <div className="text-sm font-medium text-gray-500 mt-3">
            Not registered?{" "}
            <Link to="/signup" className="text-violet-700 hover:underline">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

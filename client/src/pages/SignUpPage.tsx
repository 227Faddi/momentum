import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { errorHandler } from "../api";
import { useSignupMutation } from "../api/auth";
import { setTokens } from "../state/authSlice";

const schema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Username is required." })
      .max(30, { message: "Username cannot exceed 30 characters." })
      .trim(),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Please enter a valid email address." })
      .max(30, { message: "Email cannot exceed 30 characters." })
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );

type FormType = z.infer<typeof schema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      const result = await signup(data);
      dispatch(
        setTokens({
          accessToken: result.data?.accessToken,
          refreshToken: result.data?.refreshToken,
        })
      );
      if (result.error) {
        errorHandler(result.error);
        return;
      }
      navigate("/dashboard/personal");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again." + err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow pb-5 my-10 px-12">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <motion.form
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-xl text-center font-medium text-gray-900">
            Sign up to Momentum
          </h1>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900s">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
              placeholder="Your Username"
            />
            <p className="text-red-700 h-4 text-sm sm:text-base">
              {errors?.username?.message}
            </p>
          </div>
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
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
              placeholder="Confirm Password"
            />
            <p className="text-red-700 h-4 text-sm sm:text-base">
              {errors?.confirmPassword?.message}
            </p>
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Signup"}
          </button>
          <div className="text-sm font-medium text-gray-500 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-700 hover:underline">
              Login
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default SignUpPage;

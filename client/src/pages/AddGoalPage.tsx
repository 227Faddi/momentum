import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useAddGoalMutation } from "../api/goals";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(20, { message: "Title cannot exceed 20 characters." })
    .trim()
    .toLowerCase(),
  category: z.enum(["finance", "personal", "career"]),
  timeFrame: z.enum(["shorterm", "longterm"]),
});

type FormType = z.infer<typeof schema>;

const AddGoalPage = () => {
  const navigate = useNavigate();
  const [addGoal] = useAddGoalMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      const result = await addGoal(data);
      if (result.error) {
        return toast.error("An error occurred. Please try again.");
      }
      toast.success("Goal added successfully");
      navigate(`/dashboard/${data.category}`);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow pb-5 px-12">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-xl font-medium text-gray-900 text-center">
            Add a New Goal
          </h1>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900s">
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
              placeholder="Your Title"
            />
            <p className="text-red-700 h-4 text-sm sm:text-base">
              {errors?.title?.message}
            </p>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900s">
              Category
            </label>
            <select
              {...register("category")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
            >
              <option value="personal">Personal</option>
              <option value="finance">Finance</option>
              <option value="career">Career</option>
            </select>
            <p className="text-red-700 h-4 text-sm sm:text-base">
              {errors?.timeFrame?.message}
            </p>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900s">
              Time Frame
            </label>
            <select
              {...register("timeFrame")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
            >
              <option value="shorterm">Shorterm</option>
              <option value="longterm">Longterm</option>
            </select>
            <p className="text-red-700 h-4 text-sm sm:text-base">
              {errors?.timeFrame?.message}
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
            <Link
              to="/dashboard/personal"
              className="text-violet-700 hover:underline"
            >
              Cancel
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AddGoalPage;

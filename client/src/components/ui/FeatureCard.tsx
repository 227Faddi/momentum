import { motion } from "motion/react";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  text: string;
};

const FeatureCard = ({ icon, title, text }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      viewport={{ once: true }}
      className="p-4"
    >
      <div className="rounded-full w-16 h-16 flex justify-center items-center text-violet-500 shadow-2xl border border-violet-500">
        {icon}
      </div>
      <h2 className="mt-6 text-lg text-gray-700 font-medium mb-3">{title}</h2>
      <p className="font-light sm:text-md text-gray-500 mb-3">{text}</p>
    </motion.div>
  );
};

export default FeatureCard;

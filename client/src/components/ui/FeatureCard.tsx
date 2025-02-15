import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  text: string;
};

const FeatureCard = ({ icon, title, text }: Props) => {
  return (
    <div className="p-4">
      <div className="rounded-full w-16 h-16 flex justify-center items-center text-violet-500 shadow-2xl border border-violet-500">
        {icon}
      </div>
      <h2 className="mt-6 text-lg font-medium mb-3">{title}</h2>
      <p className="font-light sm:text-md text-gray-500 mb-3">{text}</p>
    </div>
  );
};

export default FeatureCard;

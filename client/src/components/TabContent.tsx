import DisplayGoals from "./DisplayGoals";

type Props = {
  category: string;
};

const TabContent = ({ category }: Props) => {
  return (
    <div className="p-4 rounded-lg sm:p-8">
      <h2 className="text-2xl font-extrabold tracking-tight text-white">
        {category}
      </h2>
      <div className="flex flex-col sm:flex-row justify-around items-center sm:items-start gap-5">
        <DisplayGoals category={category} timeframe="Shorterm" />
        <DisplayGoals category={category} timeframe="Longterm" />
      </div>
    </div>
  );
};

export const PersonalTab = () => {
  return <TabContent category="Personal" />;
};

export const FinanceTab = () => {
  return <TabContent category="Finance" />;
};

export const CareerTab = () => {
  return <TabContent category="Career" />;
};

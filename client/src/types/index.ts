export type User = {
  username: string;
  email: string;
  points: string;
};

export type Goal = {
  title: string;
  category: "finance" | "career" | "personal";
  timeFrame: "shorterm" | "longterm";
  completed: boolean;
  user: string;
};

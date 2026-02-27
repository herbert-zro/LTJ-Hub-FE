interface Props {
  title: string;
  subtitle?: string;
}

export const AdminTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="mb-5 text-center sm:text-left">
      <h1 className="mb-2 text-2xl font-bold text-text-strong">{title}</h1>
      <p className="text-corp-gray-500">{subtitle ? subtitle : ""}</p>
    </div>
  );
};

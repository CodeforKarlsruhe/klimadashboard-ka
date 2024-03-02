const Card = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-zinc-100 p-8 rounded-md flex flex-col gap-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <span className="text-xs text-gray-400">{description}</span>
      {children}
    </div>
  );
};

export default Card;

interface StatusCardProps {
  title: string;
  subtitle: string;
  colorClass: string;
}

const StatusCard = ({ title, subtitle, colorClass }: StatusCardProps) => {
  return (
    <div
      className={`${colorClass} rounded-2xl p-4 transition-all duration-300`}
      style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)" }}
    >
      <h4 className="font-medium text-sm md:text-base">{title}</h4>
      <p className="text-xs md:text-sm opacity-75 mt-1">{subtitle}</p>
    </div>
  );
};

export default StatusCard;

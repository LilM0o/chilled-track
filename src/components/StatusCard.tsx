interface StatusCardProps {
  title: string;
  subtitle: string;
  colorClass: string;
}

const StatusCard = ({ title, subtitle, colorClass }: StatusCardProps) => {
  return (
    <div
      className={`${colorClass} rounded-2xl p-4 
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:-translate-y-0.5
        animate-fade-in-up`}
      style={{ 
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.08)";
      }}
    >
      <h4 className="font-medium text-sm md:text-base">{title}</h4>
      <p className="text-xs md:text-sm opacity-75 mt-1">{subtitle}</p>
    </div>
  );
};

export default StatusCard;

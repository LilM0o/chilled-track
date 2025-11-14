import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface StatusCardProps {
  title: string;
  subtitle: string;
  colorClass: string;
  to?: string;
  count?: number;
  variant?: "success" | "warning" | "danger";
}

const StatusCard = ({ title, subtitle, colorClass, to, count, variant = "warning" }: StatusCardProps) => {
  const content = (
    <div className="relative">
      <div
        className={`${colorClass} rounded-2xl p-4 
          transition-all duration-200 ease-out
          ${to ? 'hover:scale-[1.01] hover:-translate-y-0.5 cursor-pointer' : ''}`}
      style={{ 
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
      onMouseEnter={(e) => {
        if (to) e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.08)";
      }}
      >
        <h4 className="font-medium text-sm md:text-base">{title}</h4>
        <p className="text-xs md:text-sm opacity-75 mt-1">{subtitle}</p>
      </div>
      {count !== undefined && (
        <Badge 
          variant={variant}
          className="absolute -top-2 -right-2 h-8 min-w-[2rem] flex items-center justify-center rounded-full shadow-lg animate-scale-in"
        >
          {count}
        </Badge>
      )}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
};

export default StatusCard;

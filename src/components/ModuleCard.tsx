import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  to: string;
  colorClass: string;
}

const ModuleCard = ({ title, subtitle, icon: Icon, to, colorClass }: ModuleCardProps) => {
  return (
    <Link to={to} className="group">
      <div
        className={`${colorClass} rounded-3xl p-6 h-full flex flex-col items-center justify-center text-center gap-3 
          transition-all duration-300 ease-out
          hover:scale-[1.03] hover:-translate-y-1
          active:scale-[0.98]
          animate-fade-in`}
        style={{ 
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
        }}
      >
        <Icon 
          className="w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
          strokeWidth={1.5} 
        />
        <div>
          <h3 className="font-semibold text-base md:text-lg transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm opacity-75 mt-1 transition-opacity duration-200 group-hover:opacity-90">
            {subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;

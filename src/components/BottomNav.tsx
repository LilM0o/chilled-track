import { Home, TrendingUp, Bell, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Accueil", path: "/" },
    { icon: TrendingUp, label: "Historique", path: "/historique" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: User, label: "Profil", path: "/profil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-50 animate-slide-in-right">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 
                  transition-all duration-300 ease-out
                  hover:scale-110 active:scale-95
                  ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"}`}
              >
                <Icon 
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? "animate-bounce-subtle" : ""
                  }`} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
                <span className={`text-xs transition-all duration-200 ${
                  isActive ? "font-semibold" : "font-normal"
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-full animate-scale-in" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;

import { ArrowLeft, Bell, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const notifications = [
            { title: "Nettoyage en retard", message: "2 tâches de nettoyage non effectuées", time: "Il y a 1h", type: "warning" },
            { title: "Température OK", message: "Tous les relevés sont conformes", time: "Hier", type: "success" },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-pink/30 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300 w-11 h-11">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Notifications</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="space-y-3 animate-fade-in-up">
          {notifications.map((notif, i) => (
            <div 
              key={i} 
              className="bg-card rounded-2xl p-4 shadow-sm
                transition-all duration-300 hover:shadow-md hover:scale-[1.01]
                cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                  notif.type === "warning" ? "bg-module-orange" :
                  notif.type === "info" ? "bg-module-blue" :
                  "bg-module-green"
                }`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{notif.title}</h3>
                  <p className="text-sm text-muted-foreground">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;

import { ArrowLeft, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const Notifications = () => {
  const notifications = [
    { title: "Nettoyage en retard", message: "2 tâches de nettoyage non effectuées", time: "Il y a 1h", type: "warning" },
    { title: "DLC proche", message: "3 produits arrivent à expiration dans 2 jours", time: "Il y a 3h", type: "info" },
    { title: "Température OK", message: "Tous les relevés sont conformes", time: "Hier", type: "success" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Notifications</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="space-y-3">
          {notifications.map((notif, i) => (
            <div key={i} className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl ${
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

      <BottomNav />
    </div>
  );
};

export default Notifications;

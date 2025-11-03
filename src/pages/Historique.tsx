import { ArrowLeft, BarChart3, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const Historique = () => {
  const activities = [
    { type: "Température", action: "Relevé frigo 1", value: "3°C", time: "Il y a 10 min", color: "bg-module-green" },
    { type: "Nettoyage", action: "Sols cuisine validés", time: "Il y a 2h", color: "bg-module-orange" },
    { type: "Traçabilité", action: "Produit scanné", value: "Lot ABC123", time: "Il y a 3h", color: "bg-module-blue" },
    { type: "Réception", action: "Livraison fruits", time: "Hier à 09:30", color: "bg-module-purple" },
    { type: "Température", action: "Relevé congélateur", value: "-18°C", time: "Hier à 08:00", color: "bg-module-green" },
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
          <h1 className="text-2xl font-bold text-primary">Historique</h1>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-yellow text-module-yellow-foreground rounded-3xl p-8 mb-6 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Vue chronologique</h2>
          <p className="text-sm opacity-75">Consultez l'historique de toutes vos actions</p>
        </div>

        <div className="space-y-3">
          {activities.map((activity, i) => (
            <div key={i} className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className={`${activity.color} w-2 h-full rounded-full`} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">{activity.type}</span>
                      <h4 className="font-medium">{activity.action}</h4>
                      {activity.value && (
                        <p className="text-sm text-muted-foreground">{activity.value}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button variant="outline" className="rounded-xl">
            Charger plus
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Historique;

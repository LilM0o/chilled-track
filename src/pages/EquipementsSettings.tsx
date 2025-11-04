import { ArrowLeft, Refrigerator, Plus, Snowflake, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";

const EquipementsSettings = () => {
  const equipments = [
    { name: "Frigo 1 - Entrée", type: "Réfrigérateur", temp: "3°C", status: "ok", icon: Refrigerator },
    { name: "Frigo 2 - Desserts", type: "Réfrigérateur", temp: "4°C", status: "ok", icon: Refrigerator },
    { name: "Congélateur 1", type: "Congélateur", temp: "-18°C", status: "ok", icon: Snowflake },
    { name: "Chambre froide", type: "Chambre froide", temp: "2°C", status: "warning", icon: Wind },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/parametres">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Équipements</h1>
          <Button size="icon" className="ml-auto rounded-xl">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-blue text-module-blue-foreground rounded-3xl p-8 mb-6 text-center animate-scale-in shadow-lg">
          <Refrigerator className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Gestion des équipements</h2>
          <p className="text-sm opacity-75">Configurez vos frigos et équipements</p>
        </div>

        <div className="space-y-3">
          {equipments.map((equipment, i) => {
            const Icon = equipment.icon;
            return (
              <div 
                key={i}
                className="bg-card rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-secondary rounded-xl p-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{equipment.name}</h3>
                      <Badge 
                        variant={equipment.status === "ok" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {equipment.status === "ok" ? "Conforme" : "À surveiller"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{equipment.type}</p>
                    <p className="text-sm font-medium text-primary mt-1">{equipment.temp}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default EquipementsSettings;

import { ArrowLeft, Refrigerator, Plus, Snowflake, Wind, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EquipementsSettings = () => {
  const equipments = [
    { name: "Frigo aliments", type: "Réfrigérateur", temp: "3°C", status: "ok", icon: Refrigerator },
    { name: "Réfrigérateur Bar", type: "Réfrigérateur", temp: "4°C", status: "ok", icon: Refrigerator },
    { name: "Réfrigérateur Boissons 1", type: "Réfrigérateur", temp: "4°C", status: "ok", icon: Refrigerator },
    { name: "Réfrigérateur Boissons 2", type: "Réfrigérateur", temp: "5°C", status: "ok", icon: Refrigerator },
    { name: "Réfrigérateur Bubble Tea", type: "Réfrigérateur", temp: "3°C", status: "ok", icon: Refrigerator },
    { name: "Congélateur 1", type: "Congélateur", temp: "-18°C", status: "ok", icon: Snowflake },
    { name: "Congélateur 2", type: "Congélateur", temp: "-19°C", status: "ok", icon: Snowflake },
    { name: "Congélateur 3", type: "Congélateur", temp: "-18°C", status: "ok", icon: Snowflake },
    { name: "Congélateur 4", type: "Congélateur", temp: "-20°C", status: "ok", icon: Snowflake },
    { name: "Congélateur Glaces", type: "Congélateur", temp: "-22°C", status: "ok", icon: Snowflake },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-pink/30 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="w-11 h-11">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
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
    </div>
  );
};

export default EquipementsSettings;

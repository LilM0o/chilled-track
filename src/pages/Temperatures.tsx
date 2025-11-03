import { ArrowLeft, Thermometer, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const Temperatures = () => {
  const fridges = [
    { name: "Frigo 1 - Principal", temp: "3°C", status: "ok", time: "Il y a 10 min" },
    { name: "Frigo 2 - Légumes", temp: "4°C", status: "ok", time: "Il y a 25 min" },
    { name: "Congélateur 1", temp: "-18°C", status: "ok", time: "Il y a 1h" },
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
          <h1 className="text-2xl font-bold text-primary">Températures Frigos</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-green text-module-green-foreground rounded-3xl p-8 mb-6 text-center">
          <Thermometer className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Relevés quotidiens</h2>
          <p className="text-sm opacity-75">Contrôlez les températures de vos équipements</p>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl mb-6">
          <Plus className="w-5 h-5 mr-2" />
          Nouveau relevé
        </Button>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Derniers relevés</h3>
          {fridges.map((fridge, i) => (
            <div key={i} className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{fridge.name}</h4>
                  <p className="text-2xl font-bold text-module-green-foreground mt-1">
                    {fridge.temp}
                  </p>
                </div>
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Conforme
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{fridge.time}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Temperatures;

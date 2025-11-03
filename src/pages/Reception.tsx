import { ArrowLeft, Truck, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const Reception = () => {
  const deliveries = [
    { supplier: "Fruits & Légumes Bio", date: "04/11/2025", temp: "4°C", status: "ok" },
    { supplier: "Boucherie Centrale", date: "03/11/2025", temp: "2°C", status: "ok" },
    { supplier: "Produits Laitiers", date: "02/11/2025", temp: "5°C", status: "ok" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Réception Marchandises</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-purple text-module-purple-foreground rounded-3xl p-8 mb-6 text-center 
          animate-scale-in shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Truck className="w-16 h-16 mx-auto mb-4 animate-bounce-subtle" />
          <h2 className="text-xl font-semibold mb-2">Livraisons fournisseurs</h2>
          <p className="text-sm opacity-75">Contrôlez vos réceptions de marchandises</p>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl mb-6
          transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95 animate-fade-in-up">
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle réception
        </Button>

        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-lg font-semibold">Réceptions récentes</h3>
          {deliveries.map((delivery, i) => (
            <div 
              key={i} 
              className="bg-card rounded-2xl p-4 shadow-sm
                transition-all duration-300 hover:shadow-md hover:scale-[1.01]
                cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{delivery.supplier}</h4>
                  <p className="text-sm text-muted-foreground">{delivery.date}</p>
                </div>
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium
                  animate-pulse-soft shadow-sm">
                  Conforme
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">
                  Température camion: <strong>{delivery.temp}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Reception;

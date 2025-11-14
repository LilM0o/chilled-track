import { Package, Thermometer, SprayCan, Truck, BarChart3, Settings, Calendar } from "lucide-react";
import ModuleCard from "@/components/ModuleCard";
import StatusCard from "@/components/StatusCard";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const modules = [
    {
      title: "Traçabilité Produits",
      subtitle: "Scan des codes-barres",
      icon: Package,
      to: "/tracabilite",
      colorClass: "bg-module-blue text-module-blue-foreground",
    },
    {
      title: "Températures Frigos",
      subtitle: "Relevés quotidiens",
      icon: Thermometer,
      to: "/temperatures",
      colorClass: "bg-module-green text-module-green-foreground",
    },
    {
      title: "Plan de Nettoyage",
      subtitle: "Tâches et conformité",
      icon: SprayCan,
      to: "/nettoyage",
      colorClass: "bg-module-orange text-module-orange-foreground",
    },
    {
      title: "Réception Marchandises",
      subtitle: "Livraisons fournisieurs",
      icon: Truck,
      to: "/reception",
      colorClass: "bg-module-purple text-module-purple-foreground",
    },
    {
      title: "Historique",
      subtitle: "Vue chronologique",
      icon: BarChart3,
      to: "/historique",
      colorClass: "bg-module-yellow text-module-yellow-foreground",
    },
    {
      title: "Paramètres",
      subtitle: "Configuration",
      icon: Settings,
      to: "/parametres",
      colorClass: "bg-module-pink text-module-pink-foreground",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 pb-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary/95 via-accent/95 to-primary/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-lg sticky top-0 z-40 animate-fade-in border-b-2 border-primary/20">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white drop-shadow-md">HACCP Pro</h1>
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/30 shadow-md hover:shadow-lg hover:bg-white/25 transition-all duration-300">
            <Calendar className="w-6 h-6 text-white drop-shadow" />
            <div className="flex flex-col">
              <p className="text-base font-bold text-white capitalize leading-tight drop-shadow">
                {format(currentDate, "EEEE", { locale: fr })}
              </p>
              <p className="text-sm text-white/90 font-medium drop-shadow-sm">
                {format(currentDate, "d MMMM yyyy", { locale: fr })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        {/* Greeting */}
        <div className="mb-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm rounded-2xl px-6 py-5 border border-primary/20 shadow-md animate-fade-in">
          <p className="text-foreground text-lg">
            Bonjour <span className="font-bold text-primary">Dreams Donuts</span>, <span className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">2 tâches en attente</span>
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {modules.map((module) => (
            <ModuleCard key={module.to} {...module} />
          ))}
        </div>

        {/* Dashboard Section */}
        <section className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm rounded-3xl px-6 py-6 border border-primary/10 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Tableau à Bord</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatusCard
              title="Température Frigos : OK"
              subtitle="(Dernière relevé il ya 10 min)"
              colorClass="bg-module-blue text-module-blue-foreground"
              to="/temperatures"
            />
            <StatusCard
              title="Plan de Nettoyage :"
              subtitle="3 tâches et attente"
              colorClass="bg-module-green text-module-green-foreground"
              to="/nettoyage"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;

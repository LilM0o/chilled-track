import { Package, Thermometer, SprayCan, Truck, BarChart3, Settings } from "lucide-react";
import ModuleCard from "@/components/ModuleCard";
import DateTimeDisplay from "@/components/DateTimeDisplay";

const Index = () => {
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
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">HACCP Pro</h1>
          <div className="hidden md:block">
            <DateTimeDisplay />
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        {/* Greeting */}
        <div className="mb-8">
          <p className="text-foreground text-lg">
            Bonjour Dreams Donuts, <span className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              bienvenue sur HACCP Pro
            </span>
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => (
            <ModuleCard key={module.to} {...module} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

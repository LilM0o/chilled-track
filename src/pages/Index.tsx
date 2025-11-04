import { Menu, Package, Thermometer, SprayCan, Truck, BarChart3, Settings } from "lucide-react";
import ModuleCard from "@/components/ModuleCard";
import StatusCard from "@/components/StatusCard";
import BottomNav from "@/components/BottomNav";

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
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <button className="p-2 hover:bg-secondary rounded-lg transition-all duration-300 hover:scale-110 active:scale-95">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-primary">HACCP Pro</h1>
          <div className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
            Actif
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        {/* Greeting */}
        <div className="mb-8">
          <p className="text-foreground text-lg">
            Bonjour Marie, <span className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">2 tâches en attente</span>
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {modules.map((module) => (
            <ModuleCard key={module.to} {...module} />
          ))}
        </div>

        {/* Dashboard Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Tableau à Bord</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatusCard
              title="Température Frigos : OK"
              subtitle="(Dernière relevé il ya 10 min)"
              colorClass="bg-module-blue text-module-blue-foreground"
            />
            <StatusCard
              title="Plan de Nettoyage :"
              subtitle="3 tâches et attente"
              colorClass="bg-module-green text-module-green-foreground"
            />
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;

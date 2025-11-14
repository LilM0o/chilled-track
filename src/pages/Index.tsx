import { Package, Thermometer, SprayCan, Truck, BarChart3, Settings } from "lucide-react";
import ModuleCard from "@/components/ModuleCard";
import StatusCard from "@/components/StatusCard";
import { useState, useEffect } from "react";
import { getTemperatureStatus, getCleaningStatus } from "@/utils/dashboardUtils";

const Index = () => {
  const [tempStatus, setTempStatus] = useState({
    isOk: true,
    overdueCount: 0,
    statusText: "OK",
    lastReadingText: "Chargement..."
  });

  const [cleaningStatus, setCleaningStatus] = useState({
    pendingCount: 0,
    statusText: "Chargement..."
  });

  useEffect(() => {
    const updateDashboard = () => {
      setTempStatus(getTemperatureStatus());
      setCleaningStatus(getCleaningStatus());
    };
    
    updateDashboard();
    
    // Listen for changes
    window.addEventListener('storage', updateDashboard);
    window.addEventListener('temperatureUpdated', updateDashboard);
    window.addEventListener('tasksUpdated', updateDashboard);
    window.addEventListener('equipmentsUpdated', updateDashboard);
    
    return () => {
      window.removeEventListener('storage', updateDashboard);
      window.removeEventListener('temperatureUpdated', updateDashboard);
      window.removeEventListener('tasksUpdated', updateDashboard);
      window.removeEventListener('equipmentsUpdated', updateDashboard);
    };
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
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center justify-center">
          <h1 className="text-2xl font-bold text-primary">HACCP Pro</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        {/* Greeting */}
        <div className="mb-8">
          <p className="text-foreground text-lg">
            Bonjour Dreams Donuts, <span className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {cleaningStatus.pendingCount + tempStatus.overdueCount} tâche{(cleaningStatus.pendingCount + tempStatus.overdueCount) > 1 ? 's' : ''} en attente
            </span>
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
          <h2 className="text-xl font-semibold mb-4 text-foreground">Tableau de Bord</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatusCard
              title={`Température Frigos : ${tempStatus.statusText}`}
              subtitle={tempStatus.lastReadingText}
              colorClass={tempStatus.isOk 
                ? "bg-module-blue text-module-blue-foreground" 
                : "bg-red-500 text-white"}
              to="/temperatures"
              count={tempStatus.overdueCount}
              variant={tempStatus.isOk ? "success" : "danger"}
            />
            <StatusCard
              title="Plan de Nettoyage"
              subtitle={cleaningStatus.statusText}
              colorClass="bg-module-green text-module-green-foreground"
              to="/nettoyage"
              count={cleaningStatus.pendingCount}
              variant={cleaningStatus.pendingCount > 0 ? "warning" : "success"}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;

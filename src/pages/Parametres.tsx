import { ArrowLeft, Settings, Bell, Thermometer, Users, Refrigerator } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const Parametres = () => {
  const settingsSections = [
    { icon: Bell, title: "Notifications", description: "Gérer les alertes et notifications" },
    { icon: Thermometer, title: "Seuils de température", description: "Configurer les limites acceptables" },
    { icon: Users, title: "Personnel", description: "Gérer les utilisateurs et rôles" },
    { icon: Refrigerator, title: "Équipements", description: "Configurer les frigos et équipements" },
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
          <h1 className="text-2xl font-bold text-primary">Paramètres</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-pink text-module-pink-foreground rounded-3xl p-8 mb-6 text-center 
          animate-scale-in shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Settings className="w-16 h-16 mx-auto mb-4 animate-bounce-subtle" />
          <h2 className="text-xl font-semibold mb-2">Configuration</h2>
          <p className="text-sm opacity-75">Personnalisez votre application</p>
        </div>

        <div className="space-y-3 animate-fade-in-up">
          {settingsSections.map((section, i) => {
            const Icon = section.icon;
            const routes = ['/parametres/notifications', '/parametres/temperatures', '/parametres/personnel', '/parametres/equipements'];
            return (
              <Link
                key={i}
                to={routes[i]}
                className="block w-full bg-card rounded-2xl p-4 shadow-sm text-left 
                  transition-all duration-300 hover:shadow-md hover:scale-[1.01]
                  animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-secondary rounded-xl p-3 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 bg-card rounded-2xl p-6 shadow-sm 
          animate-fade-in-up hover:shadow-md transition-shadow duration-300" 
          style={{ animationDelay: "0.4s" }}
        >
          <h3 className="font-semibold mb-4">À propos</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Version: 1.0.0</p>
            <p>HACCP Pro - Gestion de sécurité alimentaire</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Parametres;

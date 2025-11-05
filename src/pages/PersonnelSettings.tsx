import { ArrowLeft, Users, Plus, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";

const PersonnelSettings = () => {
  const personnel = [
    { name: "Hugo", role: "Équipier", status: "active" },
    { name: "Florian", role: "Équipier", status: "active" },
    { name: "Lorraine", role: "Équipier", status: "active" },
    { name: "Lauria", role: "Équipier", status: "active" },
    { name: "Tim Eliot", role: "Équipier", status: "active" },
    { name: "Aymene", role: "Équipier", status: "active" },
    { name: "Meriem", role: "Équipier", status: "active" },
    { name: "Sy'RAI", role: "Équipier", status: "active" },
    { name: "Djali", role: "Équipier", status: "active" },
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
          <h1 className="text-2xl font-bold text-primary">Personnel</h1>
          <Button size="icon" className="ml-auto rounded-xl">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-purple text-module-purple-foreground rounded-3xl p-8 mb-6 text-center animate-scale-in shadow-lg">
          <Users className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Gestion du personnel</h2>
          <p className="text-sm opacity-75">Gérez les utilisateurs et leurs rôles</p>
        </div>

        <div className="space-y-3">
          {personnel.map((person, i) => (
            <div 
              key={i}
              className="bg-card rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="bg-secondary rounded-full p-3">
                  <UserCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{person.name}</h3>
                    <Badge variant={person.status === "active" ? "default" : "secondary"} className="text-xs">
                      {person.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default PersonnelSettings;

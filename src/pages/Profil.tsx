import { ArrowLeft, User, LogOut, Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const Profil = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Profil</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-card rounded-2xl p-6 shadow-sm mb-6 text-center 
          animate-scale-in hover:shadow-md transition-shadow duration-300">
          <div className="w-20 h-20 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center
            transition-transform duration-300 hover:scale-110">
            <User className="w-10 h-10 text-accent-foreground" />
          </div>
          <h2 className="text-xl font-semibold">Marie Dupont</h2>
          <p className="text-sm text-muted-foreground">Responsable HACCP</p>
          <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs inline-block mt-2
            animate-pulse-soft shadow-sm">
            Actif
          </div>
        </div>

        <div className="space-y-3 animate-fade-in-up">
          <button className="w-full bg-card rounded-2xl p-4 shadow-sm text-left 
            transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="transition-transform duration-300 hover:scale-110">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Sécurité et confidentialité</span>
            </div>
          </button>

          <button className="w-full bg-card rounded-2xl p-4 shadow-sm text-left 
            transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
            style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-4">
              <div className="transition-transform duration-300 hover:scale-110">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Rapports et statistiques</span>
            </div>
          </button>

          <button className="w-full bg-destructive/10 text-destructive rounded-2xl p-4 shadow-sm text-left 
            transition-all duration-300 hover:bg-destructive/20 hover:scale-[1.01]"
            style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-4">
              <div className="transition-transform duration-300 hover:scale-110">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium">Se déconnecter</span>
            </div>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profil;

import { ArrowLeft, User, LogOut, Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const Profil = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Profil</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-card rounded-2xl p-6 shadow-sm mb-6 text-center">
          <div className="w-20 h-20 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-accent-foreground" />
          </div>
          <h2 className="text-xl font-semibold">Marie Dupont</h2>
          <p className="text-sm text-muted-foreground">Responsable HACCP</p>
          <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs inline-block mt-2">
            Actif
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-card rounded-2xl p-4 shadow-sm text-left hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-medium">Sécurité et confidentialité</span>
            </div>
          </button>

          <button className="w-full bg-card rounded-2xl p-4 shadow-sm text-left hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-medium">Rapports et statistiques</span>
            </div>
          </button>

          <button className="w-full bg-destructive/10 text-destructive rounded-2xl p-4 shadow-sm text-left hover:bg-destructive/20 transition-colors">
            <div className="flex items-center gap-4">
              <LogOut className="w-5 h-5" />
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

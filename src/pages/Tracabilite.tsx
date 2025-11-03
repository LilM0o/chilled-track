import { ArrowLeft, Scan, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const Tracabilite = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Traçabilité Produits</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-blue text-module-blue-foreground rounded-3xl p-8 mb-6 text-center">
          <Scan className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Scanner un produit</h2>
          <p className="text-sm opacity-75">Scannez le code-barres pour enregistrer un produit</p>
        </div>

        <div className="space-y-4">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl">
            <Scan className="w-5 h-5 mr-2" />
            Scanner un code-barres
          </Button>
          
          <Button variant="outline" className="w-full h-12 rounded-xl">
            <Plus className="w-5 h-5 mr-2" />
            Ajouter manuellement
          </Button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Produits récents</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Produit {i}</h4>
                    <p className="text-sm text-muted-foreground">DLC: 15/12/2025</p>
                    <p className="text-xs text-muted-foreground mt-1">Lot: ABC123{i}</p>
                  </div>
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs">
                    OK
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Tracabilite;

import { ArrowLeft, Truck, Plus, Home, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { addToHistory } from "@/utils/historyUtils";

interface Reception {
  id: string;
  supplier: string;
  category: string;
  date: string;
  status: string;
}

const Reception = () => {
  const [open, setOpen] = useState(false);
  const [supplier, setSupplier] = useState("");
  const [category, setCategory] = useState("");
  const [receptions, setReceptions] = useState<Reception[]>(() => {
    const saved = localStorage.getItem('receptions');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Load suppliers dynamically from localStorage
  const [suppliers, setSuppliers] = useState<string[]>(() => {
    const saved = localStorage.getItem('suppliers');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newSupplier, setNewSupplier] = useState("");
  const [showAddSupplier, setShowAddSupplier] = useState(false);

  // Sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('suppliers');
      if (saved) {
        setSuppliers(JSON.parse(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('suppliersUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('suppliersUpdated', handleStorageChange);
    };
  }, []);

  const categories = [
    { name: "Crémerie", color: "bg-yellow-200 hover:bg-yellow-300 border-yellow-400" },
    { name: "Drivers Frais", color: "bg-blue-200 hover:bg-blue-300 border-blue-400" },
    { name: "Epicerie", color: "bg-orange-200 hover:bg-orange-300 border-orange-400" },
    { name: "Fruits et Legumes", color: "bg-green-200 hover:bg-green-300 border-green-400" },
    { name: "Surgelés", color: "bg-cyan-200 hover:bg-cyan-300 border-cyan-400" },
    { name: "Viandes", color: "bg-red-200 hover:bg-red-300 border-red-400" },
  ];

  const deliveries = receptions;

  const handleAddSupplier = () => {
    if (newSupplier.trim()) {
      const updatedSuppliers = [...suppliers, newSupplier.trim()];
      setSuppliers(updatedSuppliers);
      localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
      window.dispatchEvent(new Event('suppliersUpdated'));
      setSupplier(newSupplier.trim());
      setNewSupplier("");
      setShowAddSupplier(false);
    }
  };

  const handleSubmit = () => {
    if (supplier && category) {
      const now = new Date();
      const newReception: Reception = {
        id: Date.now().toString(),
        supplier,
        category,
        date: now.toLocaleDateString('fr-FR'),
        status: "ok",
      };
      
      const updatedReceptions = [newReception, ...receptions];
      setReceptions(updatedReceptions);
      
      // Sauvegarder dans localStorage
      localStorage.setItem('receptions', JSON.stringify(updatedReceptions));
      
      // Ajouter à l'historique
      addToHistory({
        type: "Réception",
        action: "Nouvelle réception",
        value: `${supplier} - ${category}`,
        time: now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        date: now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
        person: "Système",
        details: `Fournisseur: ${supplier} - Catégorie: ${category}`
      });
      
      setOpen(false);
      setSupplier("");
      setCategory("");
      setShowAddSupplier(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-purple backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300 w-11 h-11">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Réception Marchandises</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl mb-6
              transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95 animate-fade-in-up">
              <Plus className="w-5 h-5 mr-2" />
              Nouvelle réception
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nouvelle réception</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <Label>Sélectionner un fournisseur</Label>
                <div className="grid grid-cols-2 gap-2">
                  {suppliers.map((sup) => (
                    <Button
                      key={sup}
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-auto py-3 px-4 text-sm font-normal transition-all duration-200 bg-purple-100 border-purple-300",
                        supplier === sup
                          ? "bg-purple-400 text-white border-purple-500 hover:bg-purple-500 hover:text-white"
                          : "hover:bg-purple-200"
                      )}
                      onClick={() => setSupplier(sup)}
                    >
                      {sup}
                    </Button>
                  ))}
                </div>
                {!showAddSupplier ? (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setShowAddSupplier(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un fournisseur
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nom du fournisseur"
                      value={newSupplier}
                      onChange={(e) => setNewSupplier(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddSupplier();
                      }}
                    />
                    <Button
                      type="button"
                      size="icon"
                      onClick={handleAddSupplier}
                      disabled={!newSupplier.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setShowAddSupplier(false);
                        setNewSupplier("");
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <Label>Sélectionner une catégorie</Label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat.name}
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-auto py-3 px-4 text-sm font-normal transition-all duration-200 border-2",
                        cat.color,
                        category === cat.name && "ring-2 ring-primary"
                      )}
                      onClick={() => setCategory(cat.name)}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button
                onClick={handleSubmit} 
                className="w-full"
                disabled={!supplier || !category}
              >
                Enregistrer
              </Button>
            </div>
          </DialogContent>
        </Dialog>

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
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{delivery.supplier}</h4>
                  <p className="text-sm text-muted-foreground">Catégorie: {delivery.category}</p>
                  <p className="text-sm text-muted-foreground">{delivery.date}</p>
                </div>
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  Conforme
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reception;

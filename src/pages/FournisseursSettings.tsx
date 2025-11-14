import { Home, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FournisseursSettings = () => {
  const [suppliers, setSuppliers] = useState<string[]>(() => {
    const saved = localStorage.getItem('suppliers');
    return saved ? JSON.parse(saved) : [
      "Pedrero",
      "Monin",
      "Carte D'or",
      "Metro",
      "Delidrinks",
    ];
  });
  const [newSupplier, setNewSupplier] = useState("");

  const handleAddSupplier = () => {
    if (newSupplier.trim() && !suppliers.includes(newSupplier.trim())) {
      const updatedSuppliers = [...suppliers, newSupplier.trim()];
      setSuppliers(updatedSuppliers);
      localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
      setNewSupplier("");
    }
  };

  const handleDeleteSupplier = (supplier: string) => {
    const updatedSuppliers = suppliers.filter(s => s !== supplier);
    setSuppliers(updatedSuppliers);
    localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-pink backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300 w-11 h-11">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/parametres">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Gestion des Fournisseurs</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6 space-y-6">
        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Ajouter un fournisseur</h2>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="supplier-name" className="sr-only">Nom du fournisseur</Label>
              <Input
                id="supplier-name"
                placeholder="Nom du fournisseur"
                value={newSupplier}
                onChange={(e) => setNewSupplier(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddSupplier();
                }}
              />
            </div>
            <Button
              onClick={handleAddSupplier}
              disabled={!newSupplier.trim()}
              className="px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Fournisseurs existants</h2>
          <div className="space-y-2">
            {suppliers.map((supplier) => (
              <div
                key={supplier}
                className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
              >
                <span className="font-medium">{supplier}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteSupplier(supplier)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FournisseursSettings;

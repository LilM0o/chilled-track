import { ArrowLeft, Truck, Plus, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Reception = () => {
  const [open, setOpen] = useState(false);
  const [supplier, setSupplier] = useState("");
  const [temperature, setTemperature] = useState("");
  const [articles, setArticles] = useState("");
  const [suppliers, setSuppliers] = useState([
    "Pedrero",
    "Monin",
    "Carte D'or",
    "Metro",
    "Delidrinks",
  ]);
  const [newSupplier, setNewSupplier] = useState("");
  const [showAddSupplier, setShowAddSupplier] = useState(false);

  const deliveries = [
    { supplier: "Fruits & Légumes Bio", date: "04/11/2025", temp: "4°C", status: "ok" },
    { supplier: "Boucherie Centrale", date: "03/11/2025", temp: "2°C", status: "ok" },
    { supplier: "Produits Laitiers", date: "02/11/2025", temp: "5°C", status: "ok" },
  ];

  const handleAddSupplier = () => {
    if (newSupplier.trim()) {
      setSuppliers([...suppliers, newSupplier.trim()]);
      setSupplier(newSupplier.trim());
      setNewSupplier("");
      setShowAddSupplier(false);
    }
  };

  const handleSubmit = () => {
    if (supplier && temperature) {
      // Ici, ajouter la logique pour sauvegarder la réception
      setOpen(false);
      setSupplier("");
      setTemperature("");
      setArticles("");
      setShowAddSupplier(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-card/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Réception Marchandises</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-purple text-module-purple-foreground rounded-3xl p-8 mb-6 text-center 
          animate-scale-in shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Truck className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Livraisons fournisseurs</h2>
          <p className="text-sm opacity-75">Contrôlez vos réceptions de marchandises</p>
        </div>

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
                        "h-auto py-3 px-4 text-sm font-normal transition-all duration-200",
                        supplier === sup
                          ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
                          : "hover:bg-accent"
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
              <div className="space-y-2">
                <Label htmlFor="articles">Nombre d'articles (optionnel)</Label>
                <Input
                  id="articles"
                  type="number"
                  placeholder="Ex: 5"
                  value={articles}
                  onChange={(e) => setArticles(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temp">Température camion (°C)</Label>
                <Input
                  id="temp"
                  type="number"
                  placeholder="Ex: 4"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleSubmit} 
                className="w-full"
                disabled={!supplier || !temperature}
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
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{delivery.supplier}</h4>
                  <p className="text-sm text-muted-foreground">{delivery.date}</p>
                </div>
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  Conforme
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">
                  Température camion: <strong>{delivery.temp}</strong>
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

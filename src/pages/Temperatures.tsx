import { ArrowLeft, Thermometer, Plus, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Temperatures = () => {
  const [open, setOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [temperature, setTemperature] = useState("");

  const equipments = [
    "Frigo aliments",
    "Réfrigérateur Bar",
    "Réfrigérateur Boissons 1",
    "Réfrigérateur Boissons 2",
    "Réfrigérateur Bubble Tea",
    "Congélateur 1",
    "Congélateur 2",
    "Congélateur 3",
    "Congélateur 4",
    "Congélateur Glaces",
  ];

  const fridges = [
    { name: "Frigo aliments", temp: "3°C", status: "ok", time: "Il y a 10 min" },
    { name: "Réfrigérateur Bar", temp: "4°C", status: "ok", time: "Il y a 25 min" },
    { name: "Congélateur 1", temp: "-18°C", status: "ok", time: "Il y a 1h" },
  ];

  const handleSubmit = () => {
    if (selectedEquipment && temperature) {
      // Ici, ajouter la logique pour sauvegarder le relevé
      setOpen(false);
      setSelectedEquipment("");
      setTemperature("");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-green/30 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300 w-11 h-11">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Températures Frigos</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl mb-6
              transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95 animate-fade-in-up">
              <Plus className="w-5 h-5 mr-2" />
              Nouveau relevé
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nouveau relevé de température</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <Label>Sélectionner un équipement</Label>
                <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                  {equipments.map((eq) => (
                    <Button
                      key={eq}
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-auto py-3 px-4 text-sm font-normal transition-all duration-200",
                        selectedEquipment === eq
                          ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
                          : "hover:bg-accent"
                      )}
                      onClick={() => setSelectedEquipment(eq)}
                    >
                      {eq}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Température (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="Ex: 3"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleSubmit} 
                className="w-full"
                disabled={!selectedEquipment || !temperature}
              >
                Enregistrer
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-lg font-semibold">Derniers relevés</h3>
          {fridges.map((fridge, i) => (
            <div 
              key={i} 
              className="bg-card rounded-2xl p-4 shadow-sm
                transition-all duration-300 hover:shadow-md hover:scale-[1.01]
                cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{fridge.name}</h4>
                  <p className="text-2xl font-bold text-module-green-foreground mt-1 transition-transform duration-300 hover:scale-105">
                    {fridge.temp}
                  </p>
                </div>
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  Conforme
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{fridge.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Temperatures;

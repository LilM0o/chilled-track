import { ArrowLeft, Refrigerator, Plus, Snowflake, Wind, Home, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EquipementsSettings = () => {
  const [open, setOpen] = useState(false);
  const [newEquipmentName, setNewEquipmentName] = useState("");
  const [newEquipmentType, setNewEquipmentType] = useState("");
  const [newEquipmentTemp, setNewEquipmentTemp] = useState("");
  
  const [equipments, setEquipments] = useState(() => {
    const saved = localStorage.getItem('equipments');
    if (saved) {
      return JSON.parse(saved).map((eq: any) => ({
        ...eq,
        icon: eq.type === "Réfrigérateur" ? Refrigerator : Snowflake
      }));
    }
    const defaultEquipments = [
      { name: "Frigo aliments", type: "Réfrigérateur", temp: "3°C", status: "ok", icon: Refrigerator },
      { name: "Réfrigérateur Bar", type: "Réfrigérateur", temp: "4°C", status: "ok", icon: Refrigerator },
      { name: "Réfrigérateur Boissons 1", type: "Réfrigérateur", temp: "4°C", status: "ok", icon: Refrigerator },
      { name: "Réfrigérateur Boissons 2", type: "Réfrigérateur", temp: "5°C", status: "ok", icon: Refrigerator },
      { name: "Réfrigérateur Bubble Tea", type: "Réfrigérateur", temp: "3°C", status: "ok", icon: Refrigerator },
      { name: "Congélateur 1", type: "Congélateur", temp: "-18°C", status: "ok", icon: Snowflake },
      { name: "Congélateur 2", type: "Congélateur", temp: "-19°C", status: "ok", icon: Snowflake },
      { name: "Congélateur 3", type: "Congélateur", temp: "-18°C", status: "ok", icon: Snowflake },
      { name: "Congélateur 4", type: "Congélateur", temp: "-20°C", status: "ok", icon: Snowflake },
      { name: "Congélateur Glaces", type: "Congélateur", temp: "-22°C", status: "ok", icon: Snowflake },
    ];
    // Save default equipments to localStorage
    localStorage.setItem('equipments', JSON.stringify(defaultEquipments.map(({ icon, ...rest }) => rest)));
    return defaultEquipments;
  });

  // Ensure equipments are always in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('equipments');
    if (!saved && equipments.length > 0) {
      localStorage.setItem('equipments', JSON.stringify(equipments.map(({ icon, ...rest }) => rest)));
      window.dispatchEvent(new Event('equipmentsUpdated'));
    }
  }, []);

  const handleAddEquipment = () => {
    if (newEquipmentName && newEquipmentType && newEquipmentTemp) {
      const icon = newEquipmentType === "Réfrigérateur" ? Refrigerator : Snowflake;
      const newEquipment = {
        name: newEquipmentName,
        type: newEquipmentType,
        temp: newEquipmentTemp,
        status: "ok",
        icon
      };
      const updatedEquipments = [...equipments, newEquipment];
      setEquipments(updatedEquipments);
      localStorage.setItem('equipments', JSON.stringify(updatedEquipments.map(({ icon, ...rest }) => rest)));
      window.dispatchEvent(new Event('equipmentsUpdated'));
      setOpen(false);
      setNewEquipmentName("");
      setNewEquipmentType("");
      setNewEquipmentTemp("");
    }
  };

  const handleDeleteEquipment = (index: number) => {
    const updatedEquipments = equipments.filter((_, i) => i !== index);
    setEquipments(updatedEquipments);
    localStorage.setItem('equipments', JSON.stringify(updatedEquipments.map(({ icon, ...rest }) => rest)));
    window.dispatchEvent(new Event('equipmentsUpdated'));
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-pink backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="w-11 h-11">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/parametres">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Équipements</h1>
          <Button size="icon" className="ml-auto rounded-xl" onClick={() => setOpen(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">

        <div className="space-y-3">
          {equipments.map((equipment, i) => {
            const Icon = equipment.icon;
            return (
              <div 
                key={i}
                className="bg-card rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-secondary rounded-xl p-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{equipment.name}</h3>
                      <Badge 
                        variant={equipment.status === "ok" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {equipment.status === "ok" ? "Conforme" : "À surveiller"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{equipment.type}</p>
                    <p className="text-sm font-medium text-primary mt-1">{equipment.temp}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteEquipment(i)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ajouter un équipement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="equipment-name">Nom de l'équipement</Label>
                <Input
                  id="equipment-name"
                  placeholder="Ex: Frigo Bar"
                  value={newEquipmentName}
                  onChange={(e) => setNewEquipmentName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment-type">Type</Label>
                <Select value={newEquipmentType} onValueChange={setNewEquipmentType}>
                  <SelectTrigger id="equipment-type">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Réfrigérateur">Réfrigérateur</SelectItem>
                    <SelectItem value="Congélateur">Congélateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment-temp">Température cible</Label>
                <Input
                  id="equipment-temp"
                  placeholder="Ex: 3°C ou -18°C"
                  value={newEquipmentTemp}
                  onChange={(e) => setNewEquipmentTemp(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleAddEquipment} 
                className="w-full"
                disabled={!newEquipmentName || !newEquipmentType || !newEquipmentTemp}
              >
                Ajouter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EquipementsSettings;

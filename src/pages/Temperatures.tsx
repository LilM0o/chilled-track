import { ArrowLeft, Thermometer, Plus, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TemperatureReading {
  id: string;
  equipment: string;
  temperature: string;
  date: string;
  time: string;
  status: 'ok' | 'warning' | 'alert';
  targetTemp?: string;
}

const Temperatures = () => {
  const [open, setOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [temperature, setTemperature] = useState("");

  const [readings, setReadings] = useState<TemperatureReading[]>(() => {
    const saved = localStorage.getItem('temperatureReadings');
    return saved ? JSON.parse(saved) : [];
  });

  // Load equipments dynamically from localStorage
  const [equipments, setEquipments] = useState<string[]>(() => {
    const saved = localStorage.getItem('equipments');
    if (saved) {
      try {
        const parsedEquipments = JSON.parse(saved);
        // Extract only the names
        return parsedEquipments.map((eq: any) => eq.name);
      } catch (e) {
        return [];
      }
    }
    return [
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
  });

  // Sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('equipments');
      if (saved) {
        try {
          const parsedEquipments = JSON.parse(saved);
          setEquipments(parsedEquipments.map((eq: any) => eq.name));
        } catch (e) {
          setEquipments([]);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('equipmentsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('equipmentsUpdated', handleStorageChange);
    };
  }, []);

  const handleSubmit = () => {
    if (selectedEquipment && temperature) {
      // Get equipment info to determine status
      const saved = localStorage.getItem('equipments');
      let targetTemp = "";
      let status: 'ok' | 'warning' | 'alert' = 'ok';
      
      if (saved) {
        try {
          const equipments = JSON.parse(saved);
          const equipment = equipments.find((eq: any) => eq.name === selectedEquipment);
          if (equipment) {
            targetTemp = equipment.temp;
            
            // Extract numeric value from temperature strings
            const currentTemp = parseFloat(temperature);
            const target = parseFloat(targetTemp);
            
            if (!isNaN(currentTemp) && !isNaN(target)) {
              const diff = Math.abs(currentTemp - target);
              if (diff > 2) {
                status = 'alert';
              } else if (diff > 1) {
                status = 'warning';
              }
            }
          }
        } catch (e) {
          console.error('Error parsing equipments:', e);
        }
      }
      
      const now = new Date();
      const newReading: TemperatureReading = {
        id: Date.now().toString(),
        equipment: selectedEquipment,
        temperature: temperature.includes('°') ? temperature : `${temperature}°C`,
        date: now.toLocaleDateString('fr-FR'),
        time: now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        status,
        targetTemp
      };
      
      const updatedReadings = [newReading, ...readings];
      setReadings(updatedReadings);
      localStorage.setItem('temperatureReadings', JSON.stringify(updatedReadings));
      
      setOpen(false);
      setSelectedEquipment("");
      setTemperature("");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-green backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
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
          {readings.length === 0 ? (
            <div className="bg-card rounded-2xl p-8 text-center">
              <p className="text-muted-foreground">Aucun relevé enregistré</p>
            </div>
          ) : (
            readings.slice(0, 10).map((reading, i) => {
              const statusColors = {
                ok: { bg: 'bg-accent', text: 'text-accent-foreground', label: 'Conforme', tempColor: 'text-module-green-foreground' },
                warning: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'À surveiller', tempColor: 'text-orange-600' },
                alert: { bg: 'bg-destructive/20', text: 'text-destructive', label: 'Alerte', tempColor: 'text-destructive' }
              };
              const colors = statusColors[reading.status];
              
              return (
                <div 
                  key={reading.id} 
                  className="bg-card rounded-2xl p-4 shadow-sm
                    transition-all duration-300 hover:shadow-md hover:scale-[1.01]
                    cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{reading.equipment}</h4>
                      <p className={cn("text-2xl font-bold mt-1 transition-transform duration-300 hover:scale-105", colors.tempColor)}>
                        {reading.temperature}
                      </p>
                      {reading.targetTemp && (
                        <p className="text-xs text-muted-foreground mt-1">Cible: {reading.targetTemp}</p>
                      )}
                    </div>
                    <span className={cn("px-3 py-1 rounded-full text-xs font-medium shadow-sm", colors.bg, colors.text)}>
                      {colors.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{reading.date} à {reading.time}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Temperatures;

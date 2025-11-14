import { ArrowLeft, Thermometer, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TemperatureSettings = () => {
  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-card/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/parametres">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Seuils de température</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-green text-module-green-foreground rounded-3xl p-8 mb-6 text-center animate-scale-in shadow-lg">
          <Thermometer className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Limites de température</h2>
          <p className="text-sm opacity-75">Définissez les seuils acceptables pour chaque équipement</p>
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Réfrigérateurs</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="fridge-min">Température minimale (°C)</Label>
                  <Input id="fridge-min" type="number" defaultValue="0" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="fridge-max">Température maximale (°C)</Label>
                  <Input id="fridge-max" type="number" defaultValue="4" className="mt-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Congélateurs</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="freezer-min">Température minimale (°C)</Label>
                  <Input id="freezer-min" type="number" defaultValue="-25" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="freezer-max">Température maximale (°C)</Label>
                  <Input id="freezer-max" type="number" defaultValue="-18" className="mt-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Zone de préparation chaude</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="hot-min">Température minimale (°C)</Label>
                  <Input id="hot-min" type="number" defaultValue="63" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="hot-max">Température maximale (°C)</Label>
                  <Input id="hot-max" type="number" defaultValue="100" className="mt-1" />
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full rounded-xl">Enregistrer les modifications</Button>
        </div>
      </div>
    </div>
  );
};

export default TemperatureSettings;

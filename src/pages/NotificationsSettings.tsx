import { ArrowLeft, Bell, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const NotificationsSettings = () => {
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
          <h1 className="text-2xl font-bold text-primary">Notifications</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-pink text-module-pink-foreground rounded-3xl p-8 mb-6 text-center animate-scale-in shadow-lg">
          <Bell className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Alertes et notifications</h2>
          <p className="text-sm opacity-75">Configurez vos préférences de notification</p>
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="temp-alerts" className="text-base font-medium">Alertes de température</Label>
                <p className="text-sm text-muted-foreground mt-1">Recevoir des notifications en cas de dépassement</p>
              </div>
              <Switch id="temp-alerts" defaultChecked />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="dlc-alerts" className="text-base font-medium">Alertes DLC</Label>
                <p className="text-sm text-muted-foreground mt-1">Notifications pour les produits proches de la date limite</p>
              </div>
              <Switch id="dlc-alerts" defaultChecked />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="cleaning-alerts" className="text-base font-medium">Rappels de nettoyage</Label>
                <p className="text-sm text-muted-foreground mt-1">Tâches de nettoyage en retard ou à venir</p>
              </div>
              <Switch id="cleaning-alerts" defaultChecked />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="reception-alerts" className="text-base font-medium">Réceptions</Label>
                <p className="text-sm text-muted-foreground mt-1">Notifications pour les livraisons attendues</p>
              </div>
              <Switch id="reception-alerts" />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="email-notifs" className="text-base font-medium">Notifications par email</Label>
                <p className="text-sm text-muted-foreground mt-1">Recevoir un récapitulatif quotidien par email</p>
              </div>
              <Switch id="email-notifs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;

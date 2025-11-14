import { ArrowLeft, BarChart3, Home, Thermometer, SprayCan, Package, Truck, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Activity = {
  type: string;
  action: string;
  value?: string;
  time: string;
  date: string;
  person: string;
  details?: string;
};

const Historique = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const activities: Activity[] = [
    { 
      type: "Réception", 
      action: "Nouvelle réception", 
      value: "Ferme Bio du Terroir - 5 articles", 
      time: "08:30", 
      date: "04 janvier 2025",
      person: "Marie Dubois",
      details: "Température camion: 4°C - Articles: Poulet fermier (x3), Œufs bio (x2)"
    },
    { 
      type: "Températures", 
      action: "Relevé de température", 
      value: "Frigo principal - 3.5°C", 
      time: "08:15", 
      date: "04 janvier 2025",
      person: "Marie Dubois",
      details: "Température conforme - Frigo principal"
    },
    { 
      type: "Nettoyage", 
      action: "Tâche complétée", 
      value: "Nettoyage des plans de travail", 
      time: "08:00", 
      date: "04 janvier 2025",
      person: "Marie Dubois",
      details: "Nettoyage effectué selon le protocole - Produits utilisés: Désinfectant alimentaire"
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "Températures":
        return <Thermometer className="w-5 h-5" />;
      case "Nettoyage":
        return <SprayCan className="w-5 h-5" />;
      case "Traçabilité":
        return <Package className="w-5 h-5" />;
      case "Réception":
        return <Truck className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "Températures":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Nettoyage":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "Traçabilité":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Réception":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setDetailsOpen(true);
  };

  const filterActivities = (filter: string) => {
    if (filter === "Tout") return activities;
    return activities.filter(a => a.type === filter);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary flex-1">Historique</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <Tabs defaultValue="Tout" className="w-full">
          <TabsList className="w-full grid grid-cols-5 mb-6">
            <TabsTrigger value="Tout">Tout</TabsTrigger>
            <TabsTrigger value="Traçabilité">Traçabilité</TabsTrigger>
            <TabsTrigger value="Températures">Températures</TabsTrigger>
            <TabsTrigger value="Nettoyage">Nettoyage</TabsTrigger>
            <TabsTrigger value="Réception">Réception</TabsTrigger>
          </TabsList>

          {["Tout", "Traçabilité", "Températures", "Nettoyage", "Réception"].map((filter) => (
            <TabsContent key={filter} value={filter} className="space-y-6">
              {filterActivities(filter).reduce((acc, activity) => {
                const lastGroup = acc[acc.length - 1];
                if (!lastGroup || lastGroup.date !== activity.date) {
                  acc.push({ date: activity.date, items: [activity] });
                } else {
                  lastGroup.items.push(activity);
                }
                return acc;
              }, [] as { date: string; items: Activity[] }[]).map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">{group.date}</h3>
                  <div className="space-y-3">
                    {group.items.map((activity, i) => (
                      <div
                        key={i}
                        onClick={() => handleActivityClick(activity)}
                        className="bg-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-xl ${getColor(activity.type)}`}>
                            {getIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium">{activity.action}</h4>
                                {activity.value && (
                                  <p className="text-sm text-muted-foreground mt-1">{activity.value}</p>
                                )}
                              </div>
                              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap">
                                {activity.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {activity.time}
                              </span>
                              <span>•</span>
                              <span>{activity.person}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de l'activité</DialogTitle>
          </DialogHeader>
          {selectedActivity && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${getColor(selectedActivity.type)}`}>
                  {getIcon(selectedActivity.type)}
                </div>
                <div>
                  <h4 className="font-medium">{selectedActivity.action}</h4>
                  <p className="text-sm text-muted-foreground">{selectedActivity.type}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{selectedActivity.date}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Heure</span>
                  <span className="font-medium">{selectedActivity.time}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Personne</span>
                  <span className="font-medium">{selectedActivity.person}</span>
                </div>
                {selectedActivity.value && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Information</span>
                    <span className="font-medium text-right">{selectedActivity.value}</span>
                  </div>
                )}
                {selectedActivity.details && (
                  <div className="py-2">
                    <span className="text-muted-foreground block mb-2">Détails</span>
                    <p className="text-sm">{selectedActivity.details}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Historique;

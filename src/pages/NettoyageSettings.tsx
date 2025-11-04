import { ArrowLeft, SprayCan, Plus, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

interface CleaningTask {
  id: number;
  zone: string;
  frequency: string;
  lastCleaned: string;
  responsible: string;
  status: "completed" | "pending";
}

const NettoyageSettings = () => {
  const [tasks, setTasks] = useState<CleaningTask[]>([
    {
      id: 1,
      zone: "Cuisine principale",
      frequency: "Quotidien",
      lastCleaned: "Aujourd'hui 08:00",
      responsible: "Marie D.",
      status: "completed"
    },
    {
      id: 2,
      zone: "Chambre froide",
      frequency: "Quotidien",
      lastCleaned: "Hier 18:00",
      responsible: "Paul M.",
      status: "pending"
    },
    {
      id: 3,
      zone: "Zone de réception",
      frequency: "Hebdomadaire",
      lastCleaned: "Il y a 2 jours",
      responsible: "Sophie L.",
      status: "completed"
    }
  ]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/parametres">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Plan de Nettoyage</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-orange text-module-orange-foreground rounded-3xl p-8 mb-6 text-center animate-scale-in shadow-lg">
          <SprayCan className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Gestion du Plan de Nettoyage</h2>
          <p className="text-sm opacity-75">Configurez et suivez les tâches de nettoyage</p>
        </div>

        <div className="mb-6">
          <Button className="w-full sm:w-auto gap-2">
            <Plus className="w-4 h-4" />
            Ajouter une tâche de nettoyage
          </Button>
        </div>

        <div className="space-y-4 animate-fade-in-up">
          <h3 className="text-lg font-semibold text-foreground">Tâches configurées</h3>
          
          {tasks.map((task, index) => (
            <Card 
              key={task.id} 
              className="p-4 hover:shadow-md transition-shadow duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${task.status === 'completed' ? 'bg-module-green/20' : 'bg-module-orange/20'}`}>
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Clock className="w-6 h-6 text-orange-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{task.zone}</h4>
                      <p className="text-sm text-muted-foreground">Fréquence : {task.frequency}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === 'completed' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                    }`}>
                      {task.status === 'completed' ? 'Complété' : 'En attente'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{task.lastCleaned}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Responsable : {task.responsible}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6">
          <h3 className="font-semibold mb-4 text-foreground">Configuration des zones</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Zones configurées</span>
              <span className="font-semibold">{tasks.length}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Tâches en attente</span>
              <span className="font-semibold text-orange-600">
                {tasks.filter(t => t.status === 'pending').length}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Taux de complétion</span>
              <span className="font-semibold text-green-600">
                {Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%
              </span>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default NettoyageSettings;

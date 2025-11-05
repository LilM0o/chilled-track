import { ArrowLeft, SprayCan, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Nettoyage = () => {
  const [open, setOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const personnel = [
    "Hugo",
    "Florian",
    "Lorraine",
    "Lauria",
    "Tim Eliot",
    "Aymene",
    "Meriem",
    "Sy'RAI",
    "Djali",
  ];

  const tasks = [
    { name: "Nettoyage sols cuisine", frequency: "Quotidien", status: "done", time: "08:30", person: "Hugo" },
    { name: "Désinfection surfaces", frequency: "Quotidien", status: "pending" },
    { name: "Nettoyage frigos", frequency: "Hebdomadaire", status: "pending" },
    { name: "Contrôle bacs graisse", frequency: "Mensuel", status: "done", time: "01/11", person: "Florian" },
  ];

  const handleValidateTask = (index: number) => {
    setSelectedTask(index);
    setSelectedPerson("");
    setOpen(true);
  };

  const handleConfirmValidation = () => {
    if (selectedPerson && selectedTask !== null) {
      // Ici, ajouter la logique pour sauvegarder la validation
      setOpen(false);
      setSelectedPerson("");
      setSelectedTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Plan de Nettoyage</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-orange text-module-orange-foreground rounded-3xl p-8 mb-6 text-center 
          animate-scale-in shadow-lg hover:shadow-xl transition-shadow duration-300">
          <SprayCan className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Tâches et conformité</h2>
          <p className="text-sm opacity-75">Suivez votre plan de nettoyage</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-in-up">
          <div className="bg-card rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <p className="text-2xl font-bold text-primary">12/15</p>
            <p className="text-sm text-muted-foreground">Complétées</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <p className="text-2xl font-bold text-primary">80%</p>
            <p className="text-sm text-muted-foreground">Conformité</p>
          </div>
        </div>

        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-lg font-semibold">Tâches du jour</h3>
          {tasks.map((task, i) => (
            <div 
              key={i} 
              className="bg-card rounded-2xl p-4 shadow-sm 
                transition-all duration-300 hover:shadow-md hover:scale-[1.01]
                animate-fade-in-up"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {task.status === "done" ? (
                    <CheckCircle className="w-5 h-5 text-accent transition-transform duration-300 hover:scale-110" />
                  ) : (
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{task.name}</h4>
                  <p className="text-sm text-muted-foreground">{task.frequency}</p>
                  {task.time && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Fait à {task.time} par {task.person}
                    </p>
                  )}
                </div>
                {task.status === "pending" && (
                  <Button 
                    size="sm" 
                    className="rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    onClick={() => handleValidateTask(i)}
                  >
                    Valider
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Valider la tâche</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <Label>Qui a effectué cette tâche ?</Label>
              <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                {personnel.map((person) => (
                  <Button
                    key={person}
                    type="button"
                    variant="outline"
                    className={cn(
                      "h-auto py-3 px-4 text-sm font-normal transition-all duration-200",
                      selectedPerson === person
                        ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
                        : "hover:bg-accent"
                    )}
                    onClick={() => setSelectedPerson(person)}
                  >
                    {person}
                  </Button>
                ))}
              </div>
            </div>
            <Button 
              onClick={handleConfirmValidation} 
              className="w-full"
              disabled={!selectedPerson}
            >
              Confirmer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Nettoyage;

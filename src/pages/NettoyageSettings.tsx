import { ArrowLeft, SprayCan, Plus, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NettoyageSettings = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [frequency, setFrequency] = useState("");

  const cleaningTasks = [
    { name: "Nettoyage sols cuisine", frequency: "Quotidien" },
    { name: "Désinfection surfaces", frequency: "Quotidien" },
    { name: "Nettoyage frigos", frequency: "Hebdomadaire" },
    { name: "Contrôle bacs graisse", frequency: "Mensuel" },
    { name: "Nettoyage hotte", frequency: "Hebdomadaire" },
  ];

  const handleAddTask = () => {
    if (taskName && frequency) {
      // Ici, ajouter la logique pour sauvegarder la tâche
      setOpen(false);
      setTaskName("");
      setFrequency("");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card/95 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/parametres">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Plan de nettoyage</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="icon" className="ml-auto">
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Ajouter une tâche</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="taskName">Nom de la tâche</Label>
                  <Input
                    id="taskName"
                    placeholder="Ex: Nettoyage plan de travail"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Fréquence</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Sélectionner une fréquence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quotidien">Quotidien</SelectItem>
                      <SelectItem value="Hebdomadaire">Hebdomadaire</SelectItem>
                      <SelectItem value="Mensuel">Mensuel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleAddTask} 
                  className="w-full"
                  disabled={!taskName || !frequency}
                >
                  Ajouter
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-orange text-module-orange-foreground rounded-3xl p-8 mb-6 text-center shadow-lg">
          <SprayCan className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Gestion du plan</h2>
          <p className="text-sm opacity-75">Configurez vos tâches de nettoyage</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-4">Tâches configurées</h3>
          {cleaningTasks.map((task, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{task.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{task.frequency}</p>
                </div>
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Modifier la tâche</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="editTaskName">Nom de la tâche</Label>
                        <Input
                          id="editTaskName"
                          defaultValue={task.name}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editFrequency">Fréquence</Label>
                        <Select defaultValue={task.frequency}>
                          <SelectTrigger id="editFrequency">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Quotidien">Quotidien</SelectItem>
                            <SelectItem value="Hebdomadaire">Hebdomadaire</SelectItem>
                            <SelectItem value="Mensuel">Mensuel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">
                        Sauvegarder
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default NettoyageSettings;

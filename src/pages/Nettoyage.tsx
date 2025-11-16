import { ArrowLeft, SprayCan, CheckCircle, Clock, Home, History } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { addToHistory } from "@/utils/historyUtils";

interface Task {
  name: string;
  frequency: string;
  status: "done" | "pending";
  time?: string;
  person?: string;
  category: string;
}

const Nettoyage = () => {
  const [open, setOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [editCompletedOpen, setEditCompletedOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  // Load personnel dynamically from localStorage
  const [personnel, setPersonnel] = useState<string[]>(() => {
    const stored = localStorage.getItem('personnel');
    if (stored) {
      try {
        const parsedPersonnel = JSON.parse(stored);
        // Filter only active personnel and extract names
        return parsedPersonnel
          .filter((p: any) => p.status === 'active')
          .map((p: any) => p.name);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('personnel');
      if (stored) {
        try {
          const parsedPersonnel = JSON.parse(stored);
          setPersonnel(
            parsedPersonnel
              .filter((p: any) => p.status === 'active')
              .map((p: any) => p.name)
          );
        } catch (e) {
          setPersonnel([]);
        }
      } else {
        setPersonnel([]);
      }
    };

    // Load personnel on mount
    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-tab updates
    window.addEventListener('personnelUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('personnelUpdated', handleStorageChange);
    };
  }, []);

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('cleaningTasks');
    return saved ? JSON.parse(saved) : [
      { name: "Nettoyage sols cuisine", frequency: "Quotidien", status: "pending", category: "Production" },
      { name: "Désinfection surfaces", frequency: "Quotidien", status: "pending", category: "Production" },
      { name: "Nettoyage frigos", frequency: "Hebdomadaire", status: "pending", category: "Reserve" },
      { name: "Contrôle bacs graisse", frequency: "Mensuel", status: "pending", category: "Production" },
    ];
  });

  const completedTasks = tasks.filter(t => t.status === "done");
  const pendingTasks = tasks.filter(t => t.status === "pending");
  const allCompleted = pendingTasks.length === 0;

  const handleValidateTask = (index: number) => {
    setSelectedTask(index);
    setSelectedPerson("");
    setOpen(true);
  };

  const handleConfirmValidation = () => {
    if (selectedPerson && selectedTask !== null) {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map((task, idx) => 
          idx === selectedTask 
            ? { ...task, status: "done" as const, time, person: selectedPerson }
            : task
        );
        
        // Sauvegarder dans localStorage
        localStorage.setItem('cleaningTasks', JSON.stringify(updatedTasks));
        
        // Ajouter à l'historique
        const completedTask = updatedTasks[selectedTask];
        addToHistory({
          type: "Nettoyage",
          action: "Tâche complétée",
          value: completedTask.name,
          time: time,
          date: now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
          person: selectedPerson,
          details: `Fréquence: ${completedTask.frequency} - Catégorie: ${completedTask.category}`
        });
        
        return updatedTasks;
      });
      
      setOpen(false);
      setSelectedPerson("");
      setSelectedTask(null);
    }
  };

  const handleEditCompletedTask = (taskIndex: number) => {
    setSelectedTask(taskIndex);
    setSelectedPerson(tasks[taskIndex].person || "");
    setEditCompletedOpen(true);
  };

  const handleConfirmEditCompleted = () => {
    if (selectedPerson && selectedTask !== null) {
      const now = new Date();
      
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map((task, idx) => 
          idx === selectedTask 
            ? { ...task, person: selectedPerson }
            : task
        );
        
        // Sauvegarder dans localStorage
        localStorage.setItem('cleaningTasks', JSON.stringify(updatedTasks));
        
        // Ajouter à l'historique
        const editedTask = updatedTasks[selectedTask];
        const oldPerson = tasks[selectedTask].person || "Inconnu";
        addToHistory({
          type: "Nettoyage",
          action: "Modification tâche",
          value: editedTask.name,
          time: editedTask.time || "",
          date: now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
          person: selectedPerson,
          details: `Personne modifiée: ${oldPerson} → ${selectedPerson}`
        });
        
        return updatedTasks;
      });
      
      setEditCompletedOpen(false);
      setSelectedPerson("");
      setSelectedTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-orange backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300 w-11 h-11">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Plan de Nettoyage</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">

        <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-in-up">
          <div className="bg-card rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <p className="text-2xl font-bold text-primary">{completedTasks.length}/{tasks.length}</p>
            <p className="text-sm text-muted-foreground">Complétées</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <p className="text-2xl font-bold text-primary">{Math.round((completedTasks.length / tasks.length) * 100)}%</p>
            <p className="text-sm text-muted-foreground">Conformité</p>
          </div>
        </div>

        {pendingTasks.length > 0 && (
          <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold mb-4 text-destructive">Tâches à faire ({pendingTasks.length})</h3>
            <div className="space-y-3">
              {pendingTasks.map((task, i) => {
                const taskIndex = tasks.findIndex(t => t === task);
                return (
                  <div 
                    key={taskIndex} 
                    className="bg-destructive/10 border-2 border-destructive/30 rounded-2xl p-4 shadow-sm 
                      transition-all duration-300 hover:shadow-md hover:scale-[1.01]
                      animate-fade-in-up"
                    style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Clock className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{task.name}</h4>
                        <p className="text-sm text-muted-foreground">{task.category} • {task.frequency}</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                        onClick={() => handleValidateTask(taskIndex)}
                      >
                        Valider
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold">Tâches complétées ({completedTasks.length})</h3>
            {completedTasks.map((task, i) => {
              const taskIndex = tasks.findIndex(t => t === task);
              return (
                <div 
                  key={taskIndex} 
                  className={cn(
                    "rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01] animate-fade-in-up cursor-pointer",
                    allCompleted ? "bg-accent/20 border-2 border-accent" : "bg-card"
                  )}
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                  onClick={() => handleEditCompletedTask(taskIndex)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle className={cn(
                        "w-5 h-5 transition-transform duration-300 hover:scale-110",
                        allCompleted ? "text-accent" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{task.name}</h4>
                      <p className="text-sm text-muted-foreground">{task.category} • {task.frequency}</p>
                      {task.time && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Fait à {task.time} par {task.person}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Valider la tâche</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <Label>Qui a effectué cette tâche ?</Label>
              {personnel.length === 0 ? (
                <p className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
                  Aucun personnel actif. Ajoutez du personnel dans Paramètres {">"} Personnel.
                </p>
              ) : (
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
              )}
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

      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Historique des tâches validées</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {completedTasks.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Aucune tâche validée pour le moment</p>
            ) : (
              completedTasks.map((task, i) => (
                <div key={i} className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium">{task.name}</h4>
                      <p className="text-sm text-muted-foreground">{task.frequency}</p>
                      {task.time && task.person && (
                        <p className="text-xs text-muted-foreground mt-2">
                          ✓ Validé le {new Date().toLocaleDateString()} à {task.time} par <span className="font-semibold">{task.person}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={editCompletedOpen} onOpenChange={setEditCompletedOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier la personne</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <Label>Qui a effectué cette tâche ?</Label>
              {personnel.length === 0 ? (
                <p className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
                  Aucun personnel actif. Ajoutez du personnel dans Paramètres {">"} Personnel.
                </p>
              ) : (
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
              )}
            </div>
            <Button 
              onClick={handleConfirmEditCompleted} 
              className="w-full"
              disabled={!selectedPerson}
            >
              Confirmer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Nettoyage;

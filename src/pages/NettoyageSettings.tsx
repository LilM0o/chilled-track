import { ArrowLeft, SprayCan, Plus, Edit, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const NettoyageSettings = () => {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { name: "Reserve", color: "bg-blue-200 border-blue-400" },
    { name: "TGBT", color: "bg-yellow-200 border-yellow-400" },
    { name: "Magasin", color: "bg-green-200 border-green-400" },
    { name: "Production", color: "bg-red-200 border-red-400" },
  ];

  const daysOfWeek = [
    { id: "lundi", name: "Lun" },
    { id: "mardi", name: "Mar" },
    { id: "mercredi", name: "Mer" },
    { id: "jeudi", name: "Jeu" },
    { id: "vendredi", name: "Ven" },
    { id: "samedi", name: "Sam" },
  ];

  const cleaningTasks = [
    { name: "Nettoyage sols cuisine", frequency: "Quotidien", days: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], category: "Production" },
    { name: "Désinfection surfaces", frequency: "Quotidien", days: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], category: "Production" },
    { name: "Nettoyage frigos", frequency: "Hebdomadaire", days: ["vendredi"], category: "Reserve" },
    { name: "Contrôle bacs graisse", frequency: "Mensuel", days: ["samedi"], category: "Production" },
    { name: "Nettoyage hotte", frequency: "Hebdomadaire", days: ["mercredi"], category: "Production" },
    { name: "Rangement stocks", frequency: "Quotidien", days: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], category: "Reserve" },
    { name: "Nettoyage vitrine", frequency: "Quotidien", days: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], category: "Magasin" },
    { name: "Contrôle électrique", frequency: "Mensuel", days: ["samedi"], category: "TGBT" },
  ];

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev =>
      prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]
    );
  };

  const handleAddTask = () => {
    if (taskName && frequency && selectedDays.length > 0 && selectedCategory) {
      setOpen(false);
      setTaskName("");
      setFrequency("");
      setSelectedDays([]);
      setSelectedCategory("");
    }
  };

  const getCategoryColor = (categoryName: string) => {
    return categories.find(c => c.name === categoryName)?.color || "bg-gray-200 border-gray-400";
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-pink/30 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="w-11 h-11">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
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
                  <Input id="taskName" placeholder="Ex: Nettoyage plan de travail" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </div>
                <div className="space-y-3">
                  <Label>Catégorie</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <Button key={cat.name} type="button" variant="outline" className={cn("h-auto py-3 px-4 text-sm font-normal transition-all duration-200 border-2", cat.color, selectedCategory === cat.name && "ring-2 ring-primary")} onClick={() => setSelectedCategory(cat.name)}>
                        {cat.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Fréquence</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger id="frequency"><SelectValue placeholder="Sélectionner une fréquence" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quotidien">Quotidien</SelectItem>
                      <SelectItem value="Hebdomadaire">Hebdomadaire</SelectItem>
                      <SelectItem value="Mensuel">Mensuel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>Jours de la semaine</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {daysOfWeek.map((day) => (
                      <Button key={day.id} type="button" variant="outline" className={cn("h-auto py-2 px-3 text-sm transition-all duration-200", selectedDays.includes(day.id) ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground" : "hover:bg-accent")} onClick={() => toggleDay(day.id)}>
                        {day.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleAddTask} className="w-full" disabled={!taskName || !frequency || selectedDays.length === 0 || !selectedCategory}>Ajouter</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <div className="max-w-screen-xl mx-auto px-6 space-y-6">
        {categories.map((category) => {
          const categoryTasks = cleaningTasks.filter(task => task.category === category.name);
          return (
            <div key={category.name} className="space-y-3">
              <div className={cn("rounded-2xl p-4 border-2", category.color)}>
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-sm text-muted-foreground">{categoryTasks.length} tâche(s)</p>
              </div>
              <div className="space-y-2">
                {categoryTasks.map((task, i) => (
                  <div key={i} className={cn("bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4", category.color.split(' ')[1].replace('border-', 'border-l-'))}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium">{task.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Fréquence: {task.frequency}</p>
                        <p className="text-xs text-muted-foreground mt-1">Jours: {task.days.map(d => daysOfWeek.find(day => day.id === d)?.name).join(", ")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NettoyageSettings;

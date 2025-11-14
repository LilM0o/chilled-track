import { ArrowLeft, SprayCan, Plus, Edit, Home, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const NettoyageSettings = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
  const [editingDays, setEditingDays] = useState<string[]>([]);

  const categories = [
    { name: "Reserve", color: "bg-rose-100 border-rose-300 text-rose-700" },
    { name: "TGBT", color: "bg-pink-100 border-pink-300 text-pink-700" },
    { name: "Magasin", color: "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-700" },
    { name: "Production", color: "bg-purple-100 border-purple-300 text-purple-700" },
  ];

  const daysOfWeek = [
    { id: "lundi", name: "Lun" },
    { id: "mardi", name: "Mar" },
    { id: "mercredi", name: "Mer" },
    { id: "jeudi", name: "Jeu" },
    { id: "vendredi", name: "Ven" },
    { id: "samedi", name: "Sam" },
  ];

  const [cleaningTasks, setCleaningTasks] = useState([
    { name: "Nettoyage sols cuisine", frequency: "Quotidien", days: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], category: "Production" },
    { name: "Désinfection surfaces", frequency: "Quotidien", days: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], category: "Production" },
    { name: "Nettoyage frigos", frequency: "Hebdomadaire", days: ["vendredi"], category: "Reserve" },
    { name: "Contrôle bacs graisse", frequency: "Mensuel", days: ["samedi"], category: "Production" },
    { name: "Nettoyage hotte", frequency: "Hebdomadaire", days: ["mercredi"], category: "Production" },
    { name: "Rangement stocks", frequency: "Quotidien", days: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], category: "Reserve" },
    { name: "Nettoyage vitrine", frequency: "Quotidien", days: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], category: "Magasin" },
    { name: "Contrôle électrique", frequency: "Mensuel", days: ["samedi"], category: "TGBT" },
  ]);

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev =>
      prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]
    );
  };

  const toggleEditDay = (dayId: string) => {
    setEditingDays(prev =>
      prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]
    );
  };

  const handleAddTask = () => {
    if (taskName && selectedDays.length > 0 && selectedCategory) {
      const newTask = {
        name: taskName,
        frequency: selectedDays.length === 6 ? "Quotidien" : selectedDays.length === 1 ? "Hebdomadaire" : "Personnalisé",
        days: selectedDays,
        category: selectedCategory
      };
      setCleaningTasks([...cleaningTasks, newTask]);
      setOpen(false);
      setTaskName("");
      setSelectedDays([]);
      setSelectedCategory("");
    }
  };

  const handleEditTask = (index: number) => {
    setEditingTaskIndex(index);
    setEditingDays(cleaningTasks[index].days);
    setEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingTaskIndex !== null && editingDays.length > 0) {
      const updatedTasks = [...cleaningTasks];
      updatedTasks[editingTaskIndex] = {
        ...updatedTasks[editingTaskIndex],
        days: editingDays,
        frequency: editingDays.length === 6 ? "Quotidien" : editingDays.length === 1 ? "Hebdomadaire" : "Personnalisé"
      };
      setCleaningTasks(updatedTasks);
      setEditOpen(false);
      setEditingTaskIndex(null);
      setEditingDays([]);
    }
  };

  const getCategoryColor = (categoryName: string) => {
    return categories.find(c => c.name === categoryName)?.color || "bg-gray-200 border-gray-400 text-gray-700";
  };

  const groupedTasks = categories.map(cat => ({
    ...cat,
    tasks: cleaningTasks.filter(task => task.category === cat.name)
  }));

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-pink backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="w-11 h-11 text-white hover:bg-white/20">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/parametres">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Plan de nettoyage</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="icon" className="ml-auto bg-white text-module-pink hover:bg-white/90">
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Ajouter une tâche</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task-name">Nom de la tâche</Label>
                  <Input
                    id="task-name"
                    placeholder="Ex: Nettoyage des sols"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Catégorie</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <Button
                        key={cat.name}
                        type="button"
                        variant="outline"
                        className={cn(
                          "h-auto py-3 px-4 text-sm font-normal transition-all duration-200",
                          selectedCategory === cat.name
                            ? `${cat.color} border-2`
                            : "hover:bg-accent"
                        )}
                        onClick={() => setSelectedCategory(cat.name)}
                      >
                        {cat.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Jours de la semaine</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {daysOfWeek.map((day) => (
                      <Button
                        key={day.id}
                        type="button"
                        variant="outline"
                        className={cn(
                          "h-auto py-2 text-sm font-normal transition-all duration-200",
                          selectedDays.includes(day.id)
                            ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                            : "hover:bg-accent"
                        )}
                        onClick={() => toggleDay(day.id)}
                      >
                        {day.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleAddTask} 
                  className="w-full"
                  disabled={!taskName || selectedDays.length === 0 || !selectedCategory}
                >
                  Ajouter la tâche
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <Accordion type="multiple" className="space-y-4">
          {groupedTasks.map((group) => (
            group.tasks.length > 0 && (
              <AccordionItem 
                key={group.name} 
                value={group.name}
                className="border-none"
              >
                <AccordionTrigger className={cn(
                  "rounded-xl p-4 border-2 hover:no-underline transition-all duration-200",
                  group.color,
                  "[&[data-state=open]]:rounded-b-none"
                )}>
                  <div className="flex items-center gap-3 text-left">
                    <SprayCan className="w-5 h-5" />
                    <div>
                      <h2 className="text-lg font-semibold">{group.name}</h2>
                      <p className="text-sm opacity-75">{group.tasks.length} tâche{group.tasks.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className={cn(
                  "border-2 border-t-0 rounded-b-xl p-4 space-y-2",
                  group.color.replace('bg-', 'border-')
                )}>
                  {group.tasks.map((task, idx) => {
                    const taskIndex = cleaningTasks.findIndex(t => t === task);
                    return (
                      <div 
                        key={idx}
                        className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{task.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {task.frequency} • {task.days.map(d => daysOfWeek.find(day => day.id === d)?.name).join(", ")}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditTask(taskIndex)}
                          className="hover:bg-primary/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            )
          ))}
        </Accordion>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier les jours de récurrence</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {editingTaskIndex !== null && (
              <div className="space-y-2">
                <Label className="font-semibold">{cleaningTasks[editingTaskIndex].name}</Label>
                <p className="text-sm text-muted-foreground">Catégorie: {cleaningTasks[editingTaskIndex].category}</p>
              </div>
            )}

            <div className="space-y-3">
              <Label>Jours de la semaine</Label>
              <div className="grid grid-cols-3 gap-2">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day.id}
                    type="button"
                    variant="outline"
                    className={cn(
                      "h-auto py-2 text-sm font-normal transition-all duration-200",
                      editingDays.includes(day.id)
                        ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                        : "hover:bg-accent"
                    )}
                    onClick={() => toggleEditDay(day.id)}
                  >
                    {day.name}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleSaveEdit} 
              className="w-full"
              disabled={editingDays.length === 0}
            >
              Enregistrer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NettoyageSettings;

import { ArrowLeft, Users, Plus, UserCircle, Home, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Person {
  id: string;
  name: string;
  role: string;
  status: "active" | "inactive";
}

const PersonnelSettings = () => {
  const [personnel, setPersonnel] = useState<Person[]>([
    { id: "1", name: "Hugo", role: "Équipier", status: "active" },
    { id: "2", name: "Florian", role: "Équipier", status: "active" },
    { id: "3", name: "Lorraine", role: "Équipier", status: "active" },
    { id: "4", name: "Lauria", role: "Équipier", status: "active" },
    { id: "5", name: "Tim Eliot", role: "Équipier", status: "active" },
    { id: "6", name: "Aymene", role: "Équipier", status: "active" },
    { id: "7", name: "Meriem", role: "Équipier", status: "active" },
    { id: "8", name: "Sy'RAI", role: "Équipier", status: "active" },
    { id: "9", name: "Djali", role: "Équipier", status: "active" },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [formData, setFormData] = useState<{ name: string; role: string; status: "active" | "inactive" }>({ 
    name: "", 
    role: "Équipier", 
    status: "active" 
  });

  const handleAdd = () => {
    if (formData.name.trim()) {
      const newPerson: Person = {
        id: Date.now().toString(),
        name: formData.name,
        role: formData.role,
        status: formData.status,
      };
      setPersonnel([...personnel, newPerson]);
      setFormData({ name: "", role: "Équipier", status: "active" });
      setIsAddDialogOpen(false);
    }
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    setFormData({ name: person.name, role: person.role, status: person.status });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (editingPerson && formData.name.trim()) {
      setPersonnel(personnel.map(p => 
        p.id === editingPerson.id 
          ? { ...p, name: formData.name, role: formData.role, status: formData.status }
          : p
      ));
      setEditingPerson(null);
      setFormData({ name: "", role: "Équipier", status: "active" });
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setPersonnel(personnel.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-pink backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="w-11 h-11">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <Link to="/parametres">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Personnel</h1>
          <Button 
            size="icon" 
            className="ml-auto rounded-xl"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="space-y-3">
          {personnel.map((person) => (
            <div 
              key={person.id}
              className="bg-card rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="bg-secondary rounded-full p-3">
                  <UserCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{person.name}</h3>
                    <Badge variant={person.status === "active" ? "default" : "secondary"} className="text-xs">
                      {person.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(person)}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(person.id)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un membre du personnel</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nom</Label>
              <Input
                placeholder="Nom complet"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Rôle</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Équipier">Équipier</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Chef">Chef</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAdd} className="w-full" disabled={!formData.name.trim()}>
              Ajouter
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le personnel</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nom</Label>
              <Input
                placeholder="Nom complet"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Rôle</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Équipier">Équipier</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Chef">Chef</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleUpdate} className="w-full" disabled={!formData.name.trim()}>
              Mettre à jour
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonnelSettings;

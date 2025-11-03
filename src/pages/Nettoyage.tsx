import { ArrowLeft, SprayCan, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const Nettoyage = () => {
  const tasks = [
    { name: "Nettoyage sols cuisine", frequency: "Quotidien", status: "done", time: "08:30" },
    { name: "Désinfection surfaces", frequency: "Quotidien", status: "pending" },
    { name: "Nettoyage frigos", frequency: "Hebdomadaire", status: "pending" },
    { name: "Contrôle bacs graisse", frequency: "Mensuel", status: "done", time: "01/11" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Plan de Nettoyage</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-orange text-module-orange-foreground rounded-3xl p-8 mb-6 text-center">
          <SprayCan className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Tâches et conformité</h2>
          <p className="text-sm opacity-75">Suivez votre plan de nettoyage</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-primary">12/15</p>
            <p className="text-sm text-muted-foreground">Complétées</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-primary">80%</p>
            <p className="text-sm text-muted-foreground">Conformité</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Tâches du jour</h3>
          {tasks.map((task, i) => (
            <div key={i} className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {task.status === "done" ? (
                    <CheckCircle className="w-5 h-5 text-accent" />
                  ) : (
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{task.name}</h4>
                  <p className="text-sm text-muted-foreground">{task.frequency}</p>
                  {task.time && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Fait à {task.time}
                    </p>
                  )}
                </div>
                {task.status === "pending" && (
                  <Button size="sm" className="rounded-lg">
                    Valider
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Nettoyage;

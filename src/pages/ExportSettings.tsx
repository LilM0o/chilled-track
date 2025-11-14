import { ArrowLeft, Download, FileText, FileJson, FileSpreadsheet, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { exportToCSV, exportToJSON, exportToPDF } from "@/utils/exportData";
import { toast } from "sonner";

const ExportSettings = () => {
  const [selectedFormat, setSelectedFormat] = useState<"csv" | "pdf" | "json" | null>(null);
  const [selectedData, setSelectedData] = useState<string[]>([]);

  const exportFormats = [
    { id: "csv", name: "CSV", icon: FileSpreadsheet, description: "Format tableur" },
    { id: "pdf", name: "PDF", icon: FileText, description: "Document imprimable" },
    { id: "json", name: "JSON", icon: FileJson, description: "Format données" },
  ];

  const dataTypes = [
    { id: "temperatures", name: "Relevés de température" },
    { id: "nettoyage", name: "Plan de nettoyage" },
    { id: "tracabilite", name: "Traçabilité produits" },
    { id: "reception", name: "Réception marchandises" },
    { id: "historique", name: "Historique complet" },
  ];

  const handleExport = () => {
    if (selectedFormat && selectedData.length > 0) {
      // Simulation de données pour l'export
      const mockData: Record<string, any[]> = {
        temperatures: [
          { date: "14/11/2024 10:00", equipment: "Frigo vitrine", temperature: "4°C", status: "Conforme" },
          { date: "14/11/2024 14:00", equipment: "Chambre froide", temperature: "2°C", status: "Conforme" },
        ],
        nettoyage: [
          { date: "14/11/2024", tache: "Nettoyage sols", categorie: "Sols et surfaces", statut: "Terminé" },
          { date: "14/11/2024", tache: "Désinfection équipements", categorie: "Équipements", statut: "Terminé" },
        ],
        tracabilite: [
          { date: "14/11/2024 09:30", fournisseur: "Pedrero", codeBarres: "3760050000000", numeroLot: "LOT123456" },
          { date: "14/11/2024 11:00", fournisseur: "Monin", codeBarres: "3052910000000", numeroLot: "LOT789012" },
        ],
        reception: [
          { date: "14/11/2024", fournisseur: "Metro", categorie: "Produits frais", temperature: "4°C", conformite: "Conforme" },
          { date: "13/11/2024", fournisseur: "Carte D'or", categorie: "Surgelés", temperature: "-18°C", conformite: "Conforme" },
        ],
        historique: [
          { module: "Températures", action: "Relevé température", date: "14/11/2024 10:00", utilisateur: "Hugo" },
          { module: "Nettoyage", action: "Tâche terminée", date: "14/11/2024 09:00", utilisateur: "Florian" },
        ],
      };

      // Combine toutes les données sélectionnées
      const combinedData = selectedData.flatMap(dataType => mockData[dataType] || []);
      
      if (combinedData.length === 0) {
        toast.error("Aucune donnée à exporter");
        return;
      }

      const filename = `export_${selectedData.join('_')}_${new Date().toISOString().split('T')[0]}`;

      try {
        switch (selectedFormat) {
          case 'csv':
            exportToCSV(combinedData, filename);
            break;
          case 'json':
            exportToJSON(combinedData, filename);
            break;
          case 'pdf':
            exportToPDF(combinedData, filename);
            break;
        }
        toast.success("Export réussi !");
      } catch (error) {
        toast.error("Erreur lors de l'export");
        console.error(error);
      }
    }
  };

  const toggleDataType = (id: string) => {
    setSelectedData(prev => 
      prev.includes(id) 
        ? prev.filter(d => d !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-pink backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40">
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
          <h1 className="text-2xl font-bold text-primary">Export de données</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-module-pink text-module-pink-foreground rounded-3xl p-8 mb-6 text-center shadow-lg">
          <Download className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Exporter vos données</h2>
          <p className="text-sm opacity-75">Choisissez le format et les données à exporter</p>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-lg font-semibold mb-4 block">Format d'export</Label>
            <div className="grid grid-cols-3 gap-3">
              {exportFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <Button
                    key={format.id}
                    type="button"
                    variant="outline"
                    className={cn(
                      "h-auto py-4 px-4 flex-col gap-2 transition-all duration-200",
                      selectedFormat === format.id
                        ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
                        : "hover:bg-accent"
                    )}
                    onClick={() => setSelectedFormat(format.id as any)}
                  >
                    <Icon className="w-8 h-8" />
                    <div className="text-center">
                      <div className="font-semibold">{format.name}</div>
                      <div className="text-xs opacity-75">{format.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          <div>
            <Label className="text-lg font-semibold mb-4 block">Données à exporter</Label>
            <div className="space-y-3">
              {dataTypes.map((dataType) => (
                <div
                  key={dataType.id}
                  className="bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => toggleDataType(dataType.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={dataType.id}
                      checked={selectedData.includes(dataType.id)}
                      onCheckedChange={() => toggleDataType(dataType.id)}
                    />
                    <Label
                      htmlFor={dataType.id}
                      className="cursor-pointer flex-1 font-medium"
                    >
                      {dataType.name}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleExport}
            disabled={!selectedFormat || selectedData.length === 0}
            className="w-full h-12 text-base"
          >
            <Download className="w-5 h-5 mr-2" />
            Exporter {selectedData.length > 0 && `(${selectedData.length} élément${selectedData.length > 1 ? 's' : ''})`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportSettings;

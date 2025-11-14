import { ArrowLeft, Download, FileText, FileSpreadsheet, Home, Sheet } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { exportToCSV, exportToXLSX, exportToPDF } from "@/utils/exportData";
import { toast } from "sonner";

const ExportSettings = () => {
  const [selectedFormat, setSelectedFormat] = useState<"csv" | "xlsx" | "pdf" | null>(null);
  const [selectedData, setSelectedData] = useState<string[]>([]);

  const exportFormats = [
    { id: "csv", name: "CSV", icon: FileSpreadsheet, description: "Format tableur" },
    { id: "xlsx", name: "XLSX", icon: Sheet, description: "Format Excel" },
    { id: "pdf", name: "PDF", icon: FileText, description: "Document PDF" },
  ];

  const dataTypes = [
    { id: "temperatures", name: "Relevés de température" },
    { id: "nettoyage", name: "Plan de nettoyage" },
    { id: "tracabilite", name: "Traçabilité produits" },
    { id: "reception", name: "Réception marchandises" },
    { id: "historique", name: "Historique complet" },
  ];

  const loadRealData = (): Record<string, any[]> => {
    // Charger depuis localStorage
    const temperatures = JSON.parse(localStorage.getItem('temperatureReadings') || '[]');
    const cleaningTasks = JSON.parse(localStorage.getItem('cleaningTasks') || '[]');
    const tracabilite = JSON.parse(localStorage.getItem('tracabiliteEntries') || '[]');
    const receptions = JSON.parse(localStorage.getItem('receptions') || '[]');
    
    // Formater les données pour l'export
    return {
      temperatures: temperatures.map((t: any) => ({
        Date: t.date,
        Équipement: t.equipmentName,
        Température: t.temperature,
        Statut: "Conforme"
      })),
      nettoyage: cleaningTasks
        .filter((t: any) => t.status === 'done')
        .map((t: any) => ({
          Date: t.time || new Date().toLocaleDateString('fr-FR'),
          Tâche: t.name,
          Catégorie: t.category,
          Statut: "Terminé",
          Personne: t.person || "N/A"
        })),
      tracabilite: tracabilite.map((t: any) => ({
        Date: t.date,
        Fournisseur: t.supplier,
        "Code-barres": t.barcode,
        "Numéro de lot": t.lotNumber
      })),
      reception: receptions.map((r: any) => ({
        Date: r.date,
        Fournisseur: r.supplier,
        Catégorie: r.category,
        Température: r.temp,
        Conformité: r.status === 'ok' ? 'Conforme' : 'Non conforme'
      }))
    };
  };

  const handleExport = () => {
    if (selectedFormat && selectedData.length > 0) {
      const realData = loadRealData();

      let combinedData: any[] = [];

      // Gérer l'historique complet
      if (selectedData.includes('historique')) {
        // Combiner TOUTES les données avec une colonne Module
        combinedData = [
          ...realData.temperatures.map(d => ({ Module: 'Températures', ...d })),
          ...realData.nettoyage.map(d => ({ Module: 'Nettoyage', ...d })),
          ...realData.tracabilite.map(d => ({ Module: 'Traçabilité', ...d })),
          ...realData.reception.map(d => ({ Module: 'Réception', ...d }))
        ];
      } else {
        // Export sélectif
        combinedData = selectedData.flatMap(dataType => realData[dataType] || []);
      }
      
      if (combinedData.length === 0) {
        toast.error("Aucune donnée disponible. Ajoutez des relevés, tâches ou produits avant d'exporter.");
        return;
      }

      const filename = `export_${selectedData.join('_')}_${new Date().toISOString().split('T')[0]}`;

      try {
        switch (selectedFormat) {
          case 'csv':
            exportToCSV(combinedData, filename);
            break;
          case 'xlsx':
            exportToXLSX(combinedData, filename);
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

import { ArrowLeft, Scan, Plus, Home, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { addToHistory } from "@/utils/historyUtils";
import { storage } from "@/utils/storage";

interface TracabiliteEntry {
  id: string;
  date: string;
  barcode: string;
  lotNumber: string;
  supplier: string;
}

const Tracabilite = () => {
  const [open, setOpen] = useState(false);
  const [scannedImage, setScannedImage] = useState<string>("");
  const [barcode, setBarcode] = useState<string>("");
  const [lotNumber, setLotNumber] = useState<string>("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [entries, setEntries] = useState<TracabiliteEntry[]>([]);
  const [suppliers, setSuppliers] = useState<string[]>([]);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      const savedEntries = await storage.getItem('tracabiliteEntries');
      const savedSuppliers = await storage.getItem('suppliers');
      setEntries(savedEntries ? JSON.parse(savedEntries) : []);
      setSuppliers(savedSuppliers ? JSON.parse(savedSuppliers) : []);
    };
    loadData();
  }, []);

  // Sync with storage changes
  useEffect(() => {
    const handleStorageChange = async () => {
      const saved = await storage.getItem('suppliers');
      if (saved) {
        setSuppliers(JSON.parse(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('suppliersUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('suppliersUpdated', handleStorageChange);
    };
  }, []);

  const handleScanBarcode = async () => {
    try {
      // Utilise Capacitor Camera pour prendre une photo
      const { Camera, CameraResultType } = await import('@capacitor/camera');
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });
      
      if (image.webPath) {
        setScannedImage(image.webPath);
        
        // Simule l'extraction (à remplacer par une vraie API OCR/Barcode)
        // Pour une vraie implémentation, utiliser @capacitor-mlkit/barcode-scanning
        setBarcode("3760050000000"); // Exemple
        setLotNumber("LOT123456"); // Exemple
      }
      
      setOpen(true);
    } catch (error) {
      console.error('Erreur lors du scan:', error);
      // Fallback: ouvrir le formulaire sans photo
      setOpen(true);
    }
  };

  const handleSubmit = async () => {
    if (selectedSupplier && barcode && lotNumber) {
      const now = new Date();
      const newEntry: TracabiliteEntry = {
        id: Date.now().toString(),
        date: now.toLocaleString('fr-FR'),
        barcode,
        lotNumber,
        supplier: selectedSupplier,
      };
      
      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      await storage.setItem('tracabiliteEntries', JSON.stringify(updatedEntries));
      
      // Ajouter à l'historique
      await addToHistory({
        type: "Traçabilité",
        action: "Nouveau produit enregistré",
        value: `${selectedSupplier} - ${barcode}`,
        time: now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        date: now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
        person: "Système",
        details: `Code-barres: ${barcode} - Lot: ${lotNumber} - Fournisseur: ${selectedSupplier}`
      });
      
      setOpen(false);
      setScannedImage("");
      setBarcode("");
      setLotNumber("");
      setSelectedSupplier("");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-blue backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300 w-11 h-11">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Traçabilité Produits</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">

        <div className="space-y-4 animate-fade-in-up">
          <Button 
            onClick={handleScanBarcode}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl
              transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95"
          >
            <Scan className="w-5 h-5 mr-2" />
            Scanner un code-barres
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-12 rounded-xl
              transition-all duration-300 hover:scale-[1.02] hover:border-primary hover:text-primary active:scale-95"
            onClick={() => setOpen(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter manuellement
          </Button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nouveau produit</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {scannedImage && (
                <div className="space-y-2">
                  <Label>Photo du produit</Label>
                  <img src={scannedImage} alt="Produit scanné" className="w-full h-48 object-cover rounded-lg" />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Code-barres</Label>
                <Input
                  placeholder="Saisir le code-barres"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Numéro de lot</Label>
                <Input
                  placeholder="Saisir le numéro de lot"
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Date et heure</Label>
                <div className="p-3 bg-secondary rounded-lg text-sm">
                  {new Date().toLocaleString('fr-FR')}
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Sélectionner un fournisseur</Label>
                <div className="grid grid-cols-2 gap-2">
                  {suppliers.map((supplier) => (
                    <Button
                      key={supplier}
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-auto py-3 px-4 text-sm font-normal transition-all duration-200",
                        selectedSupplier === supplier
                          ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
                          : "hover:bg-accent"
                      )}
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      {supplier}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleSubmit} 
                className="w-full"
                disabled={!selectedSupplier || !barcode}
              >
                Enregistrer
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-lg font-semibold mb-4">Produits récents</h3>
          {entries.length === 0 ? (
            <div className="bg-card rounded-2xl p-8 text-center">
              <p className="text-muted-foreground">Aucun produit enregistré</p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, i) => (
                <div 
                  key={entry.id} 
                  className="bg-card rounded-2xl p-4 shadow-sm 
                    transition-all duration-300 hover:shadow-md hover:scale-[1.01]
                    cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Code-barres: {entry.barcode}</h4>
                      <p className="text-sm text-muted-foreground">Lot: {entry.lotNumber}</p>
                      <p className="text-sm text-muted-foreground">Fournisseur: {entry.supplier}</p>
                      <p className="text-xs text-muted-foreground mt-1">{entry.date}</p>
                    </div>
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs
                      animate-pulse-soft shadow-sm">
                      OK
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracabilite;

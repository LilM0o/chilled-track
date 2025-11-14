import { ArrowLeft, Scan, Plus, Home, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Camera as CapCamera, CameraResultType } from '@capacitor/camera';

const Tracabilite = () => {
  const [open, setOpen] = useState(false);
  const [scannedImage, setScannedImage] = useState<string>("");
  const [barcode, setBarcode] = useState<string>("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  
  const suppliers = [
    "Pedrero",
    "Monin",
    "Carte D'or",
    "Metro",
    "Delidrinks",
  ];

  const handleScanBarcode = async () => {
    try {
      // Request camera permissions
      await BarcodeScanner.requestPermissions();
      
      // Start scanning
      const result = await BarcodeScanner.scan();
      
      if (result.barcodes && result.barcodes.length > 0) {
        const scannedCode = result.barcodes[0].displayValue;
        setBarcode(scannedCode);
        
        // Take a photo
        const photo = await CapCamera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl
        });
        
        if (photo.dataUrl) {
          setScannedImage(photo.dataUrl);
        }
        
        // Open the form dialog
        setOpen(true);
      }
    } catch (error) {
      console.error('Scanning error:', error);
      // For web/desktop testing, open dialog without actual scanning
      setOpen(true);
    }
  };

  const handleSubmit = () => {
    if (selectedSupplier) {
      // Save the product data
      setOpen(false);
      setScannedImage("");
      setBarcode("");
      setSelectedSupplier("");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-module-blue/30 backdrop-blur-md rounded-b-3xl px-6 py-5 mb-8 shadow-md sticky top-0 z-40 animate-fade-in">
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
              
              {barcode && (
                <div className="space-y-2">
                  <Label>Code-barres détecté</Label>
                  <div className="p-3 bg-secondary rounded-lg font-mono text-sm">{barcode}</div>
                </div>
              )}
              
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
                disabled={!selectedSupplier}
              >
                Enregistrer
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-lg font-semibold mb-4">Produits récents</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="bg-card rounded-2xl p-4 shadow-sm 
                  transition-all duration-300 hover:shadow-md hover:scale-[1.01]
                  cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Produit {i}</h4>
                    <p className="text-sm text-muted-foreground">Fournisseur: Pedrero</p>
                    <p className="text-xs text-muted-foreground mt-1">04/11/2025 - 14:30</p>
                  </div>
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs
                    animate-pulse-soft shadow-sm">
                    OK
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracabilite;

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3145b24ecd74491193d67c3091120a5a',
  appName: 'chilled-track',
  webDir: 'dist',
  server: {
    url: 'https://3145b24e-cd74-4911-93d6-7c3091120a5a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    BarcodeScannerPlugin: {
      cameraAccess: true
    }
  }
};

export default config;

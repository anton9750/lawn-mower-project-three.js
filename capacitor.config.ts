import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourname.lawnmower',
  appName: 'Lawn Mower Game',
  webDir: 'dist',
  server: {
    // This forces the app to look inside your subfolder on launch
    url: 'http://localhost:5173/lawn-mower-project-three.js/',
    cleartext: true
  }
};

export default config;
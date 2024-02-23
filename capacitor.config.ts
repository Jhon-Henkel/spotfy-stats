import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Spotify Stats',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

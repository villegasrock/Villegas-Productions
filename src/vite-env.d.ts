/// <reference types="vite/client" />

interface VillegasAPI {
  openAudio: () => Promise<string | null>;
}

declare global {
  interface Window {
    villegas: VillegasAPI;
  }
}

export {};

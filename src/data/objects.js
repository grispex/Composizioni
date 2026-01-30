const MODELS_BASE_URL = import.meta.env.VITE_MODELS_BASE_URL || "";

// Debug: verifica che la variabile d'ambiente sia letta correttamente
if (import.meta.env.DEV) {
  console.log("VITE_MODELS_BASE_URL:", MODELS_BASE_URL);
}

// Funzione helper per costruire l'URL del modello
const getModelUrl = (modelName) => {
  if (!MODELS_BASE_URL) {
    console.warn("VITE_MODELS_BASE_URL non è definita! Assicurati di aver creato il file .env e riavviato Vite.");
    return null;
  }
  
  // Usa sempre l'URL diretto da R2 (sia in sviluppo che in produzione)
  // Rimuove eventuali slash finali dal base URL e aggiunge il nome del modello
  const baseUrl = MODELS_BASE_URL.endsWith('/') ? MODELS_BASE_URL.slice(0, -1) : MODELS_BASE_URL;
  return `${baseUrl}/${modelName}`;
};

export const objects = [
  { id: 1, name: "001", glbPath: getModelUrl("giardino.glb") },
  { id: 2, name: "002", glbPath: getModelUrl("death.glb") },
  { id: 3, name: "003", glbPath: getModelUrl("soffitto.glb") },
  { id: 4, name: "004", glbPath: getModelUrl("libro.glb") },
  { id: 5, name: "005", glbPath: getModelUrl("aula.glb") },
  { id: 6, name: "006", glbPath: getModelUrl("libreria.glb") },
];

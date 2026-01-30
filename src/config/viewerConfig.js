/**
 * Configurazione dei limiti di rotazione e scala per ogni visualizzatore 3D
 * 
 * Ogni modello può avere limiti personalizzati per:
 * - minDistance: distanza minima della camera (zoom in massimo)
 * - maxDistance: distanza massima della camera (zoom out massimo)
 * - minPolarAngle: angolo polare minimo in radianti (0 = sopra, Math.PI = sotto)
 * - maxPolarAngle: angolo polare massimo in radianti
 * - minAzimuthAngle: angolo azimutale minimo in radianti (rotazione orizzontale)
 * - maxAzimuthAngle: angolo azimutale massimo in radianti
 * - enablePan: abilita/disabilita il pan (spostamento)
 * - enableZoom: abilita/disabilita lo zoom
 * - enableRotate: abilita/disabilita la rotazione
 * - enableDamping: abilita il damping per movimenti più fluidi
 * - dampingFactor: fattore di damping (0.05 = molto morbido, 0.1 = morbido)
 * - rotateSpeed: velocità di rotazione (0.5 = lento, 1.0 = normale)
 * - zoomSpeed: velocità di zoom (0.5 = lento, 1.0 = normale)
 * - panSpeed: velocità di pan (0.5 = lento, 1.0 = normale)
 */

// Configurazione di default
const defaultConfig = {
  minDistance: 1,
  maxDistance: 50,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI,
  minAzimuthAngle: -Infinity,
  maxAzimuthAngle: Infinity,
  enablePan: true,
  enableZoom: true,
  enableRotate: true,
  // Parametri per movimenti morbidi e lenti
  enableDamping: true,
  dampingFactor: 0.05,
  rotateSpeed: 0.5,
  zoomSpeed: 0.6,
  panSpeed: 0.5,
};

// Configurazioni specifiche per ogni modello (per nome o path)
export const viewerConfigs = {
  // Configurazione per "giardino.glb"
  "models/giardino.glb": {
    ...defaultConfig,
    minDistance: 2,
    maxDistance: 40,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI / 2, // Limita la rotazione solo alla metà superiore
  },
  
  // Configurazione per "death.glb"
  "models/death.glb": {
    ...defaultConfig,
    minDistance: 10,
    maxDistance: 40,
    // Limita rotazione verticale a ±30 gradi dal centro (135 gradi)
    minPolarAngle: (3 * Math.PI / 4) - (Math.PI / 6), // Circa 105 gradi
    maxPolarAngle: (3 * Math.PI / 4) + (Math.PI / 6), // Circa 165 gradi
    minAzimuthAngle: -Math.PI / 6, // Limita rotazione orizzontale a -30 gradi
    maxAzimuthAngle: Math.PI / 6, // Limita rotazione orizzontale a +30 gradi
    rotationX: Math.PI / 6, // Rotazione di 30 gradi sull'asse X verso avanti
    scale: 0.85, // Scala leggermente più piccola
  },
  
  // Configurazione per "soffitto.glb"
  "models/soffitto.glb": {
    ...defaultConfig,
    minDistance: 3,
    maxDistance: 30,
    // Limita rotazione verticale a ±30 gradi dal centro (orizzontale)
    // Centro a Math.PI / 2 (orizzontale, guardando di fronte), quindi ±30 gradi
    minPolarAngle: Math.PI / 2 - Math.PI / 6, // Math.PI / 3 (60 gradi dall'alto, 30 gradi sopra l'orizzontale)
    maxPolarAngle: Math.PI / 2 + Math.PI / 6, // 2 * Math.PI / 3 (120 gradi dall'alto, 30 gradi sotto l'orizzontale)
    // Limita rotazione orizzontale a ±30 gradi
    minAzimuthAngle: -Math.PI / 6, // Limita rotazione orizzontale a -30 gradi
    maxAzimuthAngle: Math.PI / 6, // Limita rotazione orizzontale a +30 gradi
  },
  
  // Configurazione per "libro.glb"
  "models/libro.glb": {
    ...defaultConfig,
    minDistance: 6,
    maxDistance: 20,
    minPolarAngle: Math.PI / 8,
    maxPolarAngle: Math.PI / 2.5,
    enableRotate: true,
  },
  
  // Configurazione per "aula.glb"
  "models/aula.glb": {
    ...defaultConfig,
    minDistance: 10,
    maxDistance: 120,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI / 2,
    enablePan: true,
  },
  
  // Configurazione per "onda.glb"
  "models/onda.glb": {
    ...defaultConfig,
    minDistance: 20,
    maxDistance: 70,
    minPolarAngle: 1, // Limita rotazione verticale minima
    maxPolarAngle: Math.PI / 2,
    // Limita rotazione orizzontale a ±30 gradi (equa sui due lati)
    minAzimuthAngle: -Math.PI / 6, // Limita rotazione orizzontale a -30 gradi
    maxAzimuthAngle: Math.PI / 6, // Limita rotazione orizzontale a +30 gradi
    enablePan: true,
  },
  
  // Configurazione per "libreria.glb"
  "models/libreria.glb": {
    ...defaultConfig,
    minDistance: 2,
    maxDistance: 40,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI / 2,
    enablePan: true,
  },
};

/**
 * Ottiene la configurazione per un modello specifico
 * @param {string} glbPath - Il percorso del file GLB
 * @returns {object} La configurazione del visualizzatore
 */
export const getViewerConfig = (glbPath) => {
  return viewerConfigs[glbPath] || defaultConfig;
};


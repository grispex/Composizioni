# Prova 3D Web

Applicazione web per la visualizzazione interattiva di modelli 3D in formato GLB.

## Tecnologie

- React 19
- Three.js
- React Three Fiber
- Vite

## Installazione

1. Clona il repository
2. Installa le dipendenze:
```bash
npm install
```

## Sviluppo

Avvia il server di sviluppo:
```bash
npm run dev
```

## Build per produzione

Crea la build ottimizzata per la produzione:
```bash
npm run build
```

La cartella `dist/` conterrà i file pronti per il deploy.

## Preview della build

Per vedere l'anteprima della build di produzione:
```bash
npm run preview
```

## Deploy

I file nella cartella `dist/` possono essere caricati su qualsiasi servizio di hosting statico come:
- GitHub Pages
- Netlify
- Vercel
- Surge.sh

## Struttura del progetto

- `src/components/` - Componenti React
- `src/config/` - Configurazioni dei visualizzatori 3D
- `src/data/` - Dati degli oggetti
- `public/models/` - File modelli 3D (.glb)
- `public/images/` - Immagini di anteprima

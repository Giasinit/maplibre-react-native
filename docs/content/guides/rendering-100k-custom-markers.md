# Rendering 100.000 Marker Custom con MapLibre React Native

## Guida Completa per Marker GPU-Accelerated su Scala Massiva

Questa documentazione analizza in profondità come renderizzare 100.000 marker custom con `@maplibre/maplibre-react-native` utilizzando la GPU e tecniche Layer-based, senza lag su dispositivi Android anche datati.

---

## 1. Architettura e Pipeline di Rendering

### 1.1 Come Funziona MapLibre RN Sotto il Cofano

MapLibre React Native si basa su **MapLibre GL Native** (iOS/Android), che utilizza **OpenGL ES** per il rendering GPU-accelerated delle mappe.

**Pipeline di Rendering:**

```
Dati GeoJSON/Tiles
    ↓
Source Components (ShapeSource, VectorSource)
    ↓
React Native Bridge (JS → Native)
    ↓
MapLibre Native SDK
    ↓
OpenGL ES Renderer (GPU)
    ↓
Tile/Vector Layer Rendering
```

**Componenti Chiave:**

- **JS Layer**: Componenti React (`ShapeSource`, `SymbolLayer`, `CircleLayer`, ecc.) che gestiscono props e styling
- **Native Bridge**: `useNativeBridge` hook che serializza comandi e dati tramite `requireNativeComponent`
- **Native Layer**: 
  - iOS: `MLNMapView`, `MLNCircleStyleLayer`, `MLNSymbolStyleLayer`
  - Android: `MapView`, `CircleLayer`, `SymbolLayer` (via MapLibre Android SDK)
- **GPU Rendering**: Tutte le operazioni di rendering vettoriale avvengono su GPU tramite shader OpenGL

### 1.2 View-Based vs Layer-Based Markers

#### **View-Based Markers** (❌ NON scalabile)

**`PointAnnotation`**:
- Renderizza React views come marker
- Su Android: ogni view viene rasterizzata in un **bitmap** via Canvas
- Su iOS: usa `MLNAnnotationView` (più performante ma comunque limitato)
- **Limite critico**: Ogni marker = 1 bitmap/view in memoria
- **Performance**: Accettabile fino a ~100-500 marker, poi degrada rapidamente
- **Documentazione ufficiale**: *"Consider using ShapeSource and SymbolLayer instead, if you have many points, and you have static images, they'll offer much better performance"*

**`MarkerView`**:
- Marker completamente interattivi con React children
- Ancora più pesante di PointAnnotation
- Sempre renderizzato sopra la mappa (z-index non controllabile)
- **Limite**: Max ~100 marker prima di lag significativi

#### **Layer-Based Rendering** (✅ Scalabile)

**`ShapeSource` + Layer (SymbolLayer/CircleLayer)**:
- I dati sono passati come **GeoJSON** al native layer
- MapLibre Native gestisce tutto il rendering via **GPU shaders**
- **Zero overhead React**: nessun componente React per marker
- **Performance**: Può gestire facilmente 100k+ punti
- **Batching GPU**: Tutti i marker vengono renderizzati in pochi draw calls
- **Data-driven styling**: Espressioni MapLibre permettono varianti senza duplicazione

**Differenze Tecniche Fondamentali:**

| Caratteristica | View-Based (PointAnnotation) | Layer-Based (ShapeSource+Layer) |
|---|---|---|
| Rendering | CPU bitmap rasterization | GPU vector rendering |
| Memoria | 1 bitmap per marker | 1 vertex buffer condiviso |
| Draw Calls | N draw calls | ~1-5 draw calls totali |
| Aggiornamento | Re-render React + bitmap | Update GeoJSON native |
| Interattività | onClick callbacks | onPress con feature detection |
| Z-index | Limitato/sempre sopra | Controllabile via layer ordering |
| Clustering | ❌ Non supportato | ✅ Built-in native |
| Data-driven Style | ❌ No | ✅ Espressioni MapLibre |

---

## 2. Layer GPU-Friendly per 100k Punti

### 2.1 ShapeSource + CircleLayer

**Come Funziona:**
- `ShapeSource` carica GeoJSON con 100k Point features
- `CircleLayer` applica uno stile cerchio tramite shader GPU
- Ogni cerchio è renderizzato come **quad con fragment shader** che disegna un cerchio perfetto

**Vantaggi:**
- ✅ **Prestazioni eccellenti**: GPU-accelerated, migliaia di cerchi senza lag
- ✅ **Stroke + Fill**: `circleColor` (fill) + `circleStrokeColor` + `circleStrokeWidth` (stroke)
- ✅ **Data-driven styling**: Colori/dimensioni variabili via espressioni
- ✅ **Clustering nativo**: Supporto built-in per aggregare punti vicini

**Limiti:**
- ❌ Solo forme circolari (non quadrati, poligoni custom)
- ❌ Niente texture/icone
- ❌ Forme limitate (solo cerchi con antialiasing perfetto)

**Proprietà Stile Chiave:**
```typescript
{
  circleRadius: 10,                    // Raggio in pixel
  circleColor: '#ff0000',              // Fill color
  circleStrokeWidth: 2,                // Larghezza bordo
  circleStrokeColor: '#ffffff',        // Colore bordo
  circleOpacity: 0.8,                  // Trasparenza
  circleBlur: 0.5,                     // Soft edge
  circlePitchAlignment: 'map',         // 'map' | 'viewport'
  circleRotate: 45                     // Rotazione (ma non visibile su cerchi!)
}
```

**Data-Driven Styling (Varianti):**
```typescript
// Colore basato su proprietà feature
circleColor: ['get', 'markerColor']  // Legge da feature.properties.markerColor

// Dimensione variabile
circleRadius: [
  'interpolate', ['linear'], ['get', 'value'],
  0, 5,    // value=0 → radius=5
  100, 20  // value=100 → radius=20
]

// Switch condizionale
circleColor: [
  'case',
  ['<', ['get', 'priority'], 5], '#ff0000',  // priority < 5 → rosso
  ['<', ['get', 'priority'], 10], '#ffff00', // priority < 10 → giallo
  '#00ff00'                                    // default → verde
]
```

### 2.2 ShapeSource + SymbolLayer (Icone/Texture)

**Come Funziona:**
- `Images` component registra texture atlas con icone
- `SymbolLayer` usa `iconImage` per referenziare le icone
- MapLibre crea un **texture atlas** (sprite sheet) e usa **instanced rendering** GPU

**Vantaggi:**
- ✅ **Forme custom**: Qualsiasi immagine PNG/WebP
- ✅ **Texture condivise**: 1 texture per tipo di marker, usata N volte
- ✅ **Rotazione**: `iconRotate` funziona perfettamente
- ✅ **SDF Icons**: Signed Distance Field per ricolorazione runtime
- ✅ **Text labels**: Può combinare icone + testo

**Limiti:**
- ❌ Richiede texture pre-generate (PNG)
- ❌ Atlas size limitato (tipicamente 1024x1024 o 2048x2048)
- ⚠️ Troppe texture diverse = frammentazione atlas

**Esempio Base:**
```typescript
<Images
  images={{
    'marker-icon': require('./marker.png'),
    'marker-selected': require('./marker-selected.png')
  }}
/>
<ShapeSource id="markers" shape={geoJSON}>
  <SymbolLayer
    id="marker-layer"
    style={{
      iconImage: 'marker-icon',
      iconSize: 0.5,
      iconRotate: ['get', 'bearing'],
      iconAllowOverlap: true,
      iconIgnorePlacement: true
    }}
  />
</ShapeSource>
```

**SDF Icons (Signed Distance Field):**

SDF è una tecnica che permette di ricolorare/scalare icone senza perdita qualità:

```typescript
<Images
  images={{
    'marker-sdf': {
      source: require('./marker-sdf.png'),
      sdf: true  // ← Abilita SDF rendering
    }
  }}
/>
<SymbolLayer
  style={{
    iconImage: 'marker-sdf',
    iconColor: ['get', 'color'],  // ← Ricolorazione runtime!
    iconHaloColor: '#ffffff',     // ← Bordo/outline
    iconHaloWidth: 2,
    iconSize: 0.5
  }}
/>
```

**Come Funziona SDF:**
- L'icona è una texture grayscale dove ogni pixel memorizza la **distanza dal bordo**
- Il fragment shader GPU usa questa distanza per:
  - Applicare colore runtime senza texture multiple
  - Aggiungere stroke/outline (halo)
  - Mantenere antialiasing perfetto a qualsiasi scala

**Limiti SDF:**
- Solo forme monocromatiche (no gradienti/colori multipli)
- Dettagli sottili possono perdersi
- Richiede texture preparate appositamente

### 2.3 CustomLayer / Native GL Hooks

**Status nella Libreria:**
❌ **NON esiste un'implementazione CustomLayer nella libreria `@maplibre/maplibre-react-native`**

MapLibre GL Native supporta `CustomLayer` (WebGL diretto), ma:
- Non è esposto tramite questa libreria React Native
- Richiederebbe estensione nativa custom (Objective-C/Swift + Kotlin/Java)
- Complessità molto alta per un beneficio marginale

**Alternativa Teorica:**
Potresti creare un native module custom che:
1. Aggiunge un CustomLayer alla mappa via MapLibre Native API
2. Implementa `render()` con chiamate OpenGL dirette
3. Bridge da JS per aggiornare dati

**Valutazione:**
- ⚠️ Richiede conoscenza OpenGL + MapLibre Native SDK
- ⚠️ Manutenzione complessa
- ⚠️ Non necessario per 100k marker (SymbolLayer + ShapeSource sono sufficienti)

---

## 3. "SVG Marker" in MapLibre: Fattibilità e Limiti

### 3.1 Cosa Significa "SVG" nel Contesto MapLibre

MapLibre **non supporta SVG direttamente**. Quando parliamo di "marker SVG-style", intendiamo:

1. **Forme vettoriali custom**: Poligoni, path complessi
2. **Stroke + Fill**: Bordi e riempimenti separati
3. **Trasformazioni**: Rotazione, scala, traslazione
4. **Styling dinamico**: Colori/dimensioni basati su dati

**Come MapLibre Emula "SVG":**

| Feature SVG | Equivalente MapLibre | Metodo |
|---|---|---|
| `<circle>` | CircleLayer | Shader GPU cerchi perfetti |
| `<rect>`, `<polygon>` | FillLayer + GeoJSON polygon | Rendering vettoriale GPU |
| `<path>` custom | ❌ Non supportato | Workaround: texture PNG |
| `stroke` | circleStrokeColor / lineColor | Shader outline |
| `fill` | circleColor / fillColor | Fragment shader |
| `transform rotate` | iconRotate / circleRotate | Vertex shader transform |
| `<image>` | SymbolLayer iconImage | Texture mapping |
| `<text>` | SymbolLayer textField | Glyph rendering |

### 3.2 Limiti Tecnici Reali

**100k Marker "SVG-Style" - Analisi Fattibilità:**

**✅ POSSIBILE:**
- 100k cerchi con stroke+fill (CircleLayer)
- 100k icone PNG con rotazione (SymbolLayer)
- 100k punti con colori/dimensioni variabili (data-driven)
- Clustering per ridurre visivamente il carico

**❌ NON POSSIBILE:**
- 100k forme SVG custom (es. quadrato con angolo tagliato) → Richiede texture
- 100k marker con gradienti complessi → Serve texture per marker
- Stroke + fill su forme custom arbitrarie → Solo su CircleLayer

**⚠️ POSSIBILE CON COMPROMESSI:**

1. **Forma custom tipo SVG → Texture PNG**
   - Crei una texture PNG 64x64 della tua forma custom
   - Usi SymbolLayer per renderizzare 100k istanze
   - **Compromesso**: Non è "vettoriale", ma a 64x64 con antialiasing è indistinguibile su mobile
   - **Varianti colore**: Usa SDF icon + `iconColor` per ricolorazione runtime

2. **Angoli custom (border-radius selettivo)**
   - ❌ Impossibile nativo
   - ✅ Workaround: Texture PNG pre-renderizzata con quella forma
   - ✅ Alternativa: Approssimare con FillLayer + GeoJSON polygon (ma solo per forme grandi, non marker piccoli)

3. **Stroke + Fill su forme custom**
   - CircleLayer: ✅ Nativo
   - Altre forme: ❌ Serve texture con stroke già disegnato
   - Alternativa: 2 SymbolLayer sovrapposti (1 per fill, 1 per stroke) ma raddoppia draw calls

### 3.3 Texture Atlas e Memory Limits

**Sprite/Texture Atlas:**
- MapLibre combina tutte le icone in 1-2 texture atlas (1024x1024 o 2048x2048)
- **Limite pratico**: ~100-200 icone diverse (dipende da dimensione)
- **Ottimizzazione**: Usa SDF per ridurre varianti colore

**Memory Overhead per 100k Marker:**

**Approccio 1: SymbolLayer con 1 icona condivisa**
- Texture: 64x64 RGBA = 16KB
- GeoJSON data: 100k points × ~50 bytes = ~5MB
- GPU vertex buffer: 100k points × ~32 bytes = ~3MB
- **Totale: ~8MB** ✅ Perfettamente gestibile

**Approccio 2: 10 varianti icone**
- Texture: 10 × 16KB = 160KB
- GeoJSON + vertex buffer: ~8MB
- **Totale: ~8MB** ✅ Ancora ottimo

**Approccio 3: 100k icone diverse (❌ ANTI-PATTERN)**
- Texture atlas: Impossibile (atlas overflow)
- Fallback: Caricamento dinamico → lag estremo
- **Totale: ❌ Non fattibile**

**Regole Pratiche:**
- ≤10 varianti icone: ✅ Perfetto
- 10-50 varianti: ⚠️ Accettabile, ma monitora atlas size
- \>100 varianti: ❌ Riprogetta (usa data-driven color, non texture diverse)

---

## 4. Strategia Migliore per Marker Custom Senza Lag

### 4.1 Approccio Consigliato: SDF Sprite + Data-Driven Styling

**Perché SDF è la Soluzione Ottimale:**

1. **1 texture per tutte le varianti colore**: Riduci atlas footprint
2. **Ricolorazione runtime via GPU**: Zero overhead CPU/JS
3. **Stroke (halo) nativo**: `iconHaloColor` + `iconHaloWidth`
4. **Scalabilità perfetta**: Antialiasing a qualsiasi zoom
5. **Rotazione fluida**: `iconRotate` via vertex shader

**Pipeline Completa:**

**Step 1: Crea Marker Base (Photoshop/Figma/Inkscape)**
```
Forma: Quadrato 100x100 con border-radius 100px + angolo tagliato
Esporta: PNG 128x128, alpha channel, monocromatico (bianco su trasparente)
```

**Step 2: Genera SDF Texture**

Usa strumenti come:
- [MapLibre SDF Generator](https://github.com/maplibre/sdf-glyph-foundry) (online)
- ImageMagick: `convert input.png -threshold 50% -morphology Distance Euclidean output.png`

Risultato: PNG grayscale con distanza dal bordo

**Step 3: Registra in MapLibre**
```typescript
<Images
  images={{
    'custom-marker': {
      source: require('./marker-sdf.png'),
      sdf: true
    }
  }}
/>
```

**Step 4: GeoJSON con Proprietà**
```typescript
const geoJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: Array.from({ length: 100000 }, (_, i) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        -180 + Math.random() * 360,  // lng
        -85 + Math.random() * 170    // lat
      ]
    },
    properties: {
      id: i,
      color: COLORS[i % COLORS.length],
      bearing: Math.random() * 360,
      selected: false,
      size: 1.0 + Math.random() * 0.5
    }
  }))
};
```

**Step 5: SymbolLayer con Espressioni**
```typescript
<ShapeSource id="markers" shape={geoJSON}>
  <SymbolLayer
    id="marker-icons"
    style={{
      iconImage: 'custom-marker',
      iconColor: ['get', 'color'],           // Colore da properties
      iconHaloColor: '#ffffff',              // Bordo bianco
      iconHaloWidth: 2,
      iconSize: ['get', 'size'],             // Dimensione variabile
      iconRotate: ['get', 'bearing'],        // Rotazione
      iconAllowOverlap: true,                // Disabilita collision detection
      iconIgnorePlacement: true,
      iconRotationAlignment: 'map',          // Ruota con mappa
      iconPitchAlignment: 'map'              // Prospettiva 3D
    }}
  />
</ShapeSource>
```

### 4.2 Gestione Varianti senza 100k Immagini

**Problema:** Vuoi marker con colori, dimensioni, bordi diversi

**❌ ANTI-PATTERN:**
```typescript
// Non fare questo!
images={{
  'marker-red-large': require('./red-large.png'),
  'marker-blue-small': require('./blue-small.png'),
  // ... 100 texture diverse → Atlas overflow
}}
```

**✅ SOLUZIONE: Data-Driven Expressions**

**Variante 1: Colori Multipli (SDF)**
```typescript
iconColor: [
  'match',
  ['get', 'category'],
  'urgent', '#ff0000',
  'normal', '#00ff00',
  'low', '#0000ff',
  '#cccccc'  // default
]
```

**Variante 2: Dimensioni Dinamiche**
```typescript
iconSize: [
  'interpolate', ['linear'],
  ['get', 'priority'],
  0, 0.5,   // priority 0 → 50% size
  5, 1.0,   // priority 5 → 100%
  10, 1.5   // priority 10 → 150%
]
```

**Variante 3: Stroke Condizionale**
```typescript
iconHaloWidth: [
  'case',
  ['get', 'selected'], 4,  // Se selected → bordo 4px
  2                         // Altrimenti → 2px
]
```

**Variante 4: Combinazioni Complesse**
```typescript
// Colore + dimensione + bordo in base a più proprietà
iconColor: [
  'case',
  ['get', 'active'],
  ['get', 'customColor'],  // Se active, usa colore custom
  '#999999'                 // Altrimenti grigio
],
iconSize: [
  'interpolate', ['exponential', 1.5],
  ['zoom'],
  10, ['*', ['get', 'baseSize'], 0.5],  // Zoom 10 → 50% baseSize
  15, ['get', 'baseSize'],               // Zoom 15 → 100%
  20, ['*', ['get', 'baseSize'], 2]     // Zoom 20 → 200%
]
```

**Performance:**
- Tutte le espressioni sono **valutate su GPU**
- Zero overhead JS per 100k valutazioni
- Aggiornamento dati = solo update GeoJSON, styling è automatico

### 4.3 Rotazione e Selezione

**Rotazione:**

```typescript
// Rotazione statica (da properties)
iconRotate: ['get', 'bearing']

// Rotazione animata (vedi sezione 5)
iconRotate: animatedBearing  // Animated.Value

// Rotazione relativa alla mappa
iconRotationAlignment: 'map'      // Ruota con mappa (default)
iconRotationAlignment: 'viewport' // Rimane upright
```

**Selezione:**

```typescript
// Approccio 1: Cambio colore al tap
<ShapeSource
  id="markers"
  shape={geoJSON}
  onPress={(event) => {
    const feature = event.features[0];
    const featureId = feature.properties.id;
    
    // Aggiorna GeoJSON
    const updatedGeoJSON = {
      ...geoJSON,
      features: geoJSON.features.map(f =>
        f.properties.id === featureId
          ? { ...f, properties: { ...f.properties, selected: true }}
          : f
      )
    };
    
    // Trigger re-render
    setGeoJSON(updatedGeoJSON);
  }}
>
  <SymbolLayer
    style={{
      iconColor: [
        'case',
        ['get', 'selected'], '#ff0000',  // Rosso se selected
        ['get', 'color']                  // Altrimenti colore normale
      ],
      iconSize: [
        'case',
        ['get', 'selected'], 1.5,  // 150% se selected
        1.0
      ]
    }}
  />
</ShapeSource>

// Approccio 2: Layer separati per performance
<ShapeSource id="markers-normal" shape={normalMarkersGeoJSON}>
  <SymbolLayer style={{ iconColor: '#888888', iconSize: 1.0 }} />
</ShapeSource>
<ShapeSource id="markers-selected" shape={selectedMarkersGeoJSON}>
  <SymbolLayer style={{ iconColor: '#ff0000', iconSize: 1.5 }} />
</ShapeSource>
```

---

## 5. Real-Time Update e Animazioni

### 5.1 Aggiornamento Posizioni di 100k Features

**Problema:** Devi aggiornare coordinate di 100k marker ogni secondo

**Approccio 1: Full GeoJSON Update (❌ Sconsigliato per alta frequenza)**
```typescript
// Troppo overhead per update frequenti
const updateMarkers = () => {
  const updatedGeoJSON = {
    type: 'FeatureCollection',
    features: markers.map(m => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [m.lng + delta, m.lat + delta]
      },
      properties: m.properties
    }))
  };
  
  setGeoJSON(updatedGeoJSON);  // Trigger native bridge + GPU upload
};

// Performance:
// - JS serialization: ~50-100ms per 100k points
// - Bridge transfer: ~20-50ms
// - GPU upload: ~10-30ms
// Totale: ~100-200ms → Max 5-10 FPS
```

**Approccio 2: setNativeProps (✅ Migliore)**
```typescript
const shapeSourceRef = useRef<ShapeSourceRef>(null);

const updateMarkersFast = () => {
  // Bypassa React e aggiorna direttamente native
  shapeSourceRef.current?.setNativeProps({
    shape: JSON.stringify(updatedGeoJSON)
  });
};

// Performance:
// - JS serialization: ~50ms
// - Native update diretto: ~20ms
// Totale: ~70ms → ~14 FPS (accettabile)
```

**Approccio 3: Animated API (✅ Ottimale per animazioni)**
```typescript
import { AnimatedShape } from '@maplibre/maplibre-react-native';
import { Animated } from 'react-native';

// Coordinate animate
const animatedCoords = useRef(
  new Animated.ValueXY({ x: lng, y: lat })
).current;

// Shape animato
const animatedShape = new AnimatedShape({
  type: 'Point',
  coordinates: new AnimatedExtractCoordinateFromArray(
    animatedCoords,
    0
  )
});

// Animazione fluida su native driver
Animated.timing(animatedCoords, {
  toValue: { x: newLng, y: newLat },
  duration: 1000,
  useNativeDriver: true  // GPU-accelerated!
}).start();

// Rendering
<ShapeSource shape={animatedShape}>
  <SymbolLayer ... />
</ShapeSource>

// Performance: 60 FPS (animazione su native thread)
```

### 5.2 Frequenze Sensate e Throttling

**Raccomandazioni:**

| Scenario | Frequenza Update | Tecnica |
|---|---|---|
| Tracking real-time (es. veicoli) | 1 Hz (1/sec) | setNativeProps + throttle |
| Animazioni fluide (singolo marker) | 60 FPS | Animated API |
| Update bulk 100k marker | 0.1-0.5 Hz | Batch update + debounce |
| Interazione utente (tap/selezione) | Immediato | onPress callback |

**Throttling Esempio:**
```typescript
import { throttle } from 'lodash';

// Update max ogni 2 secondi
const updateMarkersThrottled = useCallback(
  throttle((newData) => {
    shapeSourceRef.current?.setNativeProps({
      shape: JSON.stringify(newData)
    });
  }, 2000, { leading: true, trailing: true }),
  []
);

// Uso
useEffect(() => {
  const interval = setInterval(() => {
    const newGeoJSON = generateUpdatedMarkers();
    updateMarkersThrottled(newGeoJSON);
  }, 500);  // Tenta update ogni 500ms, ma effettivo ogni 2s
  
  return () => clearInterval(interval);
}, []);
```

**Interpolazione Client-Side:**
```typescript
// Invece di update frequenti dal server:
// 1. Ricevi posizione target ogni 2-5 secondi
// 2. Interpola movimento in JS/native

const interpolatePosition = (
  currentPos: [number, number],
  targetPos: [number, number],
  progress: number  // 0-1
): [number, number] => [
  currentPos[0] + (targetPos[0] - currentPos[0]) * progress,
  currentPos[1] + (targetPos[1] - currentPos[1]) * progress
];

// Animation loop
useEffect(() => {
  let startTime = Date.now();
  const duration = 2000;  // 2 secondi interpolazione
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const interpolatedGeoJSON = {
      type: 'FeatureCollection',
      features: markers.map(m => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: interpolatePosition(
            m.currentPos,
            m.targetPos,
            progress
          )
        },
        properties: m.properties
      }))
    };
    
    shapeSourceRef.current?.setNativeProps({
      shape: JSON.stringify(interpolatedGeoJSON)
    });
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  animate();
}, [targetPositions]);  // Trigger quando arrivano nuove posizioni dal server
```

### 5.3 Fattibile Lato Native vs Lato JS

**Operazioni Native (GPU/C++):**
- ✅ Rendering layer (sempre native)
- ✅ Data-driven expression evaluation (shader GPU)
- ✅ Animazioni via Animated API con `useNativeDriver: true`
- ✅ Clustering (algoritmo nativo)
- ✅ Collision detection (native)

**Operazioni JS Thread:**
- ⚠️ GeoJSON generation/manipulation
- ⚠️ onPress callbacks
- ⚠️ State management (React)
- ⚠️ Network requests (fetch per update)

**Ottimizzazione Critica:**
```typescript
// ❌ BAD: Blocca JS thread
const updateMarkers = () => {
  const geoJSON = generateHugeGeoJSON(100000);  // Blocco 100ms
  setGeoJSON(geoJSON);  // Altro blocco per serializzazione
};

// ✅ GOOD: Worker thread + chunking
import { createWorker } from 'react-native-workers';

const worker = createWorker();

worker.postMessage({ type: 'generate', count: 100000 });

worker.onMessage((geoJSON) => {
  // GeoJSON già pronto, update veloce
  shapeSourceRef.current?.setNativeProps({ shape: geoJSON });
});

// Worker (separate thread)
self.onMessage = ({ type, count }) => {
  if (type === 'generate') {
    const geoJSON = generateGeoJSON(count);
    self.postMessage(JSON.stringify(geoJSON));
  }
};
```

**Reanimated 2/3 per Animazioni Native:**
```typescript
import Animated, { 
  useSharedValue, 
  useAnimatedReaction,
  runOnUI
} from 'react-native-reanimated';

// Shared value (UI thread)
const markerPositions = useSharedValue(initialPositions);

// Animazione 100% su UI thread
const animatePositions = useCallback(() => {
  'worklet';  // Esegue su UI thread
  
  markerPositions.value = newPositions;
}, []);

// Sync con MapLibre
useAnimatedReaction(
  () => markerPositions.value,
  (positions) => {
    // Aggiorna GeoJSON direttamente su UI thread
    runOnUI(() => {
      const geoJSON = createGeoJSON(positions);
      shapeSourceRef.current?.setNativeProps({ shape: geoJSON });
    })();
  }
);
```

---

## 6. Check-List Pratica Implementazione

### 6.1 Setup Iniziale

- [ ] **Installa dipendenze**
  ```bash
  npm install @maplibre/maplibre-react-native
  ```

- [ ] **Configura MapView base**
  ```typescript
  import { MapView } from '@maplibre/maplibre-react-native';
  
  <MapView
    style={{ flex: 1 }}
    styleURL="https://demotiles.maplibre.org/style.json"
  />
  ```

### 6.2 Preparazione Asset Marker

- [ ] **Design marker custom**
  - Tool: Figma/Sketch/Illustrator
  - Formato: PNG con alpha channel
  - Dimensione: 64x64 o 128x128 px (power of 2)
  - Antialiasing: Attivo

- [ ] **Converti in SDF (se serve ricolorazione)**
  - Esporta monocromatico (bianco su trasparente)
  - Genera SDF con tool dedicato
  - Test: Verifica halo rendering

- [ ] **Aggiungi a progetto**
  ```typescript
  // assets/images/marker.png
  import markerIcon from './assets/images/marker.png';
  ```

### 6.3 Implementazione Codice

- [ ] **Crea GeoJSON data source**
  ```typescript
  const generateMarkers = (count: number): GeoJSON.FeatureCollection => ({
    type: 'FeatureCollection',
    features: Array.from({ length: count }, (_, i) => ({
      type: 'Feature',
      id: i,
      geometry: {
        type: 'Point',
        coordinates: [
          -180 + Math.random() * 360,
          -85 + Math.random() * 170
        ]
      },
      properties: {
        id: i,
        color: COLORS[i % COLORS.length],
        bearing: Math.random() * 360,
        size: 0.8 + Math.random() * 0.4
      }
    }))
  });
  ```

- [ ] **Registra immagini**
  ```typescript
  <Images
    images={{
      'custom-marker': {
        source: markerIcon,
        sdf: true  // Se usi SDF
      }
    }}
  />
  ```

- [ ] **Aggiungi ShapeSource + SymbolLayer**
  ```typescript
  const shapeSourceRef = useRef<ShapeSourceRef>(null);
  const [geoJSON, setGeoJSON] = useState(generateMarkers(100000));
  
  <ShapeSource
    ref={shapeSourceRef}
    id="markers"
    shape={geoJSON}
    onPress={handleMarkerPress}
  >
    <SymbolLayer
      id="marker-layer"
      style={{
        iconImage: 'custom-marker',
        iconColor: ['get', 'color'],
        iconSize: ['get', 'size'],
        iconRotate: ['get', 'bearing'],
        iconAllowOverlap: true,
        iconIgnorePlacement: true
      }}
    />
  </ShapeSource>
  ```

### 6.4 Ottimizzazioni Performance

- [ ] **Disabilita collision detection (se OK overlap)**
  ```typescript
  iconAllowOverlap: true,
  iconIgnorePlacement: true
  ```

- [ ] **Abilita clustering (se accettabile visivamente)**
  ```typescript
  <ShapeSource
    cluster={true}
    clusterRadius={50}
    clusterMaxZoomLevel={14}
    ...
  />
  ```

- [ ] **Usa espressioni per varianti (non texture multiple)**
  ```typescript
  iconColor: ['get', 'color']  // vs 10 texture diverse
  ```

- [ ] **Throttle update frequenti**
  ```typescript
  const updateThrottled = useCallback(
    throttle((data) => {
      shapeSourceRef.current?.setNativeProps({ shape: JSON.stringify(data) });
    }, 1000),
    []
  );
  ```

- [ ] **Testa su dispositivo Android entry-level**
  - Target: Samsung Galaxy A10 (2019) o equivalente
  - Metriche: FPS, tempo caricamento, memoria

### 6.5 Interattività

- [ ] **Gestisci tap su marker**
  ```typescript
  const handleMarkerPress = (event: OnPressEvent) => {
    const { features } = event;
    const tappedMarker = features[0];
    console.log('Tapped marker:', tappedMarker.properties.id);
    
    // Aggiorna visualizzazione
    const updatedGeoJSON = {
      ...geoJSON,
      features: geoJSON.features.map(f =>
        f.id === tappedMarker.id
          ? { ...f, properties: { ...f.properties, selected: true }}
          : { ...f, properties: { ...f.properties, selected: false }}
      )
    };
    setGeoJSON(updatedGeoJSON);
  };
  ```

- [ ] **Aggiungi feedback visivo selezione**
  ```typescript
  iconSize: [
    'case',
    ['get', 'selected'], 1.5,
    ['get', 'size']
  ]
  ```

### 6.6 Anti-Pattern da Evitare

- [ ] ❌ **NON usare PointAnnotation per >100 marker**
  ```typescript
  // BAD
  {markers.map(m => (
    <PointAnnotation key={m.id} coordinate={m.coords}>
      <View>...</View>
    </PointAnnotation>
  ))}
  ```

- [ ] ❌ **NON generare texture per ogni variante**
  ```typescript
  // BAD
  images={{
    'marker-red': red.png,
    'marker-blue': blue.png,
    // ... 100 file
  }}
  ```

- [ ] ❌ **NON aggiornare onMapMove**
  ```typescript
  // BAD: Causa lag estremo
  <MapView onRegionDidChange={() => {
    updateAllMarkers();  // 100k update!
  }}>
  ```

- [ ] ❌ **NON usare SVG components React**
  ```typescript
  // BAD
  import Svg, { Circle } from 'react-native-svg';
  {markers.map(m => (
    <Svg>
      <Circle ... />
    </Svg>
  ))}
  ```

---

## 7. Conclusione e Valutazione Finale

### 7.1 È Possibile Renderizzare 100k Marker Custom?

**RISPOSTA: SÌ, con i seguenti compromessi:**

✅ **COSA È POSSIBILE:**
1. **100.000 marker su mappa senza lag** (anche su Android vecchi)
2. **Forme custom tramite texture PNG** (non SVG vero, ma visivamente equivalente)
3. **Stroke + fill** (nativi su CircleLayer, texture-based su SymbolLayer)
4. **Rotazione fluida** (bearing via `iconRotate`)
5. **Colori/dimensioni variabili** (data-driven expressions)
6. **Animazioni posizione** (via Animated API, max ~10k simultanei per rimanere fluido)
7. **Interazione tap/selezione** (onPress callbacks)

⚠️ **COMPROMESSI NECESSARI:**

1. **SVG "vero" → Texture PNG**
   - Niente rendering vettoriale SVG paths arbitrari
   - Soluzione: Rasterizza forma custom in PNG 64-128px con antialiasing
   - Risultato: Indistinguibile su mobile, scaling tramite `iconSize`

2. **Forme custom complesse → SDF + Texture**
   - Quadrato con border-radius selettivo: Possibile solo come texture
   - Niente generazione runtime di forme complesse
   - Soluzione: Max 5-10 texture shape base, colori via SDF `iconColor`

3. **Animazioni limitate a subset**
   - 100k marker animati simultaneamente: ❌ Troppo overhead JS
   - 1k-10k marker animati: ✅ Fattibile con Animated API
   - Soluzione: Anima solo marker visibili (viewport culling) o usa interpolazione

4. **NO clustering → Performance degradation a zoom out**
   - Senza clustering, 100k marker sovrapposti = confusione visiva
   - Performance rimane OK, ma UX scadente
   - Soluzione consigliata: Abilita clustering comunque, o usa SymbolLayer z-index sorting

5. **Update real-time throttling obbligatorio**
   - Update 100k marker a 60 FPS: ❌ Impossibile (limite bridge JS-Native)
   - Update 1-2 Hz con interpolazione: ✅ Fattibile e fluido
   - Soluzione: Server invia delta ogni 2-5s, client interpola

### 7.2 Opzione Migliore Raccomandata

**APPROCCIO "GOLD STANDARD":**

**1. Setup Base**
```typescript
- ShapeSource con 100k GeoJSON Point features
- SymbolLayer con SDF icon (1 texture ricolorabile)
- Data-driven styling per varianti (colore, dimensione, rotazione)
- Clustering opzionale per zoom-out
```

**2. Asset Preparation**
```
- Disegna marker custom in Figma/Sketch
- Esporta PNG 128x128 monocromatico
- Genera SDF con tool dedicato
- Risultato: 1 texture, infinite varianti colore
```

**3. Styling**
```typescript
<SymbolLayer
  style={{
    iconImage: 'marker-sdf',
    iconColor: ['get', 'markerColor'],      // Colore da GeoJSON properties
    iconHaloColor: '#ffffff',               // Bordo bianco
    iconHaloWidth: 2,                       // Stroke 2px
    iconSize: ['interpolate', ['linear'], 
               ['get', 'importance'], 
               0, 0.5, 10, 1.5],            // Size variabile
    iconRotate: ['get', 'bearing'],         // Rotazione
    iconAllowOverlap: true
  }}
/>
```

**4. Update Strategy**
```typescript
- Server → Client: Delta updates ogni 2-5 secondi (solo marker modificati)
- Client interpolation: Smooth animation tra update
- Throttled setNativeProps: Max 1-2 Hz per bulk update
- Animated API: Per singoli marker focus (es. seguito veicolo)
```

**5. Interactivity**
```typescript
- onPress per selezione marker
- Update GeoJSON `selected` property
- Layer separato per marker selezionati (se serve Z-index alto)
```

**Performance Attesa:**
- Caricamento iniziale 100k marker: 1-2 secondi
- Rendering: 60 FPS su Android moderni, 30-45 FPS su vecchi
- Memory: ~10-15MB (GeoJSON + texture)
- Animazioni: Fluide fino a ~5k marker simultanei

**Limitazioni Accettate:**
- Forma marker: Texture PNG (no SVG runtime)
- Max varianti texture: 5-10 (resto via data-driven color)
- Update frequency: 1-2 Hz per 100k marker (10-60 Hz per subset)

### 7.3 Alternative se Requisiti più Stringenti

**Se servono >100k marker (es. 500k-1M):**
- Usa **HeatmapLayer** per densità
- Clustering aggressivo (clusterRadius=100+)
- Viewport-based filtering (mostra solo visible markers)

**Se serve SVG "vero" con path arbitrari:**
- ❌ Non supportato nativamente
- Workaround: React Native Skia per rendering custom layer (complessità estrema)

**Se serve animazione 100k marker a 60 FPS:**
- ❌ Impossibile (limite fisico JS-Native bridge)
- Alternativa: Simula movimento con shader animations (richiede CustomLayer nativo custom)

---

## Appendice: Risorse Utili

### Documentazione MapLibre
- [MapLibre GL JS Style Spec](https://maplibre.org/maplibre-style-spec/)
- [Expressions Reference](https://maplibre.org/maplibre-style-spec/expressions/)
- [Android Native SDK](https://github.com/maplibre/maplibre-native/tree/main/platform/android)

### Tool SDF Generation
- [SDF Glyph Foundry](https://github.com/maplibre/sdf-glyph-foundry)
- [TinySDF JS Library](https://github.com/mapbox/tiny-sdf)

### Performance Profiling
- React DevTools: Component render times
- Android Profiler: GPU rendering, memory
- Xcode Instruments: Core Animation, Time Profiler

### Esempi Codice Libreria
- `/examples/shared/src/examples/SymbolCircleLayer/SdfIcon.tsx`
- `/examples/shared/src/examples/SymbolCircleLayer/Earthquakes.tsx` (clustering)
- `/examples/shared/src/examples/Animations/AnimateCircleAlongLine.tsx`

---

**Autore:** Analisi tecnica generata per progetto `@maplibre/maplibre-react-native`  
**Versione Libreria:** 10.x  
**Data:** 2026-01-17  
**Linguaggio:** Italiano

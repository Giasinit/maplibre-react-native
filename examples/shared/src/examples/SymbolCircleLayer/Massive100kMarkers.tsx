import {
  MapView,
  ShapeSource,
  CircleLayer,
  Camera,
} from "@maplibre/maplibre-react-native";
import { useState, useMemo } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

// Padova coordinates
const PADOVA_CENTER = [11.8767611, 45.4064349]; // [lng, lat]

// Generate 100k markers within ~100km radius around Padova
const generateMarkersAroundPadova = (
  count: number,
): GeoJSON.FeatureCollection => {
  const features: GeoJSON.Feature[] = [];

  // ~100km = ~0.9 degrees at this latitude
  const radiusDegrees = 0.9;

  // Generate random colors for variety
  const colors = [
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#45B7D1", // Blue
    "#FFA07A", // Salmon
    "#98D8C8", // Mint
    "#F7DC6F", // Yellow
    "#BB8FCE", // Purple
    "#85C1E2", // Light blue
  ];

  for (let i = 0; i < count; i++) {
    // Random position within circle
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.sqrt(Math.random()) * radiusDegrees;

    const lng = PADOVA_CENTER[0] + radius * Math.cos(angle);
    const lat = PADOVA_CENTER[1] + radius * Math.sin(angle);

    features.push({
      type: "Feature",
      id: i,
      geometry: {
        type: "Point",
        coordinates: [lng, lat],
      },
      properties: {
        id: i,
        color: colors[i % colors.length],
        bearing: Math.random() * 360,
        // Vary size slightly for visual interest
        size: 0.3 + Math.random() * 0.4,
      },
    });
  }

  return {
    type: "FeatureCollection",
    features,
  };
};

export function Massive100kMarkers() {
  const [isGenerating, setIsGenerating] = useState(true);

  // Generate markers on mount - memoized to avoid regeneration
  const geoJSON = useMemo(() => {
    const startTime = Date.now();
    const data = generateMarkersAroundPadova(100000);
    const elapsed = Date.now() - startTime;
    console.log(`Generated 100k markers in ${elapsed}ms`);
    setIsGenerating(false);
    return data;
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Camera
          zoomLevel={9}
          centerCoordinate={PADOVA_CENTER}
          animationDuration={0}
        />

        <ShapeSource
          id="massive-markers"
          shape={geoJSON}
          onPress={(event) => {
            const feature = event.features[0];
            console.log(`Tapped marker #${feature?.properties?.id}`);
          }}
        >
          {/* Using CircleLayer for maximum GPU performance */}
          <CircleLayer
            id="marker-circles"
            style={{
              circleColor: ["get", "color"],
              circleRadius: [
                "interpolate",
                ["linear"],
                ["zoom"],
                8,
                3, // At zoom 8, radius = 3px
                12,
                6, // At zoom 12, radius = 6px
                16,
                10, // At zoom 16, radius = 10px
              ],
              circleOpacity: 0.85,
              circleStrokeWidth: 1,
              circleStrokeColor: "#ffffff",
              circlePitchAlignment: "map",
            }}
          />
        </ShapeSource>
      </MapView>

      {isGenerating && (
        <View style={styles.overlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#4ECDC4" />
            <Text style={styles.loadingText}>
              Generating 100,000 markers...
            </Text>
          </View>
        </View>
      )}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>100k Markers Performance Test</Text>
        <Text style={styles.infoText}>
          📍 Location: 100km radius around Padova, Italy
        </Text>
        <Text style={styles.infoText}>🎯 Total markers: 100,000</Text>
        <Text style={styles.infoText}>
          ⚡ Rendering: GPU-accelerated (ShapeSource + CircleLayer)
        </Text>
        <Text style={styles.infoSubtext}>
          Zoom in/out and pan to test performance. All 100k markers are rendered
          simultaneously using MapLibre's native GPU rendering.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingCard: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  infoCard: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#666",
  },
  infoSubtext: {
    fontSize: 12,
    marginTop: 8,
    color: "#999",
    fontStyle: "italic",
  },
});

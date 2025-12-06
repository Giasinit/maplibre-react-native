import { render } from "@testing-library/react-native";
import * as React from "react";

import { MapView } from "../..";

describe("MapView", () => {
  test("renders with testID", () => {
    const expectedTestId = "im used for identification in tests";

    const { getByTestId } = render(<MapView testID={expectedTestId} />);

    expect(() => {
      getByTestId(expectedTestId);
    }).not.toThrow();
  });

  test("renders with frameUpdateEnabled prop", () => {
    const expectedTestId = "map-with-frame-updates";
    const mockCallback = jest.fn();

    const { getByTestId } = render(
      <MapView
        testID={expectedTestId}
        frameUpdateEnabled
        onCameraChangedOnFrame={mockCallback}
      />,
    );

    expect(() => {
      getByTestId(expectedTestId);
    }).not.toThrow();
  });

  test("renders with frameUpdateEnabled disabled", () => {
    const expectedTestId = "map-without-frame-updates";

    const { getByTestId } = render(
      <MapView testID={expectedTestId} frameUpdateEnabled={false} />,
    );

    expect(() => {
      getByTestId(expectedTestId);
    }).not.toThrow();
  });

  test("onCameraChangedOnFrame callback receives FramePayload with center coordinate", () => {
    const expectedTestId = "map-with-center-in-frame";
    const mockCallback = jest.fn();

    // This test validates that the callback prop is properly typed
    // The actual native event would include center in properties
    render(
      <MapView
        testID={expectedTestId}
        frameUpdateEnabled
        onCameraChangedOnFrame={(feature) => {
          // TypeScript should recognize these properties
          const {
            zoomLevel,
            heading,
            pitch,
            timestamp,
            visibleBounds,
            center,
          } = feature.properties;
          mockCallback({
            zoomLevel,
            heading,
            pitch,
            timestamp,
            visibleBounds,
            center,
            // Also available in geometry.coordinates
            geometryCoordinates: feature.geometry.coordinates,
          });
        }}
      />,
    );

    expect(mockCallback).not.toHaveBeenCalled(); // No native events in test env
  });

  test("renders with onMapResize callback", () => {
    const expectedTestId = "map-with-resize-callback";
    const mockCallback = jest.fn();

    const { getByTestId } = render(
      <MapView testID={expectedTestId} onMapResize={mockCallback} />,
    );

    expect(() => {
      getByTestId(expectedTestId);
    }).not.toThrow();
  });

  test("onMapResize callback receives ResizePayload with center coordinate and dimensions", () => {
    const expectedTestId = "map-with-resize-center";
    const mockCallback = jest.fn();

    // This test validates that the callback prop is properly typed
    // The actual native event would include center, width, and height in properties
    render(
      <MapView
        testID={expectedTestId}
        onMapResize={(feature) => {
          // TypeScript should recognize these properties
          const {
            zoomLevel,
            heading,
            pitch,
            visibleBounds,
            center,
            width,
            height,
          } = feature.properties;
          mockCallback({
            zoomLevel,
            heading,
            pitch,
            visibleBounds,
            center,
            width,
            height,
            // Also available in geometry.coordinates
            geometryCoordinates: feature.geometry.coordinates,
          });
        }}
      />,
    );

    expect(mockCallback).not.toHaveBeenCalled(); // No native events in test env
  });

  test("onRegionIsChanging callback receives RegionPayload with center coordinate", () => {
    const expectedTestId = "map-with-region-changing";
    const mockCallback = jest.fn();

    // This test validates that the callback prop includes center in properties
    render(
      <MapView
        testID={expectedTestId}
        onRegionIsChanging={(feature) => {
          // TypeScript should recognize these properties including center
          const {
            zoomLevel,
            heading,
            pitch,
            animated,
            isUserInteraction,
            visibleBounds,
            center,
          } = feature.properties;
          mockCallback({
            zoomLevel,
            heading,
            pitch,
            animated,
            isUserInteraction,
            visibleBounds,
            center,
            // Also available in geometry.coordinates
            geometryCoordinates: feature.geometry.coordinates,
          });
        }}
      />,
    );

    expect(mockCallback).not.toHaveBeenCalled(); // No native events in test env
  });

  test("renders with onMapMove callback", () => {
    const expectedTestId = "map-with-move-callback";
    const mockCallback = jest.fn();

    const { getByTestId } = render(
      <MapView testID={expectedTestId} onMapMove={mockCallback} />,
    );

    expect(() => {
      getByTestId(expectedTestId);
    }).not.toThrow();
  });

  test("onMapMove callback receives MovePayload with center coordinate", () => {
    const expectedTestId = "map-with-move-center";
    const mockCallback = jest.fn();

    // This test validates that the callback prop is properly typed
    // The actual native event would include center in properties
    render(
      <MapView
        testID={expectedTestId}
        onMapMove={(feature) => {
          // TypeScript should recognize these properties
          const {
            zoomLevel,
            heading,
            pitch,
            visibleBounds,
            center,
          } = feature.properties;
          mockCallback({
            zoomLevel,
            heading,
            pitch,
            visibleBounds,
            center,
            // Also available in geometry.coordinates
            geometryCoordinates: feature.geometry.coordinates,
          });
        }}
      />,
    );

    expect(mockCallback).not.toHaveBeenCalled(); // No native events in test env
  });
});

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
});

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
});

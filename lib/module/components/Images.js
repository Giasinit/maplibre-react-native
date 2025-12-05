"use strict";

import { useMemo } from "react";
import { Image, requireNativeComponent } from "react-native";
import { jsx as _jsx } from "react/jsx-runtime";
export const NATIVE_MODULE_NAME = "MLRNImages";
/**
 * Images defines the images used in Symbol layers
 */
export const Images = ({
  images,
  nativeAssetImages,
  onImageMissing,
  id,
  children
}) => {
  const props = useMemo(() => {
    const getImages = () => {
      if (!images && !nativeAssetImages) {
        return {};
      }
      const imagesResult = {};
      if (images) {
        Object.entries(images).forEach(([imageName, value]) => {
          if (typeof value === "string") {
            imagesResult[imageName] = value;
          } else if (typeof value === "object" && "source" in value && value.source) {
            imagesResult[imageName] = {
              ...Image.resolveAssetSource(value.source),
              sdf: value.sdf
            };
          } else {
            imagesResult[imageName] = Image.resolveAssetSource(value);
          }
        });
      }
      return imagesResult;
    };
    return {
      id,
      hasOnImageMissing: !!onImageMissing,
      onImageMissing: event => {
        if (onImageMissing) {
          onImageMissing(event.nativeEvent.payload.imageKey);
        }
      },
      images: getImages(),
      nativeImages: nativeAssetImages ?? []
    };
  }, [id, onImageMissing, images, nativeAssetImages]);
  return /*#__PURE__*/_jsx(MLRNImages, {
    ...props,
    children: children
  });
};
const MLRNImages = requireNativeComponent(NATIVE_MODULE_NAME);
//# sourceMappingURL=Images.js.map
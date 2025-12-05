"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NATIVE_MODULE_NAME = exports.Images = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
const NATIVE_MODULE_NAME = exports.NATIVE_MODULE_NAME = "MLRNImages";
/**
 * Images defines the images used in Symbol layers
 */
const Images = ({
  images,
  nativeAssetImages,
  onImageMissing,
  id,
  children
}) => {
  const props = (0, _react.useMemo)(() => {
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
              ..._reactNative.Image.resolveAssetSource(value.source),
              sdf: value.sdf
            };
          } else {
            imagesResult[imageName] = _reactNative.Image.resolveAssetSource(value);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MLRNImages, {
    ...props,
    children: children
  });
};
exports.Images = Images;
const MLRNImages = (0, _reactNative.requireNativeComponent)(NATIVE_MODULE_NAME);
//# sourceMappingURL=Images.js.map
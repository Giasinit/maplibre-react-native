"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedExtractCoordinateFromArray = void 0;
var _reactNative = require("react-native");
// https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Animated/nodes/AnimatedWithChildren.js
const AnimatedWithChildren = Object.getPrototypeOf(_reactNative.Animated.ValueXY);
if (__DEV__) {
  if (AnimatedWithChildren.name !== "AnimatedWithChildren") {
    console.error("AnimatedCoordinatesArray could not obtain AnimatedWithChildren base class");
  }
}
class AnimatedExtractCoordinateFromArray extends AnimatedWithChildren {
  _index = 0;
  constructor(array, index) {
    super();
    this._array = array;
    this._index = index;
  }
  __getValue() {
    const actArray = this._array.__getValue();
    let index = this._index;
    if (index < 0) {
      index += actArray.length;
    }
    return actArray[index];
  }
  __attach() {
    this._array.__addChild(this);
  }
  __detach() {
    this._array.__removeChild(this);
    super.__detach();
  }
}
exports.AnimatedExtractCoordinateFromArray = AnimatedExtractCoordinateFromArray;
//# sourceMappingURL=AnimatedExtractCoordinateFromArray.js.map
"use strict";

import { useRef } from "react";
export const useOnce = callback => {
  const once = useRef(false);
  if (!once.current) {
    once.current = true;
    callback();
  }
};
//# sourceMappingURL=useOnce.js.map
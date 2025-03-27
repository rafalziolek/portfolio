import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Portal({ children, containerId = "portal-root" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let element = document.getElementById(containerId);
    if (!element) {
      element = document.createElement("div");
      element.id = containerId;
      document.body.appendChild(element);
    }
    return () => {
      if (element.childNodes.length === 0) {
        element.remove();
      }
    };
  }, [containerId]);

  return mounted ? createPortal(children, document.getElementById(containerId)) : null;
}

export default Portal;

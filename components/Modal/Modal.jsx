import React from "react";
import { styled } from "../../stitches.confing";
import Box from "../Box/Box";

const Overlay = styled("div", {
  width: "100%",
  height: "100vh",
  backdropFilter: "blur(5px)",
  background: "rgba(0,0,0,0.6)",
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: "998",
});

const ModalWrapper = styled("div", {
  background: "#292929",
  borderRadius: "$radius$m",
  position: "fixed",
  top: "32px",
  right: "32px",
  zIndex: "999",
  padding: "32px",
  width: "500px",
});

function Modal({ position, children, isOpen, setIsOpen }) {
  const handleClose = () => {
    setIsOpen(false);
  };
  if (isOpen) {
    return (
      <>
        <Overlay onClick={handleClose} />

        <ModalWrapper>{children}</ModalWrapper>
      </>
    );
  }
}

export default Modal;

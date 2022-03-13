import React from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";
import Card from "./Card";

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </Card>
  );
};

const Overlay = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onOverlayClick}></div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <ModalOverlay className={classes.modal}>{props.children}</ModalOverlay>,
        document.getElementById("modal")
      )}
      {ReactDom.createPortal(
        <Overlay
          className={classes.overlay}
          onOverlayClick={props.onOverlayClick}
        />,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Modal;

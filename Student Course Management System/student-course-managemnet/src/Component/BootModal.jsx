import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const BootModal = ({ visibility, title, body, onClose, onSubmit }) => {
  return (
    <Modal show={visibility} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BootModal;

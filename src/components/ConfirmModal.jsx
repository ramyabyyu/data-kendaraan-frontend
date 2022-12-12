import React, { useState } from "react";
import { API } from "../config/api";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, handleClose, dataId, setFetchStatus }) => {
  const deleteData = async (id) => {
    try {
      const response = await API.delete(`/vehicle/${id}`);
      if (response.status === 200) {
        setFetchStatus(true);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={() => deleteData(dataId)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

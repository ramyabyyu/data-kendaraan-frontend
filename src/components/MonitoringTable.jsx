import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Alert,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config/api";
import ConfirmModal from "./ConfirmModal";

const MonitoringTable = ({ vehicles, setFetchStatus }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [dataId, setDataId] = useState(null);

  const handleGetId = (id) => {
    setDataId(id);
    handleShow();
  };

  return (
    <>
      <Table className="mt-5" striped bordered>
        <thead>
          <tr>
            <th>No</th>
            <th>No Registerasi</th>
            <th>Nama Pemilik</th>
            <th>Merk Kendaraan</th>
            <th>Tahun Pembuatan</th>
            <th>Kapasitas</th>
            <th>Warna</th>
            <th>Bahan Bakar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles?.length < 1 ? (
            <tr>
              <td colSpan={9}>
                <h5 className="text-center">No data found</h5>
              </td>
            </tr>
          ) : (
            <>
              {vehicles?.map((vehicle, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{vehicle.registrationNumber}</td>
                  <td>{vehicle.ownerName}</td>
                  <td>{vehicle.vehicleBrand}</td>
                  <td>{vehicle.productionYear}</td>
                  <td>{vehicle.cylinderCapacity} cc</td>
                  <td>{vehicle.vehicleColor}</td>
                  <td>{vehicle.fuel}</td>
                  <td className="d-flex">
                    <Button
                      as={Link}
                      to={`/detail/${vehicle.id}`}
                      className="btn btn-light text-warning fw-bold p-0 me-2"
                    >
                      Detail
                    </Button>
                    <Button
                      as={Link}
                      to={`/edit/${vehicle.id}`}
                      className="btn btn-light text-info fw-bold p-0 me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleGetId(vehicle.id)}
                      className="btn btn-light text-danger fw-bold p-0 me-2"
                    >
                      Delete
                    </Button>
                    <ConfirmModal
                      show={show}
                      handleClose={handleClose}
                      dataId={dataId}
                      setFetchStatus={setFetchStatus}
                    />
                    {/* <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        id="dropdown-basic"
                        className="p-0 text-danger"
                      >
                        Delete
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          href="#"
                          className="text-danger"
                          onClick={() => deleteData(vehicle.id)}
                        >
                          Confirm
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="text-secondary">
                          Cancel
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown> */}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default MonitoringTable;

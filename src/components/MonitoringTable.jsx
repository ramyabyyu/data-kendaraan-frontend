import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../config/api";

const MonitoringTable = ({ vehicles, deleteData }) => {
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
                <h5 className="text-center">
                  no data available, please input some data first!
                </h5>
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
                  <td>
                    <a
                      href="#"
                      className="text-warning text-decoration-none me-1 fw-bold"
                    >
                      Detail
                    </a>
                    <a
                      href={`/edit/${vehicle.id}`}
                      className="text-info text-decoration-none me-1 fw-bold"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="text-danger text-decoration-none mb-1 fw-bold"
                      onClick={(e) => deleteData(vehicle.id)}
                    >
                      Delete
                    </a>
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

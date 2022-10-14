import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useQuery } from "react-query";
import MonitoringTable from "../components/MonitoringTable";
import { API } from "../config/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [dataFilter, setDataFilter] = useState([]);
  const [message, setMessage] = useState(null);

  const { data: vehicles } = useQuery("vehicleCache", async () => {
    const response = await API.get("/vehicles");
    return response.data;
  });

  const handleDataFilterByRegNumber = (e) => {
    if (!e.target.value) {
      setDataFilter(vehicles);
      return;
    }

    const filterVehicle = vehicles?.filter((vehicle) => {
      return vehicle.registrationNumber
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setDataFilter(filterVehicle);
  };
  const handleDataFilterByOwnerName = (e) => {
    if (!e.target.value) {
      setDataFilter(vehicles);
      return;
    }

    const filterVehicle = vehicles?.filter((vehicle) => {
      return vehicle.ownerName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setDataFilter(filterVehicle);
  };

  const deleteData = async (id) => {
    try {
      const response = await API.delete(`/vehicle/${id}`);
      const alert = (
        <Alert variant="success" className="py-1 mb-3">
          {response.data}
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1 mb-3">
          {error.response.data.message}
        </Alert>
      );
      setMessage(alert);
    }
  };

  useEffect(() => {
    setDataFilter(vehicles);
  }, [vehicles, deleteData, message]);

  return (
    <>
      <Navbar title="Aplikasi Data Kendaraan" />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={12}>
            <Card className="rounded border border-warning bg-warning text-dark p-4">
              <div className="mb-3">
                <h5>No Registerasi</h5>
                <input
                  type="text"
                  className="form-control fs-bold"
                  onChange={handleDataFilterByRegNumber}
                />
              </div>
              <div className="mb-3">
                <h5>Nama Pemilik</h5>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleDataFilterByOwnerName}
                />
              </div>
            </Card>
            <div className="d-flex justify-content-end align-items-center mt-1">
              <Button variant="primary" className="me-1">
                Search
              </Button>
              <Button variant="primary" as={Link} to="/create">
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={12}>
            {message && message}
            <MonitoringTable vehicles={dataFilter} deleteData={deleteData} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;

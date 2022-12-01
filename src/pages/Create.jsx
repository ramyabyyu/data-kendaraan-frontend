import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";

const Create = () => {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    ownerName: "",
    address: "",
    vehicleBrand: "",
    productionYear: 0,
    cylinderCapacity: 0,
    vehicleColor: "",
    fuel: "",
  });

  const [message, setmessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(formData);

      const response = await API.post("/vehicle", body, config);

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      const alert = (
        <Alert variant="danger" className="py-1 mb-3">
          {error.response.data.message}
        </Alert>
      );
      setmessage(alert);
    }
  });

  let years = [];
  let currentYear = new Date().getFullYear();

  for (let i = 1990; i <= currentYear; i++) {
    years.push(i);
  }

  return (
    <>
      <Navbar title="Tambah Data Kendaraan" />
      <Container className="mt-5">
        <Row className="justify-content-center">
          {message && message}
          <Form className="d-flex" onSubmit={(e) => handleSubmit.mutate(e)}>
            <Col md={4} className="me-3">
              <div className="mb-3">
                <Form.Label htmlFor="registrationNumber">
                  No Registrasi Kendaraan
                </Form.Label>
                <Form.Control
                  type="text"
                  name="registrationNumber"
                  id="registrationNumber"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="ownerName">
                  Name Pemilik Kendaraan
                </Form.Label>
                <Form.Control
                  type="text"
                  name="ownerName"
                  id="ownerName"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="vehicleBrand">Merk Kendaraan</Form.Label>
                <Form.Control
                  type="text"
                  name="vehicleBrand"
                  id="vehicleBrand"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="address">
                  Alamat Pemilik Kendaraan
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  id="address"
                  rows={3}
                  style={{ resize: "none" }}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 d-flex">
                <Button type="submit" variant="primary" className="me-3">
                  Simpan
                </Button>
                <Button as={Link} to="/" variant="secondary" className="me-3">
                  Kembali
                </Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-3">
                <Form.Label htmlFor="productionYear">
                  Tahun Pembuatan
                </Form.Label>
                {/* <Form.Control
                  type="number"
                  name="productionYear"
                  id="productionYear"
                  min={1885}
                  max={new Date().getFullYear()}
                  maxLength={4}
                  onChange={handleChange}
                /> */}
                <Form.Select
                  name="productionYear"
                  id="productionYear"
                  onChange={handleChange}
                >
                  <option disabled selected>
                    Pilih Tahun Pembuatan
                  </option>
                  {years.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="cylinderCapacity">
                  Kapasitas Silinder
                </Form.Label>
                <Form.Control
                  type="number"
                  name="cylinderCapacity"
                  id="cylinderCapacity"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="vehicleColor">Warna Kendaraan</Form.Label>
                <Form.Select
                  name="vehicleColor"
                  id="vehicleColor"
                  onChange={handleChange}
                >
                  <option disabled selected>
                    Pilih Warna
                  </option>
                  <option value="Merah">Merah</option>
                  <option value="Hitam">Hitam</option>
                  <option value="Putih">Putih</option>
                  <option value="Biru">Biru</option>
                  <option value="Abu-abu">Abu-abu</option>
                </Form.Select>
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="fuel">Bahan Bakar</Form.Label>
                <Form.Select name="fuel" id="fuel" onChange={handleChange}>
                  <option disabled selected>
                    Pilih Bahan Bakar
                  </option>
                  <option value="Bensin">Bensin</option>
                  <option value="Diesel">Diesel</option>
                </Form.Select>
              </div>
            </Col>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default Create;

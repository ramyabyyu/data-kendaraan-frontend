import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

const Edit = () => {
  const [formData, setFormData] = useState(null);

  const { data: vehicle } = useQuery("vehicleCache", async () => {
    const response = await API.get(`/vehicle/${id}`);
    console.log("response.data=", response.data);
    return response.data;
  });

  const [message, setmessage] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(formData);

      const response = await API.put(`/vehicle/${id}`, body, config);
      navigate("/");
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

  useEffect(() => {
    setFormData(vehicle);
  }, [vehicle]);

  return (
    <>
      <Navbar title="Edit Data Kendaraan" />
      <Container className="mt-5">
        <Row className="justify-content-center">
          {message && message}
          <Form className="d-flex" onSubmit={(e) => handleSubmit.mutate(e)}>
            <Col md={4} className="me-3">
              <div className="mb-3">
                <Form.Label
                  htmlFor="registrationNumber"
                  className={message && "mt-2"}
                >
                  No Registrasi Kendaraan
                </Form.Label>
                <Form.Control
                  type="text"
                  name="registrationNumber"
                  id="registrationNumber"
                  onChange={handleChange}
                  value={formData?.registrationNumber}
                  disabled
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
                  value={formData?.ownerName}
                />
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="vehicleBrand">Merk Kendaraan</Form.Label>
                <Form.Control
                  type="text"
                  name="vehicleBrand"
                  id="vehicleBrand"
                  onChange={handleChange}
                  value={formData?.vehicleBrand}
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
                  value={formData?.address}
                />
              </div>
              <div className="mb-3 d-flex">
                <Button type="submit" variant="primary" className="me-3">
                  Simpan
                </Button>
                <a href="/" className="btn btn-secondary">
                  Kembali
                </a>
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-3">
                <Form.Label htmlFor="productionYear">
                  Tahun Pembuatan
                </Form.Label>
                <Form.Control
                  type="number"
                  name="productionYear"
                  id="productionYear"
                  onChange={handleChange}
                  value={formData?.productionYear}
                />
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
                  value={formData?.cylinderCapacity}
                />
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="vehicleColor">Warna Kendaraan</Form.Label>
                <Form.Select
                  name="vehicleColor"
                  id="vehicleColor"
                  onChange={handleChange}
                >
                  <option disabled>Pilih Warna</option>
                  <option
                    value="Merah"
                    selected={formData?.vehicleColor === "Merah"}
                  >
                    Merah
                  </option>
                  <option
                    value="Hitam"
                    selected={formData?.vehicleColor === "Hitam"}
                  >
                    Hitam
                  </option>
                  <option
                    value="Putih"
                    selected={formData?.vehicleColor === "Putih"}
                  >
                    Putih
                  </option>
                  <option
                    value="Biru"
                    selected={formData?.vehicleColor === "Biru"}
                  >
                    Biru
                  </option>
                  <option
                    value="Abu-abu"
                    selected={formData?.vehicleColor === "Abu-abu"}
                  >
                    Abu-abu
                  </option>
                </Form.Select>
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="fuel">Bahan Bakar</Form.Label>
                <Form.Select name="fuel" id="fuel" onChange={handleChange}>
                  <option disabled>Pilih Bahan Bakar</option>
                  <option value="Bensin" selected={formData?.fuel === "Bensin"}>
                    Bensin
                  </option>
                  <option value="Diesel" selected={formData?.fuel === "Diesel"}>
                    Diesel
                  </option>
                </Form.Select>
              </div>
            </Col>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default Edit;

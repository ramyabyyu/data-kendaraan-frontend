import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import Navbar from "../components/Navbar";

const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);

  const fetchOne = async () => {
    try {
      const response = await API.get(`/vehicle/${id}`);
      if (response.status === 200) {
        setDetailData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOne();
  }, []);

  return (
    <>
      <Navbar title="Detail Data Kendaraan" />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Title>Detail Kendaraan</Card.Title>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item className="d-flex justify-content-start">
                    <strong className="me-5">Nama Pemilik : </strong>
                    <span>{detailData?.ownerName}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-start">
                    <strong className="me-5">Nomor Registrasi : </strong>
                    <span>{detailData?.registrationNumber}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-start">
                    <strong className="me-5">Tahun Produksi : </strong>
                    <span>{detailData?.productionYear}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-start">
                    <strong className="me-5">Alamat Pemilik : </strong>
                    <span>{detailData?.address}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-start">
                    <strong className="me-5">Kapasitas Mesin : </strong>
                    <span>{detailData?.cylinderCapacity} cc</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-start">
                    <strong className="me-5">Tipe Bahan Bakar : </strong>
                    <span>{detailData?.fuel}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Detail;

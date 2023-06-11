import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SelectService = () => {
  const services = [
    { id: 1, name: "Haircut" },
    { id: 2, name: "HairCut + Beard" },
    { id: 3, name: "LineUp" },
  ];

  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    console.log("Selected Service:", service);
    navigate(`/booking/${service.id}`, {
      state: { selectedService: service },
    });
  };

  return (
    <Container>
      <div className="select-services">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ width: "18rem" }} className="text-center">
              <Card.Header>Services</Card.Header>
              <ListGroup variant="flush">
                {services.map((service) => (
                  <ListGroupItem
                    key={service.id}
                    action
                    onClick={() => handleServiceClick(service)}
                  >
                    {service.name}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default SelectService;

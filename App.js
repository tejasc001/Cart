import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Alert, Button, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'AI Camera', price: '$199' },
    { id: 2, name: 'Smart Glasses', price: '$299' },
    { id: 3, name: 'Neural Headset', price: '$399' },
  ]);

  const [catalogue, setCatalogue] = useState([]);

  const handleDragStart = (e, service) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(service));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const service = JSON.parse(e.dataTransfer.getData('text/plain'));
    setCatalogue([...catalogue, service]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFromCatalogue = (id) => {
    setCatalogue(catalogue.filter(service => service.id !== id));
  };

  return (
    <Container fluid className="app">
      {/* Header Section */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 header-navbar">
        <Container fluid>
          <Nav className="me-auto">
            <Button variant="outline-light">Menu</Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="main-content">
        <h1 className="text-center my-4">AI Services & Catalogue</h1>

        {/* Services Section */}
        <Row className="mb-5" id="services">
          <Col>
            <h2>Services</h2>
            <Row>
              {services.map((service) => (
                <Col key={service.id} md={4} className="mb-4">
                  <Card
                    draggable
                    onDragStart={(e) => handleDragStart(e, service)}
                    className="service-card"
                  >
                    <Card.Body>
                      <Card.Title>{service.name}</Card.Title>
                      <Card.Text>{service.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Catalogue Section */}
        <Row id="catalogue">
          <Col>
            <h2>Catalogue</h2>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="drop-zone"
            >
              {catalogue.length === 0 ? (
                <Alert variant="info" className="text-center">
                  Drag services here to add to the catalogue
                </Alert>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Service Name</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalogue.map((service, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{service.name}</td>
                        <td>{service.price}</td>
                        <td>
                          <Button variant="danger" onClick={() => removeFromCatalogue(service.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default App;
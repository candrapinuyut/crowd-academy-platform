/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SetTitle from '../../components/SetTitle';
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <>
      <SetTitle></SetTitle>
      <Helmet title="404 Not Found" />
      <Container fluid className="mt-3 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col sm={6}>
            <Card>
              <Card.Body className="text-center">
                <h1>404 Not Found</h1>
                <p className="lead">
                  Your destination url is not found in this server.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

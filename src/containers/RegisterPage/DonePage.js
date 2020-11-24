/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React,{useEffect,useState} from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';

function DonePage() {


  return (
    <Container className="h-50 mt-5">
      <Row className="h-50 justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
            <div className="alert alert-success">
              <h4>
                <i className="fa fa-check"></i> Selamat Anda Berhasil Terdaftar
              </h4>
              <p className='card-text mt-4'>
                terima kasih telah bergabung bersama kami.
                mohon segera cek email anda, kami telah mengirimkan email aktivasi pada email tersebut
              </p>
            </div>
            <Button  as={Link} to="/" className='float-right' variant='success'>Login</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}




export default DonePage;

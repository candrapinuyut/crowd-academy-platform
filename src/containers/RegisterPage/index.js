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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactLoading from 'react-loading';
import { useForm } from 'react-hook-form';
import { registerPelajar,registerPengajar } from '../App/action';
import { getToken as getAdminToken } from '../App/adminAction';
import { GET_TOKEN } from '../App/constants';
import ErrorMessageHandler from '../../components/ErrorMessageHandler';
import { Link } from 'react-router-dom';
import ReactAvatar from 'react-avatar';
import {GroupText,GroupContainer} from '../../components/styled/Group'
import Select from 'react-select';

function RegisterPage({ history,loading,error,registerPelajar,registerPengajar}) {
  const { register,setValue,errors, handleSubmit } = useForm();

 const onSubmit = (data) =>{

    const pelajarData= {
      nama: data.nama,
      username: data.username,
      alamat:'',
      no_telp: data.nohp,
      email: data.email,
      tempat_lahir:'',
      tanggal_lahir:'',
      password:data.password,
    };
    const pengajarData= {
      nama: data.nama,
      username: data.username,
      alamat:'',
      no_telp: data.nohp,
      email: data.email,
      tempat_lahir:'',
      tanggal_lahir:'',
      password:data.password,
      keahlian:'',
      deskripsi:'',
    };

    if(data.password != data.password2) alert('password tidak sama')
    else{
      if(data.levels==0){
        registerPelajar(pelajarData).then((e)=>{
        history.push('/register/donepage')

        })
      }else{
        registerPengajar(pelajarData).then((e)=>{
          history.push('/register/donepage')

        })
      }

    }


 }
 useEffect(()=>{
   register('levels'); setValue('levels',0);
  },[])
 const [levels,setLevels]=useState([
     {label:'Pelajar',value:0},
     {label:'Pengajar',value:1},
 ]);
 const formatGroupLabel = (data) => (
   <GroupContainer>
     <ReactAvatar
       src={data.image_url}
       size={50}
       name={data.label}
       round
       className="mr-3"
     />
     <GroupText>{data.label}</GroupText>
   </GroupContainer>
 );

 const SingleValue = (data) => (
   <div>
     <ReactAvatar
       src={data.image_url}
       size={30}
       name={data.label}
       className="mr-3"
     />
     <small>{data.label}</small>
   </div>
 );

  return (
    <Container className="h-50 mt-5">
      <Row className="h-50 justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>

              <div className="text-center mb-3">
                <img style={{ width:200 }} alt="grosirbox" src={'/logo.jpg'} />
              </div>

              <Card.Title className="text-center text-primary font-weight-bold">
                Register To Application
              </Card.Title>
              <Form onSubmit={handleSubmit((data)=>onSubmit(data,true))}>
                <Row className='mt-5'>
                  <Col md={6} className='mb-4'>
                    <Form.Group>
                       <Form.Label className='text-muted'>Sebagai</Form.Label>
                       <Form.Control
                         as={Select}
                         styles={{
                           container: () => ({
                             padding: 0,
                           }),
                           control: () => ({
                             border: 0,
                             display: 'flex',
                             justifyContent: 'flex-between',
                           }),
                         }}
                         options={levels}
                         formatGroupLabel={formatGroupLabel}
                         formatOptionLabel={SingleValue}
                         placeholder="Jenis Member"
                         name='levels'
                         ref={register({ required: true, minLength: 10 })}
                         isInvalid={errors.levels}
                         defaultValue={levels[0]}
                         onChange={(e)=>setValue('levels',e.value)}
                       />
                     </Form.Group>
                     <div className="invalid-feedback">
                       This field is required
                     </div>
                    </Col>
                  <Col md={6} className='mb-4'>
                    <Form.Group>
                      <Form.Label className='text-muted'>Nama Lengkap</Form.Label>
                      <Form.Control
                        size="md"
                        disabled={loading}
                        type="text"
                        name="nama"
                        ref={register({ required: true, minLength: 10 })}
                        isInvalid={errors.nama}
                        placeholder="masukan nama lengkap"
                      />
                      </Form.Group>
                      <div className="invalid-feedback">
                        This field is required
                      </div>
                    </Col>
                  <Col md={6} className='mb-4'>
                    <Form.Group>
                      <Form.Label className='text-muted'>Email</Form.Label>
                      <Form.Control
                        size="md"
                        disabled={loading}
                        type="email"
                        name="email"
                        ref={register({ required: true, minLength: 10 })}
                        isInvalid={errors.email}
                        placeholder="masukan Email"
                      />
                      </Form.Group>
                      <div className="invalid-feedback">
                        This field is required
                      </div>
                    </Col>
                    <Col md={6} className='mb-4'>
                      <Form.Group>
                        <Form.Label className='text-muted'>No Handphone</Form.Label>
                        <Form.Control
                          size="md"
                          disabled={loading}
                          type="number"
                          name="nohp"
                          ref={register({ required: true, minLength: 5 })}
                          isInvalid={errors.nohp}
                          placeholder="masukan no hp"
                        />
                        </Form.Group>
                        <div className="invalid-feedback">
                          This field is required
                        </div>
                    </Col>
                    <Col md={6} className='mb-4'>
                      <Form.Group>
                        <Form.Label className='text-muted'>Username</Form.Label>
                        <Form.Control
                          size="md"
                          disabled={loading}
                          type="text"
                          name="username"
                          ref={register({ required: true, minLength: 5 })}
                          isInvalid={errors.username}
                          placeholder="masukan username"
                        />
                        </Form.Group>
                        <div className="invalid-feedback">
                          This field is required
                        </div>
                    </Col>
                    <Col md={6} className='mb-4'>
                      <Form.Group>
                        <Form.Label className='text-muted'>Password</Form.Label>
                        <Form.Control
                          size="md"
                          disabled={loading}
                          type="password"
                          name="password"
                          ref={register}
                          placeholder="Password"
                        />
                        </Form.Group>
                    </Col>
                    <Col md={6} className='mb-4'>
                      <Form.Group>
                        <Form.Label className='text-muted'>Konfirmasi Password</Form.Label>
                        <Form.Control
                          size="md"
                          disabled={loading}
                          type="Password"
                          name="password2"
                          ref={register}
                          placeholder="Konfirmasi Password"
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Button
                  variant="outline-primary"
                  disabled={loading}
                  size="md"
                  block
                  type="submit"
                  className="d-flex justify-content-center">
                  Register
                  {loading && (
                    <ReactLoading
                      type="bubbles"
                      color="#07AC86"
                      height={30}
                      width={30}
                    />
                  )}
                </Button>
                {error && (
                  <div className="text-danger text-center">
                    <small>
                      <ErrorMessageHandler status={error.status} />
                    </small>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = ({ app: { loading, error } }) => {
  return {
    loading: loading[GET_TOKEN],
    error: error[GET_TOKEN],
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    registerPelajar:registerPelajar,
    registerPengajar:registerPengajar,
  },dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

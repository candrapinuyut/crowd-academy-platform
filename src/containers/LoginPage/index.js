/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactLoading from 'react-loading';
import { useForm } from 'react-hook-form';
import { getToken } from '../App/action';
import { getToken as getAdminToken } from '../App/adminAction';
import { GET_TOKEN } from '../App/constants';
import ErrorMessageHandler from '../../components/ErrorMessageHandler';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import ReactAvatar from 'react-avatar';
import {GroupText,GroupContainer} from '../../components/styled/Group'


function LoginPage({ getToken,getAdminToken, loading, error,level }) {
  const { register,setValue,errors, handleSubmit } = useForm();

  const [errorLogin,setErrorLogin] = useState(false);

 const onSubmit = (data) =>{
   //alert(123)
   console.log(data)
   if(data.levels==0)
    getToken(data)
   else
    getAdminToken(data).then((f)=>{
      if(f.type=='GET_TOKEN_ADMIN_FAIL')
      setErrorLogin(true)
    })
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
    <Container className="h-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <div className="text-center mb-3">
                <img style={{ width:90 }} alt="grosirbox" src={'/logo.jpg'} />
              </div>
              <Card.Title className="text-center text-primary font-weight-bold">
                Login To Application
              </Card.Title>
              <Form onSubmit={handleSubmit((data)=>onSubmit(data,true))}>
                <Col>
                   <Form.Group>
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
                        ref={register()}
                        onChange={(e)=>setValue('levels',e.value)}
                      />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                          <Form.Control
                            size="lg"
                            disabled={loading}
                            type="text"
                            name="username"
                            ref={register}
                            placeholder="Your Email"
                          />
                        </Form.Group></Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      size="lg"
                      disabled={loading}
                      type="password"
                      name="password"
                      ref={register}
                      placeholder="Your Password"
                    />
                  </Form.Group>

                </Col>


               <Col>
                 {errorLogin && (
                   <div className="text-danger mb-3">
                     <small>
                      Mohon Maaf Username dan Password tidak Sesuai
                     </small>
                   </div>
                 )}
                 <small>
                   <Row>
                     <Col>
                       <Form.Label className="d-flex">
                         <Form.Check />
                         Remember me
                       </Form.Label>
                       <Form.Label className="d-flex">
                         <Form.Check />
                         Show password
                       </Form.Label>
                     </Col>
                     <Col className="text-right">
                       <Button
                         variant="link"
                         block
                         className="text-right"
                         size="sm">
                         Forgot Password
                       </Button>
                     </Col>
                   </Row>
                 </small>
               </Col>

                <p />
              <Col>
                <Button
                  variant="outline-primary"
                  disabled={loading}
                  size="lg"
                  block
                  type="submit"
                  className="d-flex justify-content-center">
                  Login
                  {loading && (
                    <ReactLoading
                      type="bubbles"
                      color="#07AC86"
                      height={30}
                      width={30}
                    />
                  )}
                </Button>
                <div className='mt-3'></div>
                <center>
                  <strong>OR</strong>
                </center>

                <Button
                  variant="primary"
                  disabled={loading}
                  size="lg"
                  block
                  as={Link}
                  to="/register"
                  type="submit"
                  className="d-flex justify-content-center mt-3">
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

              </Col>

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
  bindActionCreators({ getToken,getAdminToken}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

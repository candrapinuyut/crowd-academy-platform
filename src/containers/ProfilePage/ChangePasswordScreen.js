import React,{useState,useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SetTitle from '../../components/SetTitle';
import ReactPaginate from 'react-paginate';
import SimpleLineIcons from 'react-simple-line-icons';
import { useForm } from 'react-hook-form';
import {updatePassword} from './action'
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  InputGroup,
  FormControl,
  Breadcrumb,
  Form,
  ListGroup
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {  useHistory } from 'react-router-dom';
import SidebarProfile from './SidebarProfile'

const Profile = ({changePassword}) =>{

  const {register,reset,getValues,setValue,handleSubmit,errors} = useForm();
  const history = useHistory();
  const [data,setData] = useState([]);

 const onSubmit = ( dataList , refresh=false )=>{
     console.log(dataList)

     if( dataList.new_password!=dataList.new_password2){
        toast.error('password konfirmasi tidak sama');
     }else{
       const data = {
         password:dataList.password,
         new_password:dataList.new_password,
       };
       changePassword(dataList).then((res)=>{
        console.log(res)
        if (res.type === `UPDATE_PASSWORD_SUCCESS`) {
          toast.success('Password Berhasil di ubah!');
          if (refresh) {
            history.push('/profile/change-password');
            reset();
          } else {
            window.location.reload(false);
            reset();
          }
        } else {

          const { message } = res.error.response.data;
          toast.error('password saat ini tidak sesuai...');
        }
      })
    }
 }
  return(
    <>
    <SetTitle>Change Password</SetTitle>
 
  <Container fluid className='mt-3'>
      <Breadcrumb>
        <Breadcrumb.Item href='/profile'>My Profile</Breadcrumb.Item>
        <Breadcrumb.Item active>Update Password</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
      <Col md={3}>
        <SidebarProfile isActive={'password'} />
      </Col>
      <Col md={9}>
        <Form noValidate onSubmit={handleSubmit((data)=>onSubmit(data,true))}>
          <Container>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group>
                          <Form.Label>
                             Current Passwrod <span className="text-danger">*</span>
                          </Form.Label>
                          <FormControl name='password'
                          type='password'
                          isInvalid={errors.name}  ref={register({ required: true })} placeholder='enter new password'/>
                          <div className="invalid-feedback">
                            This field is required
                          </div>
                     </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                          <Form.Label>
                            New Password <span className="text-danger">*</span>
                          </Form.Label>
                          <FormControl type='password' isInvalid={errors.new_password} name='new_password' ref={register({ required: true })}
                            placeholder='enter new password'/>
                          <div className="invalid-feedback">
                            This field is required
                          </div>
                     </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                          <Form.Label>
                            New Password Confirmation <span className="text-danger">*</span>
                          </Form.Label>
                          <FormControl  type='password' isInvalid={errors.new_password2} name='new_password2' ref={register({ required: true })}
                            placeholder='enter password Confirmation'/>
                          <div className="invalid-feedback">
                            This field is required
                          </div>
                     </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <div className='d-flex justify-content-end'>
                       <Button variant='success' onClick={handleSubmit((data)=>onSubmit(data,true))}>Simpan</Button>
                    </div>
                  </Col>

                </Row>




              </Card.Body>
            </Card>
          </Container>
          </Form>

        </Col>
      </Row>
    </Container>
    </>
  )

}


const mapDispatchToProps = (dispatch)=>
  bindActionCreators({
     changePassword:updatePassword,
   },dispatch)



export default connect(null,mapDispatchToProps)(Profile);

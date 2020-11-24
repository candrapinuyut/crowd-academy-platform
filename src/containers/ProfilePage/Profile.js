import React,{useState,useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SetTitle from '../../components/SetTitle';
import ReactPaginate from 'react-paginate';
import SimpleLineIcons from 'react-simple-line-icons';
import { useForm } from 'react-hook-form';
import {updateProfile,getProfile} from './action'
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

const Profile = ({updateMyProfile,myProfile}) =>{

  const {register,reset,getValues,setValue,handleSubmit,errors} = useForm();
  const history = useHistory();
  const [data,setData] = useState([]);


  useEffect(()=>{
    myProfile().then((f)=>{
        if(f.type=='GET_PROFILE_SUCCESS'){
          const {rows} = f.payload.data;
          setData(rows);
          }
    });
  },[]);

 const onSubmit = ( dataList , refresh=false )=>{
     console.log(dataList)
     updateMyProfile(dataList).then((res)=>{
      if (res.type === `UPDATE_PROFILE_SUCCESS`) {
        toast.success('Profile Berhasil dibuat!');
        if (refresh) {
          history.push('/profile');
        } else {
          window.location.reload(false);
          reset();
        }
      } else {
        toast.error('Terjadi kesalahan..!');
      }
    })
 }
  return(
    <>
    <SetTitle>Profile Page</SetTitle>
 
  <Container fluid className='mt-3'>
      <Breadcrumb>
        <Breadcrumb.Item>My Profile</Breadcrumb.Item>
      <Breadcrumb.Item active>Update</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
      <Col md={3}>
        <SidebarProfile isActive={'profile'} />
      </Col>

      <Col md={9}>
        <Form noValidate onSubmit={handleSubmit((data)=>onSubmit(data,true))}>
          <Container>
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={6}>
                    <Form.Group>
                          <Form.Label>
                             Name <span className="text-danger">*</span>
                          </Form.Label>
                          <FormControl name='name'
                          defaultValue={data ? data.name:null}
                          isInvalid={errors.name}  ref={register({ required: true })} placeholder='enter your name'/>
                          <div className="invalid-feedback">
                            This field is required
                          </div>
                     </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                          <Form.Label>
                            Email  <span className="text-danger">*</span>
                          </Form.Label>
                          <FormControl defaultValue={data ? data.email:null} isInvalid={errors.link} name='email' ref={register({ required: true })}
                            placeholder='enter  email'/>
                          <div className="invalid-feedback">
                            This field is required
                          </div>
                     </Form.Group>
                  </Col>


                  <Col sm={12}>
                    <div className='d-flex justify-content-end'>
                      <Button variant='danger' as={Link} to="/profile" style={{marginRight:10}}>Cancel</Button>
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
    myProfile:getProfile,
    updateMyProfile:updateProfile,
  },dispatch)



export default connect(null,mapDispatchToProps)(Profile);

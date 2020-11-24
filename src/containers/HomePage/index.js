import React,{useState,useEffect} from 'react';
import { Container,Table,Button, Row, Col, Card } from 'react-bootstrap';
import SetTitle from '../../components/SetTitle'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import TwoLineLoader from '../../components/TwoLineLoader';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {getKelas} from '../KelasPage/actions';

const HomePage = ({getKelas}) =>{

    const[dataKelas,setDataKelas] = useState([]);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
      getKelas({limit:4,offset:0}).then((e)=>{
          const {data} = e.payload;
          setDataKelas(data);
          setLoading(false)
      })
    },[])


    return(
      <>
        <SetTitle>Dashobard Kelas</SetTitle>
        <hr/>
        <Container fluid>

        <Row>
          <Col md={12} className='mb-4'>
            <Card>
               <Card.Body>
                 <Card.Title>Kelas Populer</Card.Title>
               <Row>

                {
                  dataKelas && loading==false && (
                    dataKelas.map((a,b)=>(
                      <Col md={3} className='mb-4 d-flex'>
                        <Card>
                          <img className="card-img-top" height='180' src={a.image} alt="Card image cap"/>
                          <Card.Body>
                            <div className='d-flex flex-column'>
                              <strong>{a.judul}</strong>
                              <div className='d-flex flex-row mt-4'>
                                <img className='rounded-circle' width={50} src="https://imgix2.ruangguru.com/assets/miscellaneous/image_hysvry_8097.jpg" alt=""/>
                                <div className='d-flex flex-column'>
                                  <strong>{a.authors.nama}</strong>
                                <span className='text-muted small'>{a.authors.alamat}</span>
                                </div>
                              </div>
                            </div>
                             <Button as={Link}  to={`/kelas/detail/${a._id}`} variant='outline-primary' className='btn-sm float-right'>Detail</Button>
                          </Card.Body>
                          </Card>
                        </Col>
                    ))
                  )
                }


               </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12} className='mb-4'>
            <Card>
               <Card.Body>
                 <Card.Title>Trainer Populer</Card.Title>

                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with de</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12} className='mb-4'>
            <Card>
               <Card.Body>
                 <Card.Title>Pelajar Populer</Card.Title>

                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with de</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        </Container>
      </>
    )

}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getKelas:getKelas,
  },dispatch)
export default connect(null,mapDispatchToProps)(HomePage);

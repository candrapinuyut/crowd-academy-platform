import React,{useState,useEffect} from 'react';
import { Container,Table,Button, Row, Col, Card } from 'react-bootstrap';
import SetTitle from '../../components/SetTitle'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import TwoLineLoader from '../../components/TwoLineLoader';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {showKelas} from './actions.js';

const KelasDetailScreen = ({match,showKelas}) =>{

    const [loading,setLoading]=useState(0);
    const [dataList,setDataList] = useState([]);
    const [loding,setLoding] = useState(true);

    useEffect(()=>{
       showKelas(match.params.id).then((e)=>{
        //alert(123)
         setLoding(false);
         setDataList(e.payload.data);
      });

    },[]);

    return(
      <>
        <SetTitle>Data Kelas</SetTitle>
        <hr/>
        <Container fluid>

          {
          !dataList && loding && (
              <Card>
               <Card.Body>{
                   (
                     Array.from({ length: 4 }, (a, ak) => (
                       <tr key={ak}>
                         {Array.from({ length: 6 }, (b, bk) => (
                           <td key={bk}>
                             <TwoLineLoader />
                           </td>
                         ))}
                         <td> </td>
                       </tr>
                     ))
                   )
                 }
               </Card.Body>
             </Card>
            ) || (

            <>
              <Row>
                <Col md={12} className='mb-4'>
                  <Card>
                     <Card.Body>
                      <strong className='card-title'>{dataList.judul}</strong>
                      <Row>
                        <Col md={12} className='d-flex justify-content-end'>
                          <Button variant='primary'>Daftar Kelas</Button>
                        </Col>
                      </Row>
                      <Row className='mt-4'>
                        <Col md={6} className='d-flex flex-row justify-content-between'>
                          <div className="d-flex flex-column">
                            <span>Rating</span>
                            <span>

                              <i className="fa fa-star" style={{color:'gold'}}></i>
                              <i className="fa fa-star" style={{color:'gold'}}></i>
                              <i className="fa fa-star" style={{color:'gold'}}></i>
                              <i className="fa fa-star" style={{color:'gold'}}></i>
                              <i className="fa fa-star"></i>

                              501031230(Training)</span>
                          </div>
                          <div className="d-flex flex-column">
                            <span>Kategori</span>
                            <span>Bisnis & Keuangan,Programmer,</span>
                          </div>
                        </Col>
                        <Col md={6} className='d-flex justify-content-end'>
                          <img width='200px' src={dataList.image} alt=""/>
                        </Col>

                      </Row>


                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12} className='mb-4'>
                  <Card>
                     <Card.Body>
                       <Card.Title>Deskripsi</Card.Title>

                     <p>{dataList.deskripsi}</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12} className='mb-4'>
                  <Card>
                     <Card.Body>
                      <Card.Title>Topik yang dibahas</Card.Title>
                      <Table hover responsive striped>
                      <thead>
                        <tr>
                           <th>Course Introduction</th>
                           <th>Durasi </th>
                         </tr>
                      </thead>
                      <tbody>
                        {
                          dataList && dataList.topics &&
                          dataList.topics.map((e,f)=>(
                            <tr>
                              <td>{e.judul} Jam</td>
                              <td>{e.waktu} Jam</td>
                            </tr>
                          ))
                        }


                      </tbody>
                      </Table>

                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12} className='mb-4'>
                  <Card>
                     <Card.Body>
                      <Card.Title>Ulasan User</Card.Title>


                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
            )
          }

        </Container>
      </>
    )

}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    showKelas:showKelas,
   },dispatch)
export default connect(null,mapDispatchToProps)(KelasDetailScreen);

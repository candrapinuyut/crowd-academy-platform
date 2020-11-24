import React,{useState,useEffect} from 'react';
import { Container,Table,Button, Row, Col, Card } from 'react-bootstrap';
import SetTitle from '../../components/SetTitle'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import TwoLineLoader from '../../components/TwoLineLoader';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {showKelas,registerKelas,showEnrol} from './actions.js';
import Kategori from '../KelasPage/Models';

const KelasDetailScreen = ({app,registerKelas,history,match,showKelas,showEnrol}) =>{

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
    const daftarKelas=(id)=>{
      showEnrol(id).then((e) => {
          const {data} = e.payload;
           registerKelas({idenrol:data[0]._id}).then((f)=>{
              if(f.type=="REGISTER_KELAS_FAIL"){
                alert('anda telah melakukan registrasi terhadap kelas ini.')
                history.push('/kelas/follow')
              }
              else
              history.push('/kelas/follow')
          })
      })

      //history.push('/kelas/otw/'+id);
    }
    return(
      <>
        <SetTitle>Detail Kelas</SetTitle>
        <hr/>
        <Container fluid>
        {
          loding==false && dataList && dataList.judul && (
            <>
              <Row>
                <Col md={12} className='mb-4'>
                  <Card>
                     <Card.Body>
                      <strong className='card-title'>{dataList.judul}</strong>
                      <Row>
                        {
                          app.role==0 && (
                            <Col md={12} className='d-flex justify-content-end'>
                              <Button onClick={()=>daftarKelas(dataList._id)} variant='primary'>Daftar Kelas</Button>
                            </Col>
                          )
                        }

                      </Row>
                      <Row className='mt-4'>
                        <Col md={6} className='d-flex flex-row justify-content-between'>
                          <div className="d-flex flex-column">
                            <span className='text-muted small'>Rating</span>
                            <span>

                              <i className="fa fa-star" style={{color:'gold'}}></i>
                              <i className="fa fa-star" style={{color:'gold'}}></i>
                              <i className="fa fa-star" style={{color:'gold'}}></i>
                              <i className="fa fa-star" style={{color:'gold'}}></i>
                              <i className="fa fa-star"></i>

                            60(Ratings)</span>
                          </div>
                          <div className="d-flex flex-column">
                            <span className='text-muted small'>Kategori</span>
                            <span>{Kategori(dataList.kategori)}</span>
                          </div>
                          <div className="d-flex flex-column">
                            <span className='text-muted small'>Pengajar</span>
                            <span>{dataList.authors.alamat}</span>
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

                     <p className='card-text text-muted'>{dataList.deskripsi}</p>
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
                              <td>{e.durasi} Jam</td>
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
          )||(
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
          )
        }


        </Container>
      </>
    )

}

const mapStateToProps = ({app}) =>({
  app:app,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    showKelas:showKelas,
    registerKelas:registerKelas,
    showEnrol:showEnrol,
   },dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(KelasDetailScreen);

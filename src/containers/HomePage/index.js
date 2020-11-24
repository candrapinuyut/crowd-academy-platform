import React,{useState,useEffect} from 'react';
import { Container,Table,Button, Row, Col, Card } from 'react-bootstrap';
import SetTitle from '../../components/SetTitle'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import TwoLineLoader from '../../components/TwoLineLoader';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {getKelas} from '../KelasPage/actions';
import {getArtikel} from '../ArtikelPage/actions';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';

const HomePage = ({getKelas,getArtikel}) =>{

    const[dataKelas,setDataKelas] = useState([]);
    const[dataBerita,setDataBerita] = useState([]);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
      getKelas({limit:4,offset:0}).then((e)=>{
          const {data} = e.payload;
          setDataKelas(data);
          setLoading(false)
      })
      getArtikel().then((e)=>{
          setDataBerita(e.payload.data);
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
                                <div
                                  className='mr-3'
                                  style={{fontWeight:'bold',color:'#FFF',width:50,backgroundColor:'#19B5FE',
                                    height:50,borderRadius:'50%',display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                                  {
                                    a.authors.nama.split(' ').map((e,f)=>(
                                      <div>{e.substr(0,1).toUpperCase()}</div>
                                    ))
                                  }
                                </div>
                                <div className='d-flex flex-column'>
                                  <span className='small text-muted'>Pengajar</span>
                                  <strong>{a.authors.nama}</strong>
                                <span className='text-muted small'>{a.authors.alamat}</span>
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                          <Card.Footer>
                            <Button as={Link}  to={`/kelas/detail/${a._id}`}  className='btn-sm float-right'>Detail</Button>

                          </Card.Footer>
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
                 <Card.Title>Berita Terbaru</Card.Title>
               <Row>

               {

                 loading==false && dataBerita && (

                   dataBerita.map((a,b)=>(
                     <Col md={6} className='d-flex'>
                       <div className="card mb-3">
                         <div className="card-horizontal">
                             <div class="img-square" style={{overflow: 'hidden',height:200}}>
                               <img className="lazyload" width="100%"  src={a.gambar} alt="Card image cap"/>
                             </div>
                             <div className="card-body">
                                 <div className="card-title">
                                   <strong style={{fontSize: 16}}>{a.judul}</strong>
                                   <br />
                                 <span className="text-muted small">Diposting pada :
                                 {moment(a.tanggal).format('DD-MM-YYYY')}
                                  </span>
                                 </div>
                                 <p className="small card-text ">
                                   {ReactHtmlParser(a.deskripsi.substr(0,250))}
                                 </p>
                                 <Button as={Link} to={`/artikel/detail/${a._id}`} className='mb-3 float-right btn-sm'>Detail</Button>

                             </div>
                         </div>
                       </div>
                     </Col>

                   ))
                 )

               }
               </Row>


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
    getArtikel:getArtikel,
  },dispatch)
export default connect(null,mapDispatchToProps)(HomePage);

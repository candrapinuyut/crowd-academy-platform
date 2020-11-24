import React,{useState,useEffect} from 'react';
import { Container,Table,Button, Row, Col, Card } from 'react-bootstrap';
import SetTitle from '../../components/SetTitle'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import TwoLineLoader from '../../components/TwoLineLoader';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {showKelasEnrol,doneKelas} from './actions.js';

const KelasOtwScreen = ({match,history,doneKelas,showKelasEnrol}) =>{

    const [loading,setLoading]=useState(0);
    const [dataList,setDataList] = useState([]);
    const [loding,setLoding] = useState(true);

    useEffect(()=>{
       showKelasEnrol(match.params.id).then((e)=>{
        //alert(123)
         setLoding(false);
         setDataList(e.payload.data);

      });

    },[]);
    const [playNow,setPlayNow] = useState(null);

    const play = (med) =>{
       setPlayNow(med);
    }
    const selesai=(e)=>{
        doneKelas({
          idEnrolkelas:e
        }).then((e)=>{
        console.log(e)
        history.push('/kelas/done')
        })
    }

    return(
      <>
        <SetTitle>Detail Kelas</SetTitle>
        <hr/>
        <Container fluid>

          {
            dataList && dataList.kelas && dataList.kelas._id && loding==false && (
              <>
                <Row>
                  <Col md={12} className='mb-4'>
                    <Card>
                       <Card.Body>
                        <strong className='card-title'>{dataList.kelas.judul}</strong>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md={8} className='mb-4'>
                    <Card>
                       <Card.Body>
                         {playNow==null && (
                           <div onClick={()=>play(dataList.kelas.topics[0].media)} className='d-flex justify-content-center align-items-center' style={{cursor:'pointer',color:"#FFF",backgroundColor:'#000',width:'100%',height:'500px'}}>
                                <h1><i className="fa fa-play"></i></h1>
                           </div>
                         )||(
                           <iframe width="100%" height="500"
                              src={playNow}>
                            </iframe>
                         )}

                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4} className='mb-4'>
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
                            dataList.kelas && dataList.kelas.topics &&
                            dataList.kelas.topics.map((e,f)=>(
                              <tr onClick={()=>play(e.media)}>
                                <td>{e.judul} Jam</td>
                                <td>{e.durasi} Jam</td>
                              </tr>
                            ))
                          }
                        </tbody>
                        </Table>
                        <div className="float-right">
                          <Button onClick={()=>selesai(dataList._id)} variant='outline-primary'>Selesaikan Pelatihan</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className='mb-4'>
                    <Card>
                       <Card.Body>
                         <Card.Title>Deskripsi</Card.Title>

                       <p>{dataList.kelas.deskripsi}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </>
            ) || (

            <>
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


            </>
            )
          }

        </Container>
      </>
    )

}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    showKelasEnrol:showKelasEnrol,
    doneKelas:doneKelas,
   },dispatch)
export default connect(null,mapDispatchToProps)(KelasOtwScreen);

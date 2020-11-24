import React,{useState,useEffect} from 'react';
import { Container,Table,Button, Row, Col, Card } from 'react-bootstrap';
import SetTitle from '../../components/SetTitle'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import TwoLineLoader from '../../components/TwoLineLoader';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {getMyArtikel,deleteArtikel} from './actions';
import moment from 'moment'

const ArtikeManajemenScreen = ({getArtikel,deleteArtikel}) =>{
    const [loading,setLoading]=useState(0);
    const [data,setData] = useState([]);
    const [loding,setLoding] = useState(true);

    useEffect(()=>{
      getArtikel().then((e)=>{
        console.log()
          setData(e.payload.data)
          setLoding(false);
      })
    },[])
    const BtnDelete = (id) =>{
      deleteArtikel(id).then((e)=>{
        document.location.reload()``
      })
    }
    return(
      <>
        <SetTitle>Dashobard Kelas</SetTitle>
        <hr/>
        <Container fluid>

        <Row>
          <Col md={12}>
            <div className="d-flex flex-row justify-content-end">
              <Button as={Link} to='/manajemen-artikel/insert' variant='primary'>Tambah</Button>
            </div>
            {
            data && loding==false &&
            (
              <Card className='mt-4'>
                <Card.Body>
                  <Table hover sm  responsive>
                          <thead>
                            <tr>
                               <th width={10}>#</th>
                               <th>Tanggal</th>
                               <th>Judul</th>
                               <th> </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              data.length > 0 && (
                                data.map((e,f)=>(
                                  <tr>
                                    <td>{f+1}</td>
                                    <td>{moment(e.tanggal).format('DD-MM-YYYY')}</td>
                                    <td>{e.judul}</td>
                                  <td align='right'>

                                     <Button as={Link} to={`/manajemen-artikel/edit/${e._id}`} className='btn btn-sm mr-2' variant='outline-primary'><i className="fa fa-pencil"></i></Button>

                                      <Button onClick={()=>BtnDelete(e._id)} className='btn btn-sm' variant='outline-danger'><i className="fa fa-trash"></i></Button>
                                    </td>
                                  </tr>
                                ))
                              ) || (
                                <tr>
                                  <td colSpan={5} align='center'>Mohon Maaf Belum ada data</td>
                                </tr>
                              )
                            }
                          </tbody>
                  </Table>
                </Card.Body>
              </Card>
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

           </Col>
        </Row>

        </Container>
      </>
    )

}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getArtikel:getMyArtikel,
    deleteArtikel:deleteArtikel,
   },dispatch)
export default connect(null,mapDispatchToProps)(ArtikeManajemenScreen);

import React,{useState,useEffect} from 'react';
import { Container,Table,Button, Row, Col, Card } from 'react-bootstrap';
import SetTitle from '../../components/SetTitle'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import TwoLineLoader from '../../components/TwoLineLoader';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {getArtikel} from './actions';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';

const ArtikelPage = ({getArtikel}) =>{
    const [loading,setLoading]=useState(true);
    const [data,setData] = useState([]);
    useEffect(()=>{

      getArtikel().then((r)=>{
          setData(r.payload.data);
          setLoading(false)
      });
    },[])
    return(
      <>
        <SetTitle>Daftar Aritkel</SetTitle>
        <hr/>
        <Container fluid>

        <Row>
          {
            loading==false && data && (

              data.map((a,b)=>(
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

            ) || (
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


        </Row>

        </Container>
      </>
    )

}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getArtikel:getArtikel,

  },dispatch)
export default connect(null,mapDispatchToProps)(ArtikelPage);

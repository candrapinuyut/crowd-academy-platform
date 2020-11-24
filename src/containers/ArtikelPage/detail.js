import React,{useState,useEffect} from 'react';
import { Container,Table,Button, Row, Col, Card } from 'react-bootstrap';
import SetTitle from '../../components/SetTitle'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import TwoLineLoader from '../../components/TwoLineLoader';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {showArtikel} from './actions';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
 
const Detail = ({match,showArtikel}) =>{
  const [loading,setLoading]=useState(true);
  const [data,setData] = useState([]);
  useEffect(()=>{

    showArtikel(match.params.id).then((r)=>{
        //console.log
        setData(r.payload.data);
        setLoading(false);
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
              <Col md={12}>
                <div className="card mb-3">
                  <div className="card-horizontal">
                      <div class="img-square" style={{overflow: 'hidden',maxHeight:500}}>
                        <center>
                          <img className="lazyload" height="500"  src={data.gambar} alt="Card image cap"/>

                        </center>
                      </div>
                      <div className="card-body">
                          <div className="card-title">
                            <strong style={{fontSize: 16}}>{data.judul}</strong>
                            <br />
                          <span className="text-muted small">Diposting pada : {moment(data.tanggal).format('DD-MM-YYYY')}}</span>
                          </div>
                          <p className="small card-text">
                          {ReactHtmlParser(data.deskripsi)}
                          </p>
                      </div>
                  </div>
                </div>
              </Col>
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
    showArtikel:showArtikel,
    },dispatch)
export default connect(null,mapDispatchToProps)(Detail);

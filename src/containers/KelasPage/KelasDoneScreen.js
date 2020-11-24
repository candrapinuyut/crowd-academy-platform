import React,{useState,useEffect} from 'react';
import { Container,Form,Button, Row, Col, Card } from 'react-bootstrap';
import SetTitle from '../../components/SetTitle'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import TwoLineLoader from '../../components/TwoLineLoader';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SimpleLineIcons from 'react-simple-line-icons';
import Select from 'react-select';
import ReactAvatar from 'react-avatar';
import {GroupText,GroupContainer} from '../../components/styled/Group'
import {getKelasDone} from './actions.js';

const KelasDoneScreen = ({getKelasDone}) =>{

  const [dataList,setDataList] = useState([]);
  const [loding,setLoding] = useState(true);

  useEffect(()=>{
    getKelasDone().then((e)=>{
       setLoding(false);
       console.log(e)
       if(e.payload.data.length){
         setDataList(e.payload.data);
       }
       else
       console.log('tida ada')
     })
  },[])
  const formatGroupLabel = (data) => (
    <GroupContainer>
      <ReactAvatar
        src={data.image_url}
        size={50}
        name={data.label}
        round
        className="mr-3"
      />
      <GroupText>{data.label}</GroupText>
    </GroupContainer>
  );

  const SingleValue = (data) => (
    <div>
      <ReactAvatar
        src={data.image_url}
        size={30}
        name={data.label}
        className="mr-3"
      />
      <small>{data.label}</small>
    </div>
  );

    const [loading,setLoading]=useState(0)
    const {register,getValues,setValue,errors,handleSubmit} = useForm();
    const [data,setData] = useState([]);
    const [kategori,setKategori]=useState([
        {label:'Teknologi',value:0},
        {label:'Bisnis & Keuangan',value:1},
        {label:'Pemasaran',value:2},
        {label:'Pengembangan Diri',value:3},
    ]);
    const onSubmit = (data) =>{
    }


    return(
      <>
        <SetTitle>Semua Kelas yang di ikuti</SetTitle>
        <hr/>
        <Container fluid>

        <Row>
          {
            dataList && dataList.length>0 && loding==false && (

            dataList.map((a,b)=>
               (
                    <Col key={a} md={3} className='mb-4'>
                      <Card>
                        <img className="card-img-top" height='180' src={a.idEnrolkelas.kelas.image} alt="Card image cap"/>
                        <Card.Body>
                          <div className='d-flex flex-column'>
                            <strong>{a.idEnrolkelas.kelas.judul}</strong>
                            <div className='d-flex flex-row mt-4'>
                              <img className='rounded-circle' width={50} src="https://imgix2.ruangguru.com/assets/miscellaneous/image_hysvry_8097.jpg" alt=""/>
                              <div className='d-flex flex-column'>
                                <strong>{a.idEnrolkelas.kelas.authors.nama}</strong>
                              <span className='text-muted small'>{a.idEnrolkelas.kelas.authors.alamat}</span>
                              </div>
                            </div>
                          </div>
                           <Button as={Link}  to={`/kelas/otw/${a.idEnrolkelas._id}`}variant='primary' className='btn-sm float-right'>Detail</Button>
                        </Card.Body>
                      </Card>
                    </Col>
              )
            )

          ) || (
               <Col md={12}>
                <Card>
                   <Card.Body>
                     <div className='d-flex  flex-column align-items-center justify-content-center'>
                       <img width={500} src="https://image.freepik.com/free-vector/classroom-concept-illustration_114360-2975.jpg" alt=""/>
                     <span class='text-muted mt-3'>Mohon Maaf, Anda Belum Menyelesaikan Kelas..</span>
                     </div>
                  </Card.Body>
                </Card>
              </Col>

          )
         }

        </Row>

        </Container>
      </>
    )

}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getKelasDone:getKelasDone,
  },dispatch)
export default connect(null,mapDispatchToProps)(KelasDoneScreen);

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
import {getKelas} from './actions.js';

const KelasPage = ({getKelas}) =>{

  const [dataList,setDataList] = useState([]);
  const [loding,setLoding] = useState(true);
  const {register,getValues,setValue,handleSubmit,errors} = useForm();

  useEffect(()=>{
    register('kategori');setValue('kategori',0)

    getKelas().then((e)=>{
       setLoding(false);
       setDataList(e.payload.data);
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
     const [data,setData] = useState([]);
    const [kategori,setKategori]=useState([
        {label:'Teknologi',value:1},
        {label:'Bisnis & Keuangan',value:2},
        {label:'Pemasaran',value:3},
        {label:'Pengembangan Diri',value:4},
    ]);
    const onSubmit = (data) =>{
      setLoding(true);
      setData([]);

      console.log(data)
      let cari = {
        kategori:data.kategori,
        judul:data.judul,
      }
      getKelas(cari).then((e)=>{
        setLoding(false);
        setDataList(e.payload.data);
      })

    }


    return(
      <>
        <SetTitle>Semua Kelas</SetTitle>
        <hr/>
        <Container fluid>
        <Form noValidate onSubmit={handleSubmit((data)=>onSubmit(data))}>
             <Row>

               <Col sm={3}>
                         <Form.Group>
                           <Form.Label>Kategori</Form.Label>
                           <Form.Control
                             as={Select}
                             styles={{
                               container: () => ({
                                 padding: 0,
                               }),
                               control: () => ({
                                 border: 0,
                                 display: 'flex',
                                 justifyContent: 'flex-between',
                               }),
                             }}
                             options={kategori}
                              isClearable={true}
                             placeholder="kategori"
                             name='kategori'
                             ref={register()}
                             formatGroupLabel={formatGroupLabel}
                             formatOptionLabel={SingleValue}
                             onChange={(e)=>{
                               if(e)
                               setValue('kategori',e.value)
                               else
                               setValue('kategori',null)
                             }}

                             isInvalid={errors.kategori}
                           />
                           <div className="invalid-feedback">
                             This field is required
                           </div>
                        </Form.Group>
                       </Col>
               <Col sm={6}>
                  <Form.Group controlId="formBasicEmail">
                     <Form.Label>Cari Kelas </Form.Label>
                   <Form.Control type="text" name='judul' ref={register()}   placeholder="masukan kata yang ingin anda cari.." />
                     </Form.Group>
                </Col>

               <Col sm={1}>
                    <Form.Group controlId="formBasicEmail">
                     <Form.Label>&nbsp; &nbsp;</Form.Label>
                   <Button style={{display: 'flex', flexDirection: 'row'}} onClick={handleSubmit((data)=>onSubmit(data))} variant="primary" type="submit">
                       <SimpleLineIcons name="magnifier" style={{marginRight: 10, marginTop: 2}} /> Search
                     </Button>
                   </Form.Group>
               </Col>
             </Row>
             </Form>
        <Row>
          {
            loding==true && (
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
              dataList && dataList.length>0  && (

                dataList.map((a,b)=>
                   (
                        <Col key={b} md={3} className='mb-4 d-flex'>
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
                               <Button as={Link}  to={`/kelas/detail/${a._id}`}variant='primary' className='btn-sm float-right'>Detail</Button>
                            </Card.Body>
                          </Card>
                        </Col>
                  )
                )

              ) || (
                   <Col sm={12}>
                    <Card>
                      <Card.Body>
                        <Card.Text>
                          Mohon Maaf Data yang ada cari tida ada
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
               )


            )
          }


        </Row>

        </Container>
      </>
    )

}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getKelas:getKelas,
  },dispatch)
export default connect(null,mapDispatchToProps)(KelasPage);

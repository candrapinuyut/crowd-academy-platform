import React,{useState,useEffect} from 'react';
import { Container,Table,FormControl,Button, Modal,Row, Form,Col, Card } from 'react-bootstrap';
import SetTitle from '../../../components/SetTitle'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import TwoLineLoader from '../../../components/TwoLineLoader';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {storeKelas,uploadImage} from '../actions';
import { useForm } from 'react-hook-form';
import SimpleLineIcons from 'react-simple-line-icons';
import {GroupText,GroupContainer} from '../../../components/styled/Group'
import ReactAvatar from 'react-avatar';
import Select from 'react-select';

const KelasInsertScreen = ({history,uploadImage,storeKelas}) =>{
    const [loading,setLoading]=useState(0);
    const [data,setData] = useState([]);
    const [loding,setLoding] = useState(true);
    const {register,getValues,setValue,handleSubmit,errors} = useForm();

    const [image,setImage] = useState(null);
    const [imageLoadingUpload,setImageLoadingUpload] = useState(false);

    const [kategori,setKategori]=useState([
      {label:'Teknologi',value:1},
      {label:'Bisnis & Keuangan',value:2},
      {label:'Pemasaran',value:3},
      {label:'Pengembangan Diri',value:4},
    ]);

    const handleFileChange = (e) => {
      setImageLoadingUpload(true);
      const files = _.map(e.target.files, (file) =>{
          const formData = new FormData();
          formData.append('file',file);
          uploadImage(formData).then(function(f){
             if(f.type=="UPLOAD_SUCCESS"){
                onUploadSuccess(f.payload.data);
             }else alert('failed to upload images..');
             setImageLoadingUpload(false)
          })
      });
    };
    const onUploadSuccess = (res) => {
       setImage(res);
       console.log(res)
    };


    useEffect(()=>{
      register('topics'); setValue('topics',[]);
      register('kategori');setValue('kategori',0)

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
    const onSubmit = (data) =>{
      const kelasData = {
         "kategori": data.kategori,
         "jenis": 0,
         "judul": data.judul,
         "deskripsi":  data.deskripsi,
         "kapasitas":  data.kapasitas,
         "image":image.location,
         "topics":data.topics,
         };
         console.log(kelasData);
        storeKelas(kelasData).then((e)=>{
          history.push('/kelas/list')
        })
     }
     const handleShow = () => setShow(true);
     const handleClose  = () => setShow(false);
     const [show, setShow] = useState(false);
    const [dTopik,setDTopik]=useState([]);

    const [judult,setJudult]=useState([]);
    const [linkt,setLinkt]=useState([]);
    const [durasit,setDurasit]=useState([]);
    const addTopics=()=>{
         const n = {
           judul:judult,
           media:linkt,
           durasi:durasit,
         };
         let m = dTopik;
         m.push(n);
         setDTopik(m);
         handleClose();
    }
    useEffect(()=>{
      console.log(dTopik);
      setValue('topics',dTopik)
    },dTopik)
    return(
      <>
      <Modal show={show} className='modal-widget' onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
          </Modal.Title>
         </Modal.Header>
        <Modal.Body>
          <Col sm={12}>
             <Form.Group controlId="formBasicEmail">
                <Form.Label>Judul</Form.Label>
                  <Form.Control type="text" onChange={(e)=>setJudult(e.target.value)}  placeholder="Judul" />
              </Form.Group>
          </Col>
          <Col sm={12}>
             <Form.Group controlId="formBasicEmail">
                <Form.Label>Link Media</Form.Label>
              <Form.Control type="text" name='link'   onChange={(e)=>setLinkt(e.target.value)}  placeholder="link media" />
              </Form.Group>
          </Col>
          <Col sm={12}>
             <Form.Group controlId="formBasicEmail">
                <Form.Label>Durasi</Form.Label>
                <Form.Control type="text" name='durasi' onChange={(e)=>setDurasit(e.target.value)} placeholder="Durasi Vidio" />
              </Form.Group>
          </Col>
          <Col sm={12}>
             <Button onClick={()=>addTopics() } className='float-right'><i className="fa fa-save"></i> Tambah </Button>
          </Col>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="success" onClick={handleClose}>
            Save & Close
          </Button> */}
        </Modal.Footer>
      </Modal>

        <SetTitle>Tambah Kelas</SetTitle>
        <hr/>
        <Container fluid>

        <Row>
          <Col md={12}>

            <Card className='mt-4'>
              <Card.Body>
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

                      placeholder="kategori"
                      name='kategori'
                      ref={register()}
                      formatGroupLabel={formatGroupLabel}
                      formatOptionLabel={SingleValue}
                      onChange={(e)=>setValue('kategori',e.value)}
                      isInvalid={errors.subcategory_id}
                    />
                    <div className="invalid-feedback">
                      This field is required
                    </div>
                 </Form.Group>
                  </Col>
                  <Col sm={7}>
                 <Form.Group controlId="formBasicEmail">
                        <Form.Label>Judul</Form.Label>
                      <Form.Control type="text" name='judul' ref={register()}   placeholder="masukan tanggal surat" />
                      </Form.Group>
                   </Col>
                  <Col sm={2}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Kapasitas</Form.Label>
                      <Form.Control type="text" name='kapasitas' ref={register()} placeholder="Kapasitas Peserta" />
                      </Form.Group>
                   </Col>
                  <Col sm={12}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Deskripsi</Form.Label>
                      <Form.Control as='textarea' style={{height:200}} name='deskripsi' ref={register()} placeholder="Dekskripsi " />
                      </Form.Group>
                   </Col>
                   <Col sm={12}>
                     <strong>Silabus</strong>
                   </Col>
                  <Col sm={12}>
                    <Button onClick={()=>handleShow()} className='btn-sm float-right'><i className="fa fa-plus"></i></Button>
                    <Table hover responsive>
                            <thead>
                              <tr>
                                 <th>#</th>
                                 <th>Judul</th>
                                 <th>Link Media</th>
                                 <th>Durasi </th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                dTopik && (
                                  dTopik.map((a,b)=>(
                                    <tr>
                                      <td>{b+1}</td>
                                      <td>{a.judul}</td>
                                      <td>{a.media}</td>
                                      <td>{a.durasi}</td>
                                    </tr>
                                  ))
                                )
                              }
                            </tbody>
                    </Table>
                   </Col>
                  <Col sm={12} className='d-flex justify-content-start mt-5'>
                    <Form.Group>
                          {
                                 !imageLoadingUpload && image && (

                                  <Row>
                                     <img
                                      width={150}
                                      style={{marginBottom: 20}}
                                      src={image.location}
                                      rounded
                                    />
                                    </Row>

                              )

                          }
                          <Form.Label>
                            Upload Sampul <span className="text-danger">*</span>
                          </Form.Label>


                          {
                            imageLoadingUpload  && (
                            <center>

                            <img style={{width:100}} src='https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif' />
                            <br/>
                            <strong>Tunggu Sebentar</strong>
                            </center>

                            ) || (
                              <FormControl
                                onChange={handleFileChange}
                                accept=".png,.jpg,.jpeg,.gif"
                                type='file' placeholder='enter promotion banner description '/>

                            )
                          }
                     </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Button className='float-right' onClick={handleSubmit((data)=>onSubmit(data))} variant="outline-primary" type="submit">
                      <i className="fa fa-save"></i> Simpan
                    </Button>
                  </Col>
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
    storeKelas:storeKelas,
    uploadImage:uploadImage,
  },dispatch)
export default connect(null,mapDispatchToProps)(KelasInsertScreen);

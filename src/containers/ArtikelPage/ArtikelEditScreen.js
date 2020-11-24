import React,{useState,useEffect} from 'react';
import { Container,Table,FormControl,Button, Modal,Row, Form,Col, Card } from 'react-bootstrap';
import SetTitle from '../../components/SetTitle'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import TwoLineLoader from '../../components/TwoLineLoader';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {updateArtikel,showArtikel,uploadImage} from './actions';
import { useForm } from 'react-hook-form';
import SimpleLineIcons from 'react-simple-line-icons';
import {GroupText,GroupContainer} from '../../components/styled/Group'
import ReactAvatar from 'react-avatar';
import Select from 'react-select';
import moment from 'moment';

const ArtikelEditScreen = ({history,match,showArtikel,uploadImage,updateArtikel}) =>{
    const [loading,setLoading]=useState(0);
    const [data,setData] = useState([]);
    const [loding,setLoding] = useState(true);
    const {register,getValues,setValue,handleSubmit,errors} = useForm();

    const [image,setImage] = useState(null);
    const [imageLoadingUpload,setImageLoadingUpload] = useState(false);

    const [kategori,setKategori]=useState([
        {label:'Teknologi',value:0},
        {label:'Bisnis & Keuangan',value:1},
        {label:'Pemasaran',value:2},
        {label:'Pengembangan Diri',value:3},
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

       register('kategori');
       setValue('kategori',0)

       showArtikel(match.params.id).then((e)=>{
         const {data} = e.payload;
         setValue('judul',data.judul);
         setValue('deskripsi',data.deskripsi);
         setImage({location:data.gambar})
         setValue('kategori',data.kategori)
         setData(e.payload.data);
         setLoding(false)
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
    useEffect(()=>{
      console.log(data);
    })

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
      const artikelData = {
         "kategori": data.kategori,
         "judul": data.judul,
         "deskripsi":  data.deskripsi,
         "gambar":image.location,
         };
         const id = match.params.id;
         //sconsole.log(artikel)
         updateArtikel(id,artikelData).then((e)=>{
           console.log(e)
            history.push('/manajemen-artikel')
        })
     }


    return(
      <>


        <SetTitle>Edit Artikel</SetTitle>
        <hr/>
        <Container fluid>

        <Row>
          <Col md={12}>

            <Card className='mt-4'>
              <Card.Body>
                <Row>
                <Col sm={3}>
                  {
                  loding==false && data  && (
                      <Form.Group>
                        <Form.Label>Kategori </Form.Label>
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
                          defaultValue={kategori[data.kategori]}
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
                    )
                  }


                  </Col>
                  <Col sm={9}>
                 <Form.Group controlId="formBasicEmail">
                        <Form.Label>Judul</Form.Label>
                      <Form.Control type="text" name='judul'  ref={register()}   placeholder="masukan tanggal surat" />
                      </Form.Group>
                   </Col>

                  <Col sm={12}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Deskripsi</Form.Label>
                      <Form.Control   as='textarea' style={{height:400}} name='deskripsi' ref={register()} placeholder="Dekskripsi " />
                      </Form.Group>
                   </Col>


                  <Col sm={12} className='d-flex justify-content-end mt-3'>
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
                            Upload Gambar <span className="text-danger">*</span>
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
    showArtikel:showArtikel,
    updateArtikel:updateArtikel,
    uploadImage:uploadImage,
  },dispatch)
export default connect(null,mapDispatchToProps)(ArtikelEditScreen);

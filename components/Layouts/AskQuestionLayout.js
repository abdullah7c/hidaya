import React,{ useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, Spinner, InputGroup, Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import en from '/public/locales/en/common.json';
import ur from '/public/locales/ur/common.json';

import TextEditor from '../TextEditor';
import Recorder from '../Recorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const AskQuestionLayout = ({topics}) => {

    const router = useRouter();
    const lang = useSelector((state) => state.language.value);

    const [id, setId] = useState('')
    const [trans, setTrans] = useState({});
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [country, setCountry] = useState("");
    const [validated, setValidated] = useState(false);
    const [topicList, setTopicList] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [question , setQuestion] = useState("");
    const [image, setImage] = useState([]);
    const [imageList, setImageList] = useState([])
    const [audioBlobURL , setAudioBlobURL] = useState("");
    const [recording, setRecording] = useState();

    const [load, setLoad] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        lang=='en'?setTrans(en):setTrans(ur)
    }, [lang])
    useEffect(() => {
        console.log(topics)
        let tempTopicsList = [];
        topics.forEach((x)=>{
            x.children.forEach((y)=>{
                if(y.is_active){
                    tempTopicsList.push({...y, parentId:x.id})
                }
            })
        })
        setTopicList(tempTopicsList);
	}, [])
    
    const handleSubmit = async(event) => {
        setLoad(true);
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) { event.stopPropagation(); }
            setValidated(true);

            let data = JSON.stringify({
                description_en:JSON.stringify(question), description_ur:'', email:email, is_active:true, is_visible:true,
                name:name, q_city:city, q_country:country, title:title, title_en:title, topic_ur:'', topic:selectedTopic
            });

            if(form.checkValidity()){
            let responce = await axioRequest('questions/','application/json',data,'post')
            console.log(responce)
            setId(responce.data.id)
            if(imageList.length>0){
                let keys = Object.keys(imageList);
                let index = 0
                keys.forEach(async(key, index) => {
                    let form_data = new FormData();
                    form_data.append("question", responce.data.id);
                    form_data.append("type", "IMAGE");
                    form_data.append("order", index);
                    form_data.append("file", imageList[key]);
                    await axioRequest('attacehements/', 'multipart/form-data', form_data, 'post');
                    index = index+1
                })
            }
            if(recording){
                let forms_data = new FormData();
                forms_data.append("question", responce.data.id);
                forms_data.append("type", "AUDIO");
                forms_data.append("order", 0);
                forms_data.append("file", recording.blob);
                await axioRequest('attacehements/', 'multipart/form-data', forms_data, 'post');
            }
            
            if(responce.statusText=="Created"){
                handleShow()
            }
        }
        setLoad(false);

    }
    const axioRequest = async(endPoint, contentType, bodyData, methodType) => {
        let config = {
            method: methodType,
            url: 'https://api.askhidayah.com/api/v1/'+ endPoint,
            headers: { 'Content-Type': contentType },
            data : bodyData, };
        let responce
        await axios(config).then((res)=>{
            responce=res
        }).catch((error)=>{
            console.log(error);
        });
        return responce
    }
    const handleChange = (e) => {
        console.log(e.target.files);
        setImageList(e.target.files)
        let tempState = [...image];
        if(e.target.files.length !== 0){
            for(let i = 0; i<e.target.files.length; i++){
                tempState.push({name:e.target.files[i].name, file:URL.createObjectURL(e.target.files[i]), size:e.target.files[i].size, type:e.target.files[i].type});
            }
            console.log(tempState);
            setImage(tempState);
        }
    }

  return (
    <div className='ask-questions-styles arabic-bg'>
    <div className='py-1'>
    <Container className={`white-bar p-4 ${lang=='en'?'':'font-urdu'}`}>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
            <p className={lang=='en'?'ques-heading fade-in':'ques-heading-ur fade-out font-urdu ra f-30'}>{trans["Ask Questions"]}</p>
        </Row>
        <Row className={`mx-1 p-3 ${lang=='en'?'fade-in':'font-urdu ra fade-out'}`}>
            <Col md={{span:8, order:lang=='en'?1:3}} className='pt-5'>
                <Row>
                    <Col md={6}>
                        <Form.Group className='mb-5' controlId="validationCustom01">
                            <Form.Label className={`label-heading ${lang=='en'?'':' f-30'}`}>{trans["Full Name"]}</Form.Label><br/>
                            <input
                                className={`form-inp ${lang=='en'?'english':'urdu'}`}
                                required
                                type="text"
                                placeholder={trans["Full Name"]}
                                value={name} onChange={(e)=>setName(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a Name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className='mb-5' controlId="validationCustom02">
                            <Form.Label className={`label-heading ${lang=='en'?'':'f-30'}`}>{trans["Email Address"]}</Form.Label><br/>
                            <input
                                className={`form-inp ${lang=='en'?'english':'right-align urdu'}`}
                                required
                                type="email"
                                placeholder={trans["Email Address"]}
                                value={email} onChange={(e)=>setEmail(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Email.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className='mb-5' controlId="validationCustom03">
                            <Form.Label className={`label-heading ${lang=='en'?'':'f-30'}`} >{trans["Title"]}</Form.Label><br/>
                            <input 
                                className={`form-inp ${lang=='en'?'english':'right-align urdu'}`}
                                required
                                type="text" 
                                placeholder={trans["Title"]}
                                value={title} onChange={(e)=>setTitle(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className='mb-5' controlId="validationCustom04">
                            <Form.Label className={`label-heading ${lang=='en'?'':'f-30'}`} >{trans["Topics"]}</Form.Label><br/>
                            <select className={`form-inp ${lang=='en'?'':'right-align'}`} style={{color:'grey'}} required value={selectedTopic} onChange={(e)=>{e.target.value?setSelectedTopic(e.target.value):setSelectedTopic('')}}>
                                <option disabled value="">{trans["Select the topic"]}</option>
                                {topicList.map((topic, index)=>{    
                                    return(<option key={index} value={topic.id} style={{color:'black'}} className="my-2" >{lang=='en'?topic.name_en:topic.name_ur}</option>)
                                })}
                            </select>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid state.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className='mb-4' controlId="validationCustom03">
                            <Form.Label className={`label-heading ${lang=='en'?'':'f-30'}`} >{trans["City"]}</Form.Label><br/>
                            <input
                                type="text"
                                className={`form-inp ${lang=='en'?'english':'right-align urdu'}`}
                                placeholder={trans["City"]}
                                required
                                value={city} onChange={(e)=>setCity(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className='mb-3' controlId="validationCustom03">
                            <Form.Label className={`label-heading ${lang=='en'?'':'f-30'}`} >{trans["Country"]}</Form.Label><br/>
                            <input 
                                type="text"
                                className={`form-inp ${lang=='en'?'english':'right-align urdu'}`}
                                placeholder={trans["Country"]}
                                required
                                value={country} onChange={(e)=>setCountry(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Country.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
            </Col>
            <Col md={{order:lang=='en'?2:2}} style={{maxWidth:'3px'}}>
                <div className='line'></div>
            </Col>
            <Col md={{order:lang=='en'?3:1}}>
                <div className={lang=='en'?'how-to':'how-to f-30'}>{trans["How to upload transcript"]}</div>
                <div className={lang=='en'?'how-to-desc mt-2':'how-to-desc mt-2 f-22'}>
                    {trans["Do not crop out any part of the transcript image. Avoid unclear or blurred image of your prescription. and visit date.will only be dispensed against a valid transcript."]}<br/>
                    <img className='mt-4' src={'/images/transcript.png'} height={300} />
                </div>
            </Col>
        </Row>
        <Row className='p-3'>
            <div className={`para-heading ${lang=='en'?'english':'right-align urdu f-30'}`}>{trans['Question']}</div>
            <div className={lang=='en'?'mb-4':'mb-4 ra f-22'}>{trans['Write your question in detail']}</div>
            <Form.Group className='mb-5' controlId="validationCustom01">
                <TextEditor setQuestion={setQuestion} />
                <input
                    required
                    style={{display:"none"}}
                    value={question==""?"":question.blocks[0].text}
                    onChange={(e)=>{}}
                />
                <Form.Control.Feedback className='mt-3'>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback className='mt-3' type="invalid">
                    Please provide detail or use proper format.
                </Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Row className='justify-content-md-center p-3'>
        <div className={`para-heading ${lang=='en'?"":"f-30 ra"}`}>{trans['Upload Files and Images']}</div>
        <div className={lang=='en'?'mb-4':'mb-4 f-22 ra'}>{trans['Please upload the image here']}</div>
            <Col md="auto" style={{width:"800px"}}>
            <div className="img-box">
                <input type="file" onChange={(e)=>{handleChange(e)} } multiple id="file" />
                <img src={'/images/uploadbtn.PNG'} className="custom-file-input"/>
            </div>
            </Col>
            <br/>
            {image.length>0 && <div className='my-3'></div>}
            {
                image.map((img, index)=>{
                    return(
                        <div key={index} className="m-2 image-container transitionFade">
                            <div className='cross' >
                                <FontAwesomeIcon className='cross-logo' icon={faXmark}
                                onClick={()=>{
                                    let tempState = [...image];
                                    tempState = tempState.filter((x)=>{
                                        if(x.name!=img.name){
                                            return x
                                        }
                                    })
                                    setImage(tempState);
                                    let tempStateTwo = {}
                                    for (var key in imageList) {
                                        if (imageList[key].name === img.name) {
                                        }else{
                                            tempStateTwo[key]=imageList[key]
                                        }
                                    }
                                    console.log(tempStateTwo)
                                    setImageList(tempStateTwo)
                                }} />
                            </div>
                            <div className='img-cont' style={{marginTop:"33px"}}>
                                <img key={index} src={img.file} className="img" width={100} />
                            </div>
                        </div>
                    )
                })
            }
        </Row>
        <Row className="justify-content-md-center p-3">
            <div className={`para-heading ${lang=='en'?'':'ra f-30'}`}>{trans['Record Your Question']}</div>
            <div className='mb-4'>{lang=='en'?'Please Record Clearly and avoid background Noice':''}</div>
            <Col md="auto">
                <Recorder setRecording={setRecording} setAudioBlobURL={setAudioBlobURL} />
            </Col>
        </Row>
        <Row className="justify-content-md-center p-3">
            <Col style={{paddingLeft:'35%', paddingRight:"35%"}}>
                {audioBlobURL!="" && <audio style={{width:'100%'}} src={audioBlobURL} controls="controls" />}
            </Col>
        </Row>
        <Row>
            <Col className='p-3'>
                <button type="submit" disabled={load?true:false} className={lang=='en'?'btn-custom-two':'btn-custom-two rl f-22  px-5'}>
                    {load?<Spinner animation="border" style={{height:'20px',width:'20px',marginLeft:'10px',marginRight:'10px'}} variant="light" />:trans['Submit']}
                </button>
            </Col>
        </Row>
    </Form>
    <Modal show={show} onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Body>{/* The className is present in main.scss */}
            <div className='submitted-icon'>
                <FontAwesomeIcon icon={faCircleCheck}/>
            </div>
            <p className='submitted-text mx-5 px-5'> Thankyou for submitting your question, you will be notified on the given email once the question has been answered by Mufti</p>
            <div className=' text-center'>
                <button className='btn-custom-two px-4' onClick={handleClose}>
                    <Link href={{pathname:'/questionDetail/', query:{ id:id }}}><a style={{textDecoration:'none', color:'white'}} className=''>close</a></Link>
                </button>
            </div>
        </Modal.Body>
    </Modal>
    </Container>
    </div>
    </div>
  )
}

export default AskQuestionLayout
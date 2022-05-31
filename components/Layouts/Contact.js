import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';

import { useSelector } from 'react-redux';

import en from '/public/locales/en/common.json';
import ur from '/public/locales/ur/common.json';

const Contact = () => {

    const lang = useSelector((state) => state.language.value);

    const [validated, setValidated] = useState(false);
    const [trans, setTrans] = useState(false);
    const [load, setLoad] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
      }
      // create an event listener
      useEffect(() => {
        window.addEventListener("resize", handleResize)
      },[])

    useEffect(() => {
        lang=='en'?setTrans(en):setTrans(ur)
    }, [lang])

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) { event.stopPropagation(); }
            setValidated(true);

    }

  return (
    <div className='ask-questions-styles arabic-bg-two'>
    <Container className='py-3'>
        <Row>
            <Col md={{order:lang=='en'?1:3, span:4}} className={`${lang=='en'?'fade-in':'font-urdu ra fade-out'}`}>
            <h1 className='mb-3 mt-3'>{trans["Contact"]}</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
                <Col md={12}>
                <Form.Group className='' controlId="validationCustom01">
                    <Form.Label className={`${lang=='en'?'':' f-25 ra'}`}>{trans["Full Name"]}</Form.Label><br/>
                    <input className={`form-inp ${lang=='en'?'english':'urdu ra'}`}
                        required type="text" 
                        placeholder={trans["Enter Your Name"]}
                        value={name} onChange={(e)=>setName(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid"> Please provide a Name. </Form.Control.Feedback>
                </Form.Group>
                </Col>                        
            </Row>
            <Row>
                <Col md={12}>
                <Form.Group className='' controlId="validationCustom01">
                    <Form.Label className={`${lang=='en'?'':' f-25 ra'}`}>{trans["Email Address"]}</Form.Label><br/>
                    <input className={`form-inp ${lang=='en'?'english':'urdu ra'}`}
                        required type="text" 
                        placeholder={trans["Enter Your Email Address"]}
                        value={email} onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid"> Please provide a Name. </Form.Control.Feedback>
                </Form.Group>
                </Col>                        
            </Row>
            <Row>
                <Col md={12}>
                <Form.Group className='' controlId="validationCustom01">
                    <Form.Label className={`${lang=='en'?'':' f-25 ra'}`}>{trans["Phone Number"]}</Form.Label><br/>
                    <input className={`form-inp ${lang=='en'?'english':'urdu ra'}`}
                        required as="text"
                        placeholder={trans["Phone Number"]}
                        value={phone} onChange={(e)=>setPhone(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid"> Please provide a Name. </Form.Control.Feedback>
                </Form.Group>
                </Col>                        
            </Row>
            <Row>
                <Col md={12}>
                <Form.Group className='' controlId="validationCustom01">
                    <Form.Label className={`${lang=='en'?'':' f-25 ra'}`}>{trans["Message"]}</Form.Label><br/>
                    <textarea className={`form-inp ${lang=='en'?'english':'urdu ra'}`}
                        required type="text" rows="4" cols="50"
                        placeholder={trans["Write Your Message"]}
                        value={message} onChange={(e)=>setMessage(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid"> Please provide a Name. </Form.Control.Feedback>
                </Form.Group>
                </Col>                        
            </Row>
            <Row>
                <Col className={`p-3 ${isMobile?'text-center':''}`}>
                    <button type="submit" disabled={load?true:false} className={lang=='en'?'btn-custom-two':'btn-custom-two rl f-18  px-5'}>
                        {load?<Spinner animation="border" style={{height:'20px',width:'20px',marginLeft:'10px',marginRight:'10px'}} variant="light" />:trans['Submit']}
                    </button>
                </Col>
            </Row>
            </Form>
            </Col>
            <Col md={{order:lang=='en'?2:2, span:1}}>
            </Col>
            <Col md={{order:lang=='en'?3:1, span:6}} className='py-5 text-center'>
                <img src={'/images/contact.png'} height={isMobile?260:500} />
            </Col>
        </Row>
        <div className='my-5'></div>
        <br/>
        <div className='my-5'></div>
    </Container>
    </div>
  )
}

export default Contact
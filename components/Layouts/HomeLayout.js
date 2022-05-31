import React, { useState, useEffect } from 'react';
import useIsomorphicLayoutEffect from '../GlobalFunctions/useIsomorphicLayoutEffect'

import { Row, Col, Modal, Button } from 'react-bootstrap';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux'
import { urdu, english } from '/redux/Actions&Reducers/languageSlice';

import Cookies from 'js-cookie'
import Router from 'next/router';

const HomeLayout = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const lang = useSelector((state) => state.language.value)
  const dispatch = useDispatch()
  
  useIsomorphicLayoutEffect(() => {
    if(Cookies.get('lang')){
      Cookies.get('lang')=='en'?dispatch(english()):dispatch(urdu());
    }else{
      handleShow();
    }
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
    <Modal.Body className='modal-custom'>
      <Row className="justify-content-md-center">
      <Col md={12}>
        <Image src={'/images/top.bmp'} width={609} height={112}/>    
      </Col>
      <Col md={12}>
        <h5 className='text-center'>Choose Your Language</h5>
      </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md={6} style={{padding:'6px'}}>
          <button className='first-btn-en roboto' 
          onClick={()=>{ 
            dispatch(english());Cookies.set('lang','en');
            Router.push({
              pathname:'/questions',
              query:{tab:'recent'}
            })
          }}
          >ENGLISH</button>
        </Col>
        <Col md={6} style={{padding:'6px'}}>
          <button className='first-btn-ur font-urdu' style={{float:'left'}} 
          onClick={()=>{
            dispatch(urdu());
            Cookies.set('lang','ur');
            Router.push({
              pathname:'/questions',
              query:{tab:'recent'}
            })
          }}
            >اردو</button>
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
  </div>
  )
}

export default HomeLayout
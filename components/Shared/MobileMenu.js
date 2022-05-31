import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';

import { Fade as Hamburger } from 'hamburger-react'
import { Container, Accordion, Row, Col } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux';

import ur from '/public/locales/ur/common.json';
import en from '/public/locales/en/common.json';

const MobileMenu = () => {

    const lang = useSelector((state) => state.language.value);

    const [trans, setTrans] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        lang=='en'?setTrans(en):setTrans(ur);
    }, [lang]);

  return (
    <div className='mobile-header'>
        <div>
            <Container>
                <Row className={`base-height ${open?'open-height':'close-height'} `}>
                    <Col xs={9} className='pt-1'>
                        <Row>
                            <Col style={{maxWidth:'100px'}}>
                                <Image src={'/images/logo-pf.png'} width={80} height={80}/>
                            </Col>
                            <Col className='pt-1'>
                                <img src={'/images/hidaya-text.png'} width={150} height={60} style={{position:'relative', right:'20px',top:'10px'}}  />
                            </Col>
                        </Row>
                    </Col>
                    <Col className='pt-3' style={{marginLeft:'15px'}}>
                        <Hamburger toggled={open} toggle={setOpen} />
                    </Col>
                    <Row>
                        <Col xs={12} className='px-3 mx-3 '>
                        {open &&
                            <div className='items-tab fade-in'>
                                <div className='mobile-menu-link'><Link href={{pathname:'/questions', query:{tab:'recent'}}}><a  className={lang=='en'?'fade-in':'font-urdu fade-out'} style={{textDecoration:'none'}}>{trans["Question"]}</a></Link></div>
                                <div className='mobile-menu-link'><span className={lang=='en'?'fade-in':'font-urdu fade-out'}>{trans["Topics"]}</span></div>
                                <div className='mobile-menu-link'><Link href='/about'><a className={lang=='en'?'fade-in':'font-urdu fade-out'} style={{textDecoration:'none'}}>{trans["About"]}</a></Link></div>
                                <div className='mobile-menu-link'><Link href='/contact'><a className={lang=='en'?'fade-in':'font-urdu fade-out'} style={{textDecoration:'none'}}>{trans["Contact"]}</a></Link></div>
                                <div className='my-5'></div>
                            </div>
                        }
                        </Col>
                    </Row>
                </Row>
            </Container>
        </div>
    {/* <Accordion flush>
    <Accordion.Item eventKey="0">
        <Accordion.Header>
            <span>   
                <Image src={'/images/logo-pf.png'} width={100} height={100}/>
            </span>
            <span>
                <h1 className='mx-2' style={{color:'black'}}><strong>ASK HIDAYA</strong></h1>
            </span>
        </Accordion.Header>
        <Accordion.Body className={lang=='en'?'':'f-25'}>

        </Accordion.Body>
    </Accordion.Item>
    </Accordion> */}
    </div>
  )
}

export default MobileMenu
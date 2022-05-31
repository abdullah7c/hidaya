import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import { Row, Col, Container, Nav, Navbar } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { english, urdu } from '/redux/Actions&Reducers/languageSlice';
import useIsomorphicLayoutEffect from '/components/GlobalFunctions/useIsomorphicLayoutEffect';

import en from '/public/locales/en/common.json';
import ur from '/public/locales/ur/common.json';
import MobileMenu from './MobileMenu';

const Header = () => {

    const lang = useSelector((state) => state.language.value);
    const dispatch = useDispatch();
    const router = useRouter();

    const [trans, setTrans] = useState({});
    const [topicList, setTopicList] = useState([]);

    const [isMobile, setIsMobile] = useState(false);

      useEffect(() => {
        if (typeof window !== 'undefined') {
          function handleResize() {
            //console.log(isMobile)
        if (window.innerWidth < 720) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
        }
          window.addEventListener("resize", handleResize);
          handleResize();
          return () => window.removeEventListener("resize", handleResize);
        }
      }, []);

    useEffect(() => {
        fetchTopics();
    }, []);

    useEffect(() => {
        lang=='en'?setTrans(en):setTrans(ur);
    }, [lang]);

    useIsomorphicLayoutEffect(() => {
        Cookies.get('lang')=="en"?dispatch(english()):Cookies.get('lang')=="ur"?dispatch(urdu()):null
      }, [])

    const fetchTopics = async() => {
        let responce = await axioRequest('public/topics/', 'application/json', null, 'get');
        setTopicList(responce.data);
    }

    const axioRequest = async(endPoint, contentType, bodyData, methodType) => {
        let config = {
            method: methodType,
            url: 'https://api.askhidayah.com/api/v1/'+ endPoint,
            headers: { 'Content-Type': contentType },
            data : bodyData
        };
        let responce;
        await axios(config).then((res)=>{
            responce=res;
        }).catch((error)=>{
            console.log(error);
        });
        return responce;
    }

  return (
    <div className='header-styles'>
    <Container fluid>
        <Row className='top-bar'>
            <Col md={3}>
            </Col>
            <Col md={6} className='text-center pt-3' style={{height:'140px'}}>
                <div className='top-ayat font-arbic f-25'>فَسـئَلُوا اَهلَ الذِّكرِ اِن كُنتُم لَا تَعلمُونَ</div>
                <div className={lang=='en'?'white fade-in f-18 ':'font-urdu white fade-out f-25'}>{trans['top-title']}</div>
            </Col>
            <Col md={3}>
                <div className='text-center trans-btn-cont'>
                    {!isMobile && 
                    <button 
                        className={`${lang=='en'?'trans-btn-left-active':'trans-btn-left'} `}
                        onClick={()=>{dispatch(english()); Cookies.set('lang','en')}} >
                        English
                    </button>}
                    {isMobile && 
                    <button 
                        className={`${lang=='en'?'trans-btn-left-mob-active':'trans-btn-left-mob'} `}
                        onClick={()=>{dispatch(english()); Cookies.set('lang','en')}} >
                        English
                    </button>}
                    {isMobile && 
                    <button
                        className={`px-4 ${lang=='ur'?'trans-btn-right-mob-active':'trans-btn-right-mob'} font-urdu`}
                        onClick={()=>{dispatch(urdu()); Cookies.set('lang','ur')}} >
                        اردو
                    </button>}
                    {!isMobile && 
                    <button
                        className={`px-4 ${lang=='ur'?'trans-btn-right-active':'trans-btn-right'} font-urdu`}
                        onClick={()=>{dispatch(urdu()); Cookies.set('lang','ur')}} >
                        اردو
                    </button>}
                </div>
            </Col>
        </Row>
    </Container>
    <div className='main-nav'>
    {!isMobile && 
    <Navbar bg="" expand="lg" className='nav-menu'>
    <Container className='nav-container'>
        <Navbar.Brand><Image src={'/images/Ask-Hidayah-logo.png'} width={125} height={112}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end" style={{width:"90%"}}>
            {lang=='ur'&&<Link href={{pathname:'/contact'}}><a className={`font-urdu fade-out ${router.pathname=='/contact'?'link-active f-25':'links f-25'}`}>{trans["Contact"]}</a></Link>}
            {lang=='ur'&&<Link href={{pathname:'/about'}}><a className={`font-urdu fade-out ${router.pathname=='/about'?'link-active f-25':'links f-25'}`}>{trans["About"]}</a></Link>}
            {lang=='en'&&<Link href={{pathname:'/questions', query:{tab:'recent'}}}><a className={`fade-in ${router.pathname=='/questions'?'link-active':'links'}`}>Questions</a></Link>}
            <a className='links dropdown-btn'>{lang=='en'?<span className='fade-in'>Topics</span>:<span className='font-urdu fade-out f-25'>موضوعات</span>}
            <div className="dropdown-content">
                <div className='top-line'></div>
                <div className='nav-Content'>
                <Container fluid className='px-5'>
                    <Row>
                    {
                        topicList.map((topic, indexOne)=>{
                            return(
                            <Col key={indexOne} className="">
                                <h5 className={` ${lang=='en'?'nav-main-heading':'font-urdu nav-main-heading-ur f-30 mt-3'}`}>{lang=='en'?topic.name_en:topic.name_ur}</h5>
                                <div>{topic.children.map((child, indexTwo)=>{
                                    return(
                                    <div key={indexTwo} className={`child-category ${lang=='en'?'':'ra f-22 font-urdu'}`}
                                        onClick={()=>{
                                            Router.push({pathname:'/questions', query:{tab:'topic', topicId:child.id}});
                                        }}
                                    >
                                        {lang=='en'?child.name_en:child.name_ur}{`(${child.questions_counts})`}
                                    </div>
                                    )
                                })}</div>
                            </Col>
                            )
                        })
                    }
                    </Row>
                </Container>
                </div>
            </div>
            </a>
            {lang=='en'&&<Link href='/about'><a className={`fade-in ${router.pathname=='/about'?'link-active':'links'}`}>About</a></Link>}
            {lang=='en'&&<Link href='/contact'><a className={`fade-in ${router.pathname=='/contact'?'link-active':'links'}`}>Contact</a></Link>}
            {lang=='ur'&&<Link href={{pathname:'/questions', query:{tab:'recent'}}}><a className={`font-urdu fade-out ${router.pathname=='/questions'?'link-active f-25':'links f-25'}`}>سوالات</a></Link>}
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    }
    {isMobile &&
        <MobileMenu/>
    }
    </div>
    </div>
  )
}

export default Header
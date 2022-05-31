import React,{ useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Table, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { convertFromRaw } from "draft-js";
import Link from 'next/link';

import Router, { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import en from '/public/locales/en/common.json';
import ur from '/public/locales/ur/common.json';
import VisibilitySensor from 'react-visibility-sensor';
import QuestionTable from './QuestionTable';
import axios from 'axios'
import { useDebounce } from 'use-debounce';
import MobileQuestionTable from './MobileQuestionTable';

const QuestionsLayout = ({questions}) => {

    const router = useRouter();
    const lang = useSelector((state) => state.language.value);
    const [trans, setTrans] = useState({});
    const [load, setLoad] = useState(false);

    const [search, setSearch] = useState("");
    const [value] = useDebounce(search, 2000);
    const [address, setAddress] = useState("");

    const [questionList, setQuestionList] = useState([]);
    const [nextApi, setNextApi] = useState("");
    const [showLoad, setShowLoad] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        function handleResize() {
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
      lang=='en'?setTrans(en):setTrans(ur)
    }, [lang])

    useEffect(() => {
      //console.log(questions)
      if(questionList.length<1){
        setNextApi(questions.next);
        setQuestionList(questions.results);
        setShowLoad(true)
      }
      setAddress(router.query.tab);  
    }, []);

    useEffect(() => {
        setAddress(router.query.tab);
        setQuestionList(questions.results)
        setNextApi(questions.next);
    }, [questions]);

    useEffect(()=>{
      if(value!=""){
        getSearchedQuestions();
      }else if(value==""){
        router.push({pathname:'questions', query:{tab:`recent`}}, undefined, { scroll: false })
      }
    },[value]);

    const getSearchedQuestions = async() => {
      let responce = await axioRequest(`/questions/?limit=10&offset=${0}&search=${value}`,'application/json',"",'GET');
      console.log(responce);
      setQuestionList(responce.results);
      setNextApi(responce.next);
    }
    const handleScroll = async(value) => {
        if (value==true && router.pathname=="/questions" && router.query.tab!='search' && nextApi!=null) {
            let responce = await axioRequest(nextApi.slice(32),'application/json',"",'GET');
            setNextApi(responce.next);
            setLoad(true);
            incrementAnswers(responce);
        }
    };
    const axioRequest = async(endPoint, contentType, data, methodType) => {
      let config = {
          method: methodType,
          url: process.env.NEXT_PUBLIC_ASK_HIDAYA_GLOBAL+endPoint,
          headers: { 'Content-Type':contentType  },
          data : data, };
      let responce = await axios(config).then((res)=>res.data)
      return responce
    }
    const incrementAnswers = (ques) => {
      if(questionList.length>1 && address==router.query.tab){
        let tempState = questionList.concat(ques.results);
        setQuestionList(tempState);
      }
      setLoad(false);
    }

  return (
    <div className='question-styles py-5 arabic-bg'>
      {!isMobile &&
        <Container className={`box my-3 ${lang=='en'?'fade-in':'fade-out'}`}>
        <Row className={`pt-5`}>
            <Col md={{order:lang=='en'?1:3}}>
            <div className={`bar-menu ${lang=='en'?'':'rl'}`}>
                <div className={`${lang=='en'?'':'font-urdu f-30 mx-4'} ${router.query.tab=='recent'?'q-btn-selected':'q-btn'}`}
                onClick={()=>{
                    setLoad(true);
                    Router.push({pathname:'/questions', query:{tab:'recent'}});
                }}
                >{trans['Recent Questions']}</div>

                <div className={`${lang=='en'?'':'font-urdu f-30 mx-4'} ${router.query.tab=='mostViewed'?'q-btn-selected':'q-btn'}`}
                onClick={()=>{
                    setLoad(true);
                    Router.push({pathname:'/questions', query:{tab:'mostViewed'}});
                }}
                >{trans['Most Viewed']}</div>

                <div className={` ${lang=='en'?'':'font-urdu f-30 mx-4'} ${router.query.tab=='featured'?'q-btn-selected':'q-btn'}`}
                onClick={()=>{
                    setLoad(true);
                    Router.push({pathname:'/questions', query:{tab:'featured'}});
                }}
                >{trans['Featured Questions']}</div>
            </div>
            </Col>
            <Col md={{span:3, order:2}}>
            <div className='search'>
            <input type="text" className={lang=='en'?'search-input':'search-input-ur f-18 font-urdu'} placeholder={trans['Search By Title']} value={search} onChange={(e)=>setSearch(e.target.value)} />
            <span className={lang=='en'?'separator':'separator-ur'}> | </span>
            <span className={lang=='en'?'icon':'icon-ur'} ><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
            </div>
            </Col>
            <Col md={{span:3, order:lang=='en'?3:1}}>
                <button className='write-btn' onClick={()=>Router.push('/askQuestion')}>
                <span className='plus-icon'>+</span>
                <span className={lang=='en'?'btn-text':'btn-text-ur font-urdu f-20 px-4'}>{trans['Write Your Question']}</span>
                </button>
            </Col>
        </Row>
        <QuestionTable questionList={questionList} />
        </Container>
      }
      {isMobile &&
        <Container className={`box my-3 ${lang=='en'?'fade-in':'fade-out'}`}>
          <Row className={`pt-4`}>
            <Col xs={12} className='text-center mt-3'>
            <div className={`text-center ${lang=='en'?'p-2':'font-urdu f-30 pb-1'} ${router.query.tab=='recent'?'q-btn-mob-selected':'q-btn-mob'}`}
                onClick={()=>{
                    setLoad(true);
                    Router.push({pathname:'/questions', query:{tab:'recent'}});
                }}
                >{trans['Recent Questions']}</div>
            </Col>
            <Col xs={12} className='text-center my-1'>
            <div className={`text-center ${lang=='en'?'p-2':'font-urdu f-30 pb-1'} ${router.query.tab=='mostViewed'?'q-btn-mob-selected':'q-btn-mob'}`}
                onClick={()=>{
                    setLoad(true);
                    Router.push({pathname:'/questions', query:{tab:'mostViewed'}});
                }}
                >{trans['Most Viewed']}</div>
            </Col>
            <Col xs={12} className='text-center '>
            <div className={`text-center ${lang=='en'?'p-2':'font-urdu f-30 pb-1'} ${router.query.tab=='featured'?'q-btn-mob-selected':'q-btn-mob'}`}
                onClick={()=>{
                    setLoad(true);
                    Router.push({pathname:'/questions', query:{tab:'featured'}});
                }}
                >{trans['Featured Questions']}</div>
            </Col>
            <Col xs={12}>
            <div className='search mt-2'>
            <input type="text" className={lang=='en'?'search-input':'search-input-ur f-18 font-urdu'} placeholder={trans['Search By Title']} value={search} onChange={(e)=>setSearch(e.target.value)} />
            <span className={lang=='en'?'separator':'separator-ur'}> | </span>
            <span className={lang=='en'?'icon':'icon-ur'} ><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
            </div>
            </Col>
            <Col xs={12}>
                <button className='write-btn-mob' onClick={()=>Router.push('/askQuestion')}>
                <span className='plus-icon-mob'>+</span>
                <span className={lang=='en'?'btn-text':'btn-text-ur font-urdu f-20 px-4'}>{trans['Write Your Question']}</span>
                </button>
            </Col>
        </Row>
        <MobileQuestionTable questionList={questionList} />
        </Container>
      }

        {(showLoad && nextApi!=null) && 
        <VisibilitySensor onChange={(value) => { handleScroll(value) }} >
              <div className='text-center' style={{position:'relative', top:'0px'}}>
                <img src='/loader.svg'  style={{height:'60px'}} />
              </div>
        </VisibilitySensor>
        }
    </div>
  )
}

export default QuestionsLayout
import React, { useEffect, useState } from 'react'
import {Row, Col, Table} from 'react-bootstrap'

import { useSelector } from 'react-redux';
import en from '/public/locales/en/common.json';
import ur from '/public/locales/ur/common.json';

import { convertFromRaw } from "draft-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEye } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';

const MobileQuestionTable = ({questionList}) => {

    const lang = useSelector((state) => state.language.value);
    const [trans, setTrans] = useState({});
    
    const [tableValues, setTableValues] = useState({
        heading:[{value:'Questions', style:''}],
    })

    useEffect(() => {
        if(lang=='en'){
            setTrans(en);
            let tempState = tableValues;
            tempState.heading[0]={value:'Questions', style:''};
            setTableValues(tempState)
        }else{
            setTrans(ur);
            let tempState = tableValues;
            tempState.heading[0]={value:'Questions', style:''};
            setTableValues(tempState)
        }
      }, [lang])

  return (
    <div>
        <Table borderless >
            <thead>
                <tr>
                {
                tableValues.heading.map((val, index)=>{
                    return(<td key={index} className={`table-bg ${val.style} ${lang=='en'?'f-20':'ra font-urdu f-22'}`}>{trans[val.value]}</td>)
                })
                }
                </tr>
            </thead>
            <tbody>
            {
            questionList.map((ques, index)=>{
            return(
                <tr className='table-row' key={index}>
                    <td className='py-4'>
                    <Row className=''>
                        <Col xs={{order:lang=='en'?1:2}} className={`${lang=='en'?'question-sign':'question-sign-ur font-urdu f-22'}`} >
                            {lang=='en' && <span>Q:</span>}
                            {lang=='ur' && <span style={{position:'relative', right:'15px', top:'7px'}}>:??</span>}
                        </Col>
                        <Col xs={{order:lang=='en'?2:1}}>
                        <Row>
                            <Col md={12}>
                                <div className={`question-heading ${lang=='en'?'':'ra font-urdu f-30'}`}>
                                <Link href={{pathname:'/questionDetail/', query:{ id:ques.id }}}>
                                    <a className='title'>{lang=='en'?ques.title_en:ques.title_ur}</a>
                                </Link>
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className={`question-desc ${lang=='en'?'':'ra font-urdu f-20'}`}>
                                    {lang=='en'?'':' .... '}
                                    {convertFromRaw(JSON.parse(lang=='en'?ques.description_en:ques.description_ur)).getPlainText().split(" ").splice(0, lang=='en'?20:30).join(" ")}
                                    {lang=='en'?' ...':''}
                                </div>
                            </Col>
                        </Row>
                        {lang=='en' &&
                        <Row className='mt-1'>
                            <Col xs={8}><FontAwesomeIcon className='mt-2' icon={faCalendar} style={{color:'silver'}} /> <span className='mx-2 date'>{ques.created_at.slice(0,10)}</span></Col>
                            <Col xs={4}><FontAwesomeIcon className='mt-2' icon={faEye} style={{color:'silver'}} />  <span className='date'>{ques.views_count}</span></Col>
                        </Row>
                        }
                        {lang=='ur' &&
                        <Row className='mt-1 ra'>
                            <Col xs={4} className='pt-1'><span className='date mx-1 font-urdu'>{ques.views_count} </span><FontAwesomeIcon icon={faEye} style={{color:'silver', position:'relative',top:'2px'}} /></Col>
                            <Col xs={8}><span className='mx-2 date font-urdu'>{ques.created_at.slice(0,10)}</span><FontAwesomeIcon className='mt-2' icon={faCalendar} style={{color:'silver'}} /></Col>
                        </Row>
                        }
                        </Col>
                    </Row>
                    </td>
                </tr>
                )
                })
            }
            </tbody>
        </Table>
    </div>
  )
}

export default MobileQuestionTable
import React, { useEffect, useState } from 'react'
import {Row, Col, Table} from 'react-bootstrap'

import { useSelector } from 'react-redux';
import en from '/public/locales/en/common.json';
import ur from '/public/locales/ur/common.json';

import { convertFromRaw } from "draft-js";

import Link from 'next/link';

const QuestionTable = ({questionList}) => {

    const lang = useSelector((state) => state.language.value);
    const [trans, setTrans] = useState({});
    
    const [tableValues, setTableValues] = useState({
        heading:[{value:'Questions', style:''}, {value:'Views', style:''}, {value:'Date', style:''}],
    })

    useEffect(() => {
        if(lang=='en'){
            setTrans(en);
            let tempState = tableValues;
            tempState.heading[0]={value:'Questions', style:''};
            tempState.heading[2]={value:'Date', style:'text-center'};
            setTableValues(tempState)
        }else{
            setTrans(ur);
            let tempState = tableValues;
            tempState.heading[2]={value:'Questions', style:''};
            tempState.heading[0]={value:'Date', style:'text-center'};
            setTableValues(tempState)
        }
      }, [lang])

  return (
    <div >
        <Table responsive borderless>
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
                    {lang=='ur'&&<><td className='py-5 text-center font-urdu f-18' style={{width:'100px'}}>{ques.created_at.slice(0,10)}</td></>}
                    {lang=='ur'&&<><td className='py-5 text-center font-urdu f-18'><span className='views'>{ques.views_count}</span></td></>}
                    <td className='py-4'>
                    <Row className='auto-width'>
                        <Col md={{order:lang=='en'?1:2}} className={`${lang=='en'?'question-sign':'question-sign-ur font-urdu f-22'}`} >
                            <span >{lang=='en'?'Q:':':س'}</span>
                        </Col>
                        <Col md={{order:lang=='en'?2:1}}>
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
                        </Col>
                    </Row>
                    </td>
                    {lang=='en'&&<><td className='py-5 text-center '><span className='views'>{ques.views_count}</span></td></>}
                    {lang=='en'&&<><td className='py-5 text-center' style={{width:'100px'}}>{ques.answer[0].approved_date.slice(0,10)}</td></>}
                </tr>
                )
                })
            }
            </tbody>
        </Table>
    </div>
  )
}

export default QuestionTable
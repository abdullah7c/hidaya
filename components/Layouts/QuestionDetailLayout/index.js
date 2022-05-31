import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Container, Row, Col, Table } from 'react-bootstrap';
import draftToHtml from 'draftjs-to-html';
import { convertFromRaw, EditorState } from "draft-js";

import en from '/public/locales/en/common.json';
import ur from '/public/locales/ur/common.json';

import dynamic from 'next/dynamic'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false });

import EditorReadOnly from './EditorReadOnly';

const QuestionDetailLayout = ({questions, reference}) => {

  const lang = useSelector((state) => state.language.value);
  const [trans, setTrans] = useState({});

  const [answer, setAnswer] = useState('')
  const [references, setReferences] = useState('')

    useEffect(() => {
      console.log(questions);
      if(reference.results.length>0){
        setReferences(draftToHtml(JSON.parse(reference.results[0].description)));
      }
    }, [])

    useEffect(() => {
      lang=='en'?setTrans(en):setTrans(ur)
      if(questions.answer.length>0){
        lang=='en'?setAnswer(JSON.parse(questions.answer[0].description_en)):setAnswer(JSON.parse(questions.answer[0].description_ur))
      }else{
        setAnswer("NOT YET ANSWERED")
      }
    }, [lang])

  return (
    <div className='detail-questions arabic-bg'>
      <div className='py-1'>
          {lang=='en' && 
            <Container className='mt-5 white-bar fade-in'>
                <Row>
                    <Col>
                      <div className='topic'>Topic: {questions.category[0].breadcrum_en}</div>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                      <div className='ledger'><span>Ledger Number:</span> {questions.ledger_number}</div>
                    </Col>
                </Row>
                <Row className='mt-3'>
                  <h4>Title :</h4>
                  <p>{questions.title}</p>
                </Row>
                <Row className='mt-3'>
                  <h4>Question :</h4>
                  <EditorReadOnly content={JSON.parse(questions.description_en)} />
                </Row>
                <hr/>
                <Row className='mt-5'>
                    <Col>
                      <div className='ledger'><span>ANSWER ID:</span> {questions.answer.length>0?questions.answer[0].id:''}</div>
                    </Col>
                    <Col>
                    <div style={{float:'right', marginRight:'10px'}} className='ledger'><span>FATWA NO:</span> {"03-089-0093-000073"}</div>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <h3>Bismillah hir-Rahman nir-Rahim!</h3>
                </Row>
                <Row className='mt-4'>
                  <h4>Answer :</h4>
                </Row>
                <Row>
                    <Col md={12}>
                      {questions.answer[0]?<EditorReadOnly content={JSON.parse(questions.answer[0].description_en)} />:'NOT ANSWERED'}
                    </Col>
                </Row>
                <Row className='mt-4'>
                  <h4>Refrences :</h4>
                  <div className='reference'>
                    <div className="font-arbic" style={{textAlign:'right'}} dangerouslySetInnerHTML={{__html: references}}></div>
                  </div>
                </Row>
                <hr/>
                <Row className='mt-5' style={{fontSize:'21px'}}>
                  <Col>
                      <div>Allah (subhana Wa Ta{"'"}ala) Knows Best</div>
                  </Col>
                  <Col>
                      <div style={{float:'right'}}>Hidayah Academy</div>
                  </Col>
                </Row>
            </Container>
          }
          {lang=='ur' && 
            <Container className='mt-5 white-bar font-urdu fade-out ra'>
                <Row>
                    <Col>
                      <div className='topic f-25'>{trans['Topics']}: {questions.category[0].breadcrum_ur}</div>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                      <div className='ledger f-25'><span>{trans['Ledger Number']}</span> {questions.ledger_number}</div>
                    </Col>
                </Row>
                <Row className='mt-3 '>
                  <h4 className='heading'>:{trans['Title']}</h4>
                  <p className='f-25'>{questions.title_ur}</p>
                </Row>
                <Row className='mt-3'>
                  <h4 className='heading'>:{trans['Question']}</h4>
                  <div className='f-25'>{questions.description_ur==''?'NOT TRANSLATED':<EditorReadOnly content={JSON.parse(questions.description_ur)} />}</div>
                </Row>
                <hr/>
                <Row className='mt-5'>
                    <Col>
                    <div style={{float:'left'}} className='ledger mx-4 f-25'><span>{trans['Fatwa ‫‪Number‬‬']}:</span> {"03-089-0093-000073"}</div>
                    </Col>
                    <Col>
                      <div className='ledger f-25'>{questions.answer.length>0?questions.answer[0].id:''}<span>:{trans['Answer ID']}</span></div>
                    </Col>
                </Row>
                <Row className='mt-4 arbic-font'>
                    <h3>بِسمِ اللہِ الرَّحمٰنِ الرَّحِيم!</h3>
                </Row>
                <Row className='mt-4'>
                  <h4 className='heading'>:{trans['Answer']}</h4>
                </Row>
                <Row>
                    <Col md={12}>
                      <div className='urdu-ans' style={{fontSize:'25px'}}>
                      {questions.answer[0]?<EditorReadOnly content={JSON.parse(questions.answer[0].description_ur)} />:'NOT ANSWERED'}
                      </div>
                    </Col>
                </Row>
                <Row className='mt-4'>
                  <h4 className='heading'>:{trans['Refrences']}</h4>
                  <div className='reference'>
                    <div className="font-arbic" style={{textAlign:'right'}} dangerouslySetInnerHTML={{__html: references}}></div>
                  </div>
                </Row>
                <hr/>
                <Row className='mt-5 f-25' style={{fontSize:'21px'}}>
                  <Col>
                      <div style={{float:'left'}}>ہدایہ اکیڈمی</div>
                  </Col>
                  <Col>
                      <div>اللہ بہتر جانتا ہے</div>
                  </Col>
                </Row>
            </Container>
          }
      </div>
    </div>
  )
}

export default QuestionDetailLayout
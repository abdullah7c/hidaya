import React from 'react';
import axios from 'axios';
import QuestionDetailLayout from '/components/Layouts/QuestionDetailLayout';

const questionDetail = ({questions, reference}) => {
  return (
    <div><QuestionDetailLayout questions={questions} reference={reference} /></div>
  )
}
export default questionDetail

export async function getServerSideProps() {
    const requestOne = await axios.get(`${process.env.NEXT_PUBLIC_ASK_HIDAYA_GLOBAL}/temp-questions/${context.query.id}`).then((res)=>res.data)
    const requestTwo = await axios.get(`${process.env.NEXT_PUBLIC_ASK_HIDAYA_GLOBAL}/reference/?question_id=${context.query.id}`).then((res)=>res.data)
    return {
        props: {
            questions:requestOne, reference:requestTwo
        },
    }
}
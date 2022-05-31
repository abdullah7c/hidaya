import React from 'react'
import QuestionsLayout from '/components/Layouts/QuestionsLayout/'
import axios from 'axios'

const questions=({questions})=>{
  return(<div><QuestionsLayout questions={questions} /></div>)
}
export default questions

export async function getServerSideProps(context){

  let address='';
  address=context.query.tab=='recent'?'questions':context.query.tab=='mostViewed'?'most-Viewed-Questions':
    context.query.tab=='featured'?'is-featured-questions':context.query.tab=='search'?'questions':context.query.tab=='topic'?'questions':null
    //const request = await axios.get(`${process.env.NEXT_PUBLIC_ASK_HIDAYA_GLOBAL}/${address}/?limit=10&${context.query.tab=='search'?`search=${context.query.search}`:context.query.tab=='topic'?`topic=${context.query.topicId}`:'ordering=-views_count'}`)
    const request = await axios.get(`${process.env.NEXT_PUBLIC_ASK_HIDAYA_GLOBAL}/${address}/?limit=10&${context.query.tab=='topic'?`topic=${context.query.topicId}`:'ordering=-views_count'}`)
    const result = request.data
    //console.log(`${process.env.NEXT_PUBLIC_ASK_HIDAYA_GLOBAL}/${address}/?limit=10&offset=${context.query.tab!='topic'?((context.query.page-1)*20):((context.query.page==1?context.query.page-1:context.query.page)*10)}&${context.query.tab=='search'?`search=${context.query.search}`:context.query.tab=='topic'?`topic=${context.query.topicId}`:'ordering=-views_count'}`)
  return {
    props: {
      questions:JSON.parse(JSON.stringify(result))
    },
  }
}
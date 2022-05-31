import React from 'react'
import AskQuestionLayout from '/components/layouts/AskQuestionLayout'
import axios from 'axios'

const askQuestion = ({topics}) => {
  return (
    <div><AskQuestionLayout topics={topics} /></div>
  )
}
export default askQuestion

export async function getServerSideProps(){

  const request = await axios.get(`${process.env.NEXT_PUBLIC_ASK_HIDAYA_GLOBAL}/public/topics/`)
  .then((x)=> x.data);
  return {
    props: {
      topics:JSON.parse(JSON.stringify(request))
    },
  }
}

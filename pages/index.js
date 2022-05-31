import React from 'react';
import Cookies from 'cookies'
import Router from 'next/router';
import Image from 'next/image';
import { Spinner } from 'react-bootstrap';
import HomeLayout from '/components/Layouts/HomeLayout';

export default function Home({route}) {

  React.useEffect(() => {
    route==true?Router.push({pathname:'/questions', query:{tab:'recent'}}):null
  }, [])

  return (
    <div style={{overflow:'hidden'}}>
      <div className='center-loader'>
        {!route && <HomeLayout/> }
        {
        route && 
        <>
          <Image src={'/images/Ask-Hidayah-logo.png'} width={125} height={112}/>
          <br/>
          <Spinner animation="grow" style={{backgroundColor:'#ffc110'}} />
        </>
        }
      </div>
    </div>
  )
}

export async function getServerSideProps({req, res}){

  const cookies = new Cookies(req, res)
  let route = false;

  if(cookies.get('lang')) route=true

  return{
    props: { route:route }
  }
}
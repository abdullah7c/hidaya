import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'

import { useSelector } from 'react-redux';

import en from '/public/locales/en/common.json';
import ur from '/public/locales/ur/common.json';

const About = () => {

    const [fluid, setFluid] = useState(false);
    const lang = useSelector((state) => state.language.value);
    const [trans, setTrans] = useState(false);
    const handleResize = () => {
        if (window.innerWidth < 1400) {
            setFluid(true)
        } else {
            setFluid(false)
        }
      }
      // create an event listener
      useEffect(() => {
        window.addEventListener("resize", handleResize)
      })

      const [isMobile, setIsMobile] = useState(false);
      useEffect(() => {
        if (typeof window !== 'undefined') {
          function handleResize() {
          console.log(isMobile)
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
        lang=='en'?setTrans(en):setTrans(ur);
    }, [lang]);

  return (
    <div className='arabic-bg'>
    <Container fluid={isMobile?true:false} className={`${lang=='en'?'fade-in':'font-urdu ra fade-out'}`}>
        <Row>
            <Col md={12} className='text-center py-5 px-5'>
                <h3><strong>{trans["About Us"]}</strong></h3>
                <p className={lang=='en'?'my-3 f-20':'my-3 f-25'}>
                    {trans["AskHidayah is a Project of Hidayah Academy, Pakistan, being managed under the supervision of Hazrat Moulana Shaykh Muhammad Azhar Iqbal DB."]}
                    <br/>
                    {trans["Our Dar ul Ifta is supervised by Mufti Abdul Mannan Sb DB and Mufti Saleem Memon Sb DB"]}
                    <br/>
                    {trans["AskHidayah pledges to answer the questions that are asked after a thorough and well-managed process, to give the best guidance to those seeking it, in a timely and professional manner."]}
                </p>
            </Col>
        </Row>
        <Row className='my-2'>
            <Col md={6} className=''>
                <h3><strong>{trans["Hidayah Academy"]}</strong></h3>
                <div className={lang=='en'?'my-3 f-20':'my-3 f-25'}>
                <p>
                    {trans["Hidayah Academy is an Islamic Education Institute which caters to the need of individuals who are busy in their professional lives and they also desire to learn the deen. Under the umbrella of Jamia Hidayah both men & women can attain the blessed Noor of Uloom e Nabawiyyah (Prophetic Knowledge) in flexible timings."]}
                </p>
                <p>
                    {trans["With a team of qualified individuals and experts in different Islamic disciplines, this institution not only imparts Islamic knowledge and skills but also focuses on the spiritual training of its students."]}
                </p>
                <p>
                    {trans["Alhamdulilah, Hidayah Academy has campuses in 4 cities in Pakistan and has established a network portals for online students in 27 countries of the world. By the Grace of Allah this Institute has grown enormously in a short span of 15 years."]}
                </p>
                </div>
            </Col>
            <Col md={6} className='my-5'>
            <video className='' width='100%' controls>
                <source src="videos/intro.mp4" type="video/mp4" />
                <source src="videos/intro.ogg" type="video/ogg" />
                Your browser does not support the video tag.
            </video>
            </Col>
        </Row>
        <Row className='my-2'>
            <Col md={6}>
                <img src={'/images/team.JPEG'} style={{minHeight:'100%', maxWidth:'102%'}} />
            </Col>
            <Col md={6} className=''>
                <h3><strong>{trans["Hazrat Moulana Shaykh Muhammad Azhar Iqbal Sb DB"]}</strong></h3>
                <div className={lang=='en'?'my-3 f-20':'my-3 f-25'}>
                <p>
                    {trans["Shaykh Muhammad Azhar Iqbal was born and raised in Karachi. He travelled to the United States for his undergraduate studies and holds a B.A degree in Economics from the University of Pennsylvania. He did his graduate studies in Economics from the New York University prior to his return to Pakistan in pursuit of Islamic Sciences, including Tafseer, Hadith, Arabic Grammar, Islamic Laws and Jurisprudence, under traditional scholars. Shaykh Azhar has attained the eight-year Aalimiyyah Degree from the Wifaq ul Madaris, Pakistan."]}
                </p>
                <p>
                {trans["For over a decade, Shaykh Azhar has been actively engaged in Dawah activities, including delivering lectures in different mosques, educational and professional institutes. He has founded an institute for Traditional Islamic Studies under the name of Hidayah Academy. Besides heading the institute, he also teaches different courses including Tafseer, Hadith and Fiqh."]}
                </p>
                <p>
                {trans["With a team of qualified individuals and experts in different Islamic disciplines, this institution not only imparts Islamic knowledge and skills but also focuses on the spiritual training of its students."]}
                </p>
                <p>
                    {trans["Alhamdulilah, Hidayah Academy has campuses in 4 cities in Pakistan and has established a network portals for online students in 27 countries of the world. By the Grace of Allah this Institute has grown enormously in a short span of 15 years."]}
                </p>
                <h3><strong>{trans["Mufti Abdul Mannan Sb DB"]}</strong></h3>
                <p>
                    {trans["Hazrat Mufti Abdul Mannan Sb DB has dedicated his life for the cause of the deen. His services are widely known and acknowledged in the religious circle. Due to his long association with the field of Ifta, he is now counted among the most popular Islamic Jurists in Pakistan. For his long serving tenure at Jamia Dar ul Uloom Korangi, he has been awarded the title of “Naib Mufti”. He works actively at Jamia Dar ul Uloom Korangi’s Dar ul Ifta. Hidayah Academy’s Takhassus fil Ifta and AskHidayah, among other programs, are blessed with his compassionate supervision."]}
                </p>
                <h3><strong>{trans["Mufti Saleem Memon Sb DB"]}</strong></h3>
                <p>
                {trans["Mufti Saleem Memon Sb has been serving Hidayah Academy for about a decade. He not only actively teaches at Hidayah, but also supervises Hidayah Publishers. He holds an Aalmiyyah Degree from Jamia Dar ul Uloom Korangi. After that, he completed his Takhassus fil Ifta from Mahad us Shaykh, Bahadurabad. He not only supervises the day-to-day activities of AskHidayah, but also approves and ratifies the answers before they are published."]}
                </p>
                </div>
            </Col>
        </Row>
    </Container>
    </div>
  )
}

export default About
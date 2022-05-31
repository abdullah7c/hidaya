import React,{ useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic'
const ReactMic = dynamic(() => import('react-mic').then(mod => mod.ReactMic),{ ssr: false })
import MicRecorder from 'mic-recorder-to-mp3';
const Mp3Recorder = new MicRecorder();

const Recorder = ({setRecording, setAudioBlobURL}) => {

    const [record, setRcord] = useState(false);
	const [isBlocked , setIsBlocked] = useState(false);
	const [isRecording , setIsRecording] = useState(false);
    const [isRecordingStp , setIsRecordingStp] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
		navigator.getUserMedia(
            { audio: true },
            () => { setIsBlocked(false) },
            () => { setIsBlocked(true) },
        );
    }, [])

    useEffect(() => {
        let interval = null;
        if(record){ interval = setInterval(() => { setTime(prevTime => prevTime + 10) }, 10) } else { clearInterval(interval) }
        return () => clearInterval(interval);
    }, [record])
    
    function startRecording(){ 
        setRcord(true);
        if (isBlocked) {
            alert('Permission Denied');
        } else {
            Mp3Recorder.start().then(() => {
                setIsRecording(true);
            }).catch((e) => console.error(e));
        }
    }
    function stopRecording(){
        setRcord(false);
        setTime(0)
        Mp3Recorder.stop().getMp3().then(([buffer, blob]) => {
            const tempBlobURL = URL.createObjectURL(blob)
            setAudioBlobURL(tempBlobURL); setIsRecording(false);
            setIsRecordingStp(true);
        }).catch((e) => console.log(e));
    }
    function onStop(recordedBlob) {
        setRecording(recordedBlob);
    }
    function onData(recordedBlob) { }

  return (
      <div className='questions-layout'>
    <div className="sound-wave-frame">
        <Row>
            <Col md={8} style={{marginLeft:'20px'}}>
            <ReactMic
                record={record}
                className="sound-wave"
                visualSetting="sinewave"
                onStop={onStop}
                onData={onData}
                strokeColor={"grey"}
                backgroundColor="#FFFFFF" 
                mimeType="audio/mp3"
            />
            </Col>
            <Col className='timer'>
                <span className='time'>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((time / 995) % 60)).slice(-2)}</span>
            </Col>
            <Col md={1}>
                <div onClick={!record?startRecording:stopRecording} className='record-btn' style={{textAlign:'left'}}>
                    <FontAwesomeIcon icon={faMicrophoneLines} />
                </div>
            </Col>
        </Row>
    </div>
    </div>
  )
}

export default Recorder
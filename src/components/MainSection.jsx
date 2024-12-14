import { useEffect, useRef, useState } from 'react'
import '../App.css'
import { formatTime } from '../utilities/utilities'
import bot from '../assets/robot.png'
import user from '../assets/user.png'
import send from '../assets/send.png'
import refresh from '../assets/refresh.png'
import { use } from 'react'
export default function MainSection() {
    const [currentMsg, setCurrentMsg] = useState('');
    const msgSectionRef = useRef(null);


    //load messages from local storage if they exists
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('messages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });

    const [isDisabled, setIsDisabled] = useState(false);

    //update local storage with new messages
    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();

        //for empty message
        if (currentMsg.trim() !== '') {
            const randNum = Math.floor(Math.random() * 10);
            const currTime = formatTime(new Date());


            //random scenario for message failure
            if (randNum >= 7) {
                setMessages((prevMsgs) => [
                    ...prevMsgs,
                    { botMsg: false, time: currTime, content: currentMsg, status: "failed" }
                ]);
            }


            //sending message
            else {
                setMessages((prevMsgs) => [
                    ...prevMsgs,
                    { botMsg: false, time: currTime, content: currentMsg, status: "success" },
                    { botMsg: true, time: currTime, content: '...', status: "success" }
                ]);
                setIsDisabled(true);
                setCurrentMsg('');


                //scroll to bottom
                setTimeout(() => {
                    if (msgSectionRef.current) {
                        msgSectionRef.current.scrollTop = msgSectionRef.current.scrollHeight;
                    }
                }, 0);


                //reply as bot
                setTimeout(() => {
                    const botReplyTime = formatTime(new Date());
                    setMessages((prevMsgs) => [
                        ...prevMsgs.slice(0, -1),
                        { botMsg: true, time: botReplyTime, content: 'This is a bot reply', status: "success" }
                    ]);
                    setIsDisabled(false);
                }, 2500);
            }
        }
    };

    return (
        <div className='main-wrapper'>
            <div className='messages-section' ref={msgSectionRef}>
            <p style={{alignSelf:"center"}}>Type a message to start the conversation</p>
                {messages.map((message, idx) => {
                    return <div key={idx} className='message' style={{ alignItems: message.botMsg === true ? 'start' : 'end' }}>
                        
                        <div className='msg-upper' style={{ flexDirection: message.botMsg === true ? 'row' : 'row-reverse' }}>

                            <img src={message.botMsg === true ? bot : user} />
                            {message.status === 'success' && <div className='msg-hover' style={{ left: message.botMsg === true ? '190px' : '-250px' }}>
                                <div className='hover-outer'>
                                    <p>You</p>
                                    <p>Sent at {message.time}</p>
                                    <button>Delete</button>
                                    <button>Edit</button>
                                </div>
                            </div>}

                            {message.content === '...'
                                ? (
                                    <p
                                        className='msg-content typing-dots'
                                        style={{
                                            backgroundColor: message.botMsg === true ? '#f4f4f5' : message.status === 'failed' ? '#ef4444' : 'black',
                                            color: message.botMsg === true ? 'black' : 'white'
                                        }}
                                    >
                                        <span>.</span>
                                        <span>.</span>
                                        <span>.</span>
                                        
                                    </p>
                                )
                                : (
                                    <p
                                        className='msg-content'
                                        style={{
                                            backgroundColor: message.botMsg === true ? '#f4f4f5' : message.status === 'failed' ? '#ef4444' : 'black',
                                            color: message.botMsg === true ? 'black' : 'white'
                                        }}
                                    >
                                        {message.content}
                                    </p>
                                )
                            }                   

                            {message.botMsg === false && message.status === 'failed' && <img className='refresh-img' src={refresh} onClick={sendMessage} />}
                        </div>
                        {message.status === 'failed' && <p className='time' style={{ paddingLeft: message.botMsg === true ? "45px" : '0px', paddingRight: message.botMsg === true ? "0px" : '45px' }}>Failed to send message, click to retry</p>}
                        {message.status === 'success' && <p className='time' style={{ paddingLeft: message.botMsg === true ? "45px" : '0px', paddingRight: message.botMsg === true ? "0px" : '45px' }}>{message.time}</p>}

                    </div>
                })}
            </div>
            <div className='input-section'>
                <form onSubmit={sendMessage} className='input-outer'>
                    <input disabled={isDisabled} value={currentMsg} className='input-box' placeholder='Type your message here' onChange={(e) => setCurrentMsg(e.target.value)} />
                    <button className='send-btn' type='submit' disabled={isDisabled}><img src={send} /></button>
                </form>
            </div>
        </div>
    )
}















// []Ensure the interface is responsive and works seamlessly across devices and screen sizes.


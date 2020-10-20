import React,{ useEffect,useState } from 'react'
import './Chat.css'

import {Avatar,IconButton} from '@material-ui/core'
import {AttachFile,MoreVert,SearchOutlined,InsertEmoticon,Mic} from '@material-ui/icons'
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase"


function Chat() {
    const [input,setInput] = useState('');
    const {roomId}  = useParams();
    const [roomname,setRoomName] = useState("")
    const [messages,setMessages] = useState([])
    const[{user},dispatch] = useStateValue()

    useEffect(() => {
    if(roomId){
        db.collection('Rooms').doc(roomId).onSnapshot((snapshot) =>
            setRoomName(snapshot.data().name)
        )
        db.collection('Rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => 
            setMessages(snapshot.docs.map(doc => doc.data()))
        )
    }
    }, [roomId])



    const sendMessage = (e) =>{
        e.preventDefault();
        console.log('hello')

        db.collection('Rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput('')
    }

    return (
        <div className="chat">
         <div className='chat_header'>
        <Avatar  src = {`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*5000)}.svg`}/>
        <div className='chat_headerInfo'>
        <h3>{roomname}</h3>    
        <p>Last seen{""}{new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
        </div> 

        <div className='chat_headerRight'>
            <IconButton>   
            <AttachFile/>
            </IconButton>
            <IconButton>
            <SearchOutlined/>
            </IconButton>
            <IconButton>
            <MoreVert></MoreVert>
            </IconButton>

        </div>
         </div>
         <div className='chat_body'>
             {messages.map((message) => (
                  <p className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
                  <span className='chat_name'>{message.name}</span>
                    {message.message}
             <span className='chat_timestamp'>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                  </p>
              
             ))}
         </div>


         <div className='chat_footer'>
         <IconButton>
         <InsertEmoticon/>
         </IconButton>    
         <form> 
             <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a message'></input>
             <button onClick= {sendMessage} type= 'submit'>Send a message</button>
         </form>
         <Mic/>
         </div>
        
        </div>
    )
}

export default Chat

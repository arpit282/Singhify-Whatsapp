import React, { useEffect,useState } from 'react'
import './SidebarChat.css'
import { Avatar} from '@material-ui/core'
import db from './firebase'
import { Link } from 'react-router-dom';

function SidebarChat({addNewChat,id,name}) {
    const [seed,setSeed] = useState('');
    const [messages,setMessage] = useState("")


    useEffect(() => {
      if(id){
          db.collection('Rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshort) =>
          setMessage(snapshort.docs.map((doc) =>
          doc.data())))
      }  

    }, [])

    useEffect(() =>{
        setSeed(Math.floor(Math.random()*5000))
        
    },[]);

    const createChat = ( ) =>{
        const roomName = prompt('Please enter the name for chat');
        if(roomName){
            db.collection('Rooms').add({
                name:roomName
            })
        }
    }


    return !addNewChat ?(
        <Link to ={`/rooms/${id}`}>

        <div className='sidebarChat'>
        <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
        <div className='sidebarChat_info'>
        <h3>{name}</h3> 
        <p>{messages[0]?.message}</p>   
        </div> 
       </div>
       </Link>
    ): (
        <div onClick={createChat} className ='sidebarChat'>
          <h3>Add New Chat</h3>  
        </div>
    );
}

export default SidebarChat

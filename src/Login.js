import React from 'react'
import {Button} from '@material-ui/core'
import './Login.css'
import {auth,provider} from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

function Login() {
    const [{},dispatch] = useStateValue()

    const signIn = () =>{
        auth.signInWithPopup(provider).then(result =>
            dispatch({
                type:actionTypes.SET_USER,
                user: result.user,
            })
        ).catch((error) => alert(error.message)) 
    }

    return (
        <div className='login'>
            <div className='login_container'>
            <img alt = "" src = 'https://lifesly.com/wp-content/uploads/2020/04/1587039400_Pros-and-cons-of-WhatsApp-web-1024x1024.png'/>
            
            <div className='login_text'>
                <h1>Sign in to Whatsapp</h1>
            </div>
            <Button onClick={signIn}>
                Sign In with Google
            </Button>
            </div>
        </div>
    )
}

export default Login

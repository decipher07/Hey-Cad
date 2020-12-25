import React from 'react'
import './Main.css'
import GoogleButton from 'react-google-button'
import { Link,Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';

function onSubmit () {
        console.log("CLicked")
        return  <Redirect  to="http://localhost:5000/login" />
    
 }

function Main() {
    return (
        <div className="Main">
            <h1 className="login">Login</h1>
            <Button variant="contained" color="primary" href="http://localhost:5000/login"> Sign In With Google </Button>
        </div>
    )
}

export default Main

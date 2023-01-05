import { useState, useEffect } from "react";
export default function App(){

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        name: ''
    })

    // create bookmarks
    const [ bookmark, setBookmark ] = useState({
        title: '',
        url: '', 
    })
    const [token, setToken] = useState('')

    // login
    const login = async () =>{
        try {
            const response = await tech('./api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            const tokenResponse = await response.json()
            setToken(tokenResponse)
            localStorage.setItem('token', JSON.stringify(tokenResponse))
        } catch (error) {
            console.error(error)  
        }
    }
    // signUp

    const signUp = async () =>{
        try {
            const response = await tech('./api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...credentials })
            })
            const tokenResponse = await response.json()
            setToken(tokenResponse)
            localStorage.setItem('token', JSON.stringify(tokenResponse))
        } catch (error) {
            console.error(error)  
        }
    }

    const createBookmark = async() => {
        try {
            const response = await fetch('./api/boomarks', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            
        }
    }

    return(
        <>
        <h1>Hello World</h1>
        </>
    )
}
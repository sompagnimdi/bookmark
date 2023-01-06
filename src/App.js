import { useState, useEffect } from "react";
import Auth from "./components/Auth/Auth";
import CreateBookmark from "./components/CreateBookmark/CreateBookmark";
import BookmarkList from "./components/BookmarkList/BookmarList";


export default function App(){

    /*
    Login, SignUp, CreateBookmark ListBookmarsByUser, DeleteBookmark, UpdateBookmark */

    const handleChangeAuth = (event) => {
        setCredentials({...bookmark, [event.target.name]:: event.target.value })
    }
    const handleChange = (event) => {
        setBookmark({...bookmark, [event.target.name]: event.target.value })
    }
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        name: ''
    })

    const [bookmark, setBookmark] = useState({
        title: '',
        url: '', 
    })
    const [bookmarks, setBookmarks] = useState([])


    const [token, setToken] = useState('')

    
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
                },
                body: JSON.stringify(...bookmark)
            })
            const data = await response.json()
            setBookmarks([data, ...bookmarks])
        } catch (error) {
            console.error(error)
        } finally {
            setBookmark({
                title: '',
                url: ''
        })
        }
    }
    const ListBookmarsByUser = async () => {
        try {
            const response = await tech('/api/users/bookmarks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            const data = await response.json()
            setBookmarks(data)
        } catch (error) {
            console.error(error)
        }
    }
    const DeleteBookmark = async(id) => {
        try {
            const response = await tech(`/api/bookmarks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            const bookmarksCopy = [...bookmarks]
            const index = bookmarksCopy.findIndex( bookmark => id === bookmark._id )
            bookmarksCopy.slice(index, 1)
            setBookmarks(bookmarksCopy)
        } catch (error) {
            console.error(error)
        }
    }

    const UpdateBookmark = async(id, updateData) => {
        try {
            const response = await tech(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            })
            const data = await response.json()
            const bookmarksCopy = [...bookmarks]
            const index = bookmarksCopy.findIndex( bookmark => id === bookmark._id )
            bookmarksCopy[index] = {...bookmarksCopy[index], ...updateData}
            setBookmarks(bookmarksCopy)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (tokenData && tokenData !== 'null' && tokenData !== 'undefined'){
            ListBookmarsByUser()
        }
       
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (tokenData && tokenData !== 'null' && tokenData !== 'undefined'){
            setToken(JSON.parse(tokenData))
        }
       
    }, [])

    return(
        <>
        <Auth
        login={login}
        credentials={credentials}
        handleChange={handleChangeAuth}
        signUp={signUp}
        />
        <CreateBookmark
        createBookmark={createBookmark}
        bookmark={bookmark}
        handleChange={handleChange}
        />
        <BookmarkList
        bookmarks={bookmarks}
        DeleteBookmark={DeleteBookmark}
        UpdateBookmark={UpdateBookmark}
        />
    </>
    )
}


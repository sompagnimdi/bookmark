import { useState, useEffect } from "react";
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
            const index = bookmarksCopy.findIndex( bookmark => id === bookmark.id )
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
            const index = bookmarksCopy.findIndex( bookmark => id === bookmark.id )
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
        <h2>Login</h2>
        <form onSubmit={(e) => {
            e.preventDefault()
            login()
        }}>
            <input type="text" value={credential.email} name= "email" onChange={handleChangeAuth} placeholder={'Email Here'}></input>
            <input type="password" value={credential.password} name="password" onChange={handleChangeAuth} placeholder={'Password'}></input>
            <input type="submit" value="Login as an Existing User"/>
        </form >
        <h2>SignUp</h2>
        <form  onSubmit={(e) => {
            e.preventDefault()
            signUp()
        }}>
            <input type="text" value={credential.email} name= "email" onChange={handleChangeAuth} placeholder={'Email'}></input>
            <input type="name" value={credential.name} name="name" onChange={handleChangeAuth} placeholder={'Name'}></input>
            <input type="password" value={credential.password} name="password" onChange={handleChangeAuth} placeholder={'Password'}></input>
            <input type="submit" value="Sign Up as a New User"/>
        </form>
        <h2>Create A BookMarks</h2>
        <form onSubmit={(e) => {
            e.preventDefault()
            createBookmark()
        }}>
            <input type="text" value={bookmark.title} name="title" onChange={handleChange} placeholder={'Title'}></input>
            <input type="text" value={credential.url} name="url" onChange={handleChange} placeholder={'Url'}></input>
            <input type="submit" value="Create Bookmark"/>
        </form>
        <ul>
            {bookmarks.length ? bookmarks.map(item =>(
                <li key={item._id}>
                    <h4>{item.title}</h4>
                    <a href={item.url} target="_blank"> {url}</a>
                </li>
            )): <>No BookMarks Added</>}
        </ul>
        
        </>
    )
}

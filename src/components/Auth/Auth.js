import { useEffect, useState } from "react"
import Login from "../Login/Login"
import SignUp from "../SignUp/SignUp"


export default function Auth({
    login,
    SignUp,
    credentials,
    handleChangeAuth
}){
    const [showSignUp, setShowSignUp] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getToken = () => {
          const token = window.localStorage.getItem('token')
            if(!token || token === 'null' || token === 'undefined') return null
            const payload = JSON.parse(window.atob(token.split('.')[1]))
            if(payload.exp < Date.now()/1000){
            window.localStorage.removeItem('token')
            return null
        }
         return token
        }
        const token = getToken()
        const data = token ? JSON.parse(window.atob(token.split('.')[1])).user: null
        setUser(data)
    }, [])

    return(
        <>
        {
            user && user.name 
            ? <h1>Welcome{user.name.toUpperCase()}</h1> : 
            <>
                 <button
                    onClick={() => {
                        setShowSignUp(!showSignUp)
                 }}
                >
                    {showSignUp? 'sign Up with A New Account Below or Click Here To Login As An Existing User': 'Welcome Back'}
                </button>
          {
                 showSignUp
                 ? <SignUp
                 SignUp={SignUp}
                 credentials={credentials}
                 handleChangeAuth={handleChangeAuth}
                 />
                 : <Login
                 login={login}
                 credentials={credentials}
                 handleChangeAuth={handleChangeAuth}
                 />
          }  
            </>
        }
            
        </>
    )
}


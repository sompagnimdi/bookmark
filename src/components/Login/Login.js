export default function Login({
    login,
    credentials,
    handleChangeAuth
}){
    return(
        <>
            <h2>Login</h2>
            <form onSubmit={(e) => {
             e.preventDefault()
             login()
        }}
         >
            <input type= 'text' value={credential.email} name= 'email' onChange={handleChangeAuth} placeholder={'Email Here'}></input>
            <input type= 'password' value={credential.password} name= 'password' onChange={handleChangeAuth} placeholder={'Password'}></input>
            <input type= 'submit' value= 'Login as an Existing User' />
        </form >
        </>
    )
}

export default function SignUp({
    credentials,
    signUp,
    handleChangeAuth
}){
    return(
        <>
        <h2>SignUp</h2>
        <form  onSubmit={(e) => {
            e.preventDefault()
            signUp()
        }}
        >
            <input type="text" value={credential.email} name= "email" onChange={handleChangeAuth} placeholder={'Email'}></input>
            <input type="name" value={credential.name} name="name" onChange={handleChangeAuth} placeholder={'Name'}></input>
            <input type="password" value={credential.password} name="password" onChange={handleChangeAuth} placeholder={'Password'}></input>
            <input type="submit" value="Sign Up as a New User"/>
        </form>
        </>
    )
}

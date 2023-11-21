import {useState} from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'


const Auth =()=>{
    return<div className='auth'>
        <Login/>
        <Register/>
    </div>
}


//Login Form=======================================
const Login = ()=>{
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const[_,setCookies] = useCookies(['access_token'])
    const navigate = useNavigate()
    const onSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/auth/login',{
                username,
                password
            });
            setCookies('access_token',response.data.token)
            window.localStorage.setItem("userID",response.data.userID)
            navigate('/')
            alert('Login Successful!')
        } catch (error) {
            console.error(error)
        }

    }
    return<Form
            username={username} 
            setUserName={setUserName} 
            password={password} 
            setPassword={setPassword}
            label='login'
            onSubmit={onSubmit}
            />
}

//Register Form====================================
const Register = ()=>{
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')

    const onSubmit=async(e)=>{
        e.preventDefault()
        try {
            await axios.post('http://localhost:3001/auth/register',{
                username,
                password
            })
            alert("Registration Successful!")
        } catch (error) {
            console.error(error)
        }
        setUserName('')
        setPassword('')
    }
    return<Form 
            username={username} 
            setUserName={setUserName} 
            password={password} 
            setPassword={setPassword}
            label='Register'
            onSubmit={onSubmit}
        />
}


//Form component=============================================================
const Form =({username,setUserName,password,setPassword,label,onSubmit})=>{
    return<div className='register'>
       <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className='form-body'>
            <label htmlFor="username">User Name:</label>
            <input 
            type='text'
            id='username'
            value={username}
            onChange={e=>setUserName(e.target.value)}/>
        </div>
        <div className='form-body'>
            <label htmlFor="password">Password:</label>
            <input 
            type='password' 
            id='password'
            value={password} 
            onChange={e=>setPassword(e.target.value)}/>
        </div>
        <div className='btnDiv'>
         <button className='submitBtn' type='submit'>{label}</button>
        </div>
       </form>
    </div>
}

export default Auth
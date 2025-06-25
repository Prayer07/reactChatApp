import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {

  const [user, setUser] = useState(
    {
      fname:"",
      lname:"",
      email:"",
      password:""
    }
  );

  const [message, setMessage] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>{
    console.log(e.target.value);
    console.log(e.target.name);
    setUser({...user, [e.target.name]: e.target.value});
  }


  const validate = () =>{
    const newError = {};
    
    if(!user.fname.trim()){
      newError.fname = "First name is required"
    }

    if(!user.lname.trim()){
      newError.lname = "Last name is required"
    }

    if(!user.email.trim()){
      newError.email = "Email is required"
    }

    if(!user.password.trim()){
      newError.password = "Password required"
    }else if((user.password).length < 6){
      newError.password = "Password is weak"
    }


    return newError
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const newError  = validate()
    setMessage(newError)

    if(Object.keys(newError).length > 0){
      return
    }

    setLoading(true)

    try {
      const res = await fetch("http://localhost:2007/signup",{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(user),
      })

      const data = await res.json()

      if(res.ok){
        alert(data.message)
        setTimeout(() =>{
          navigate("/login")
        }, 2000)
      }else{
        setMessage({general: data.message})
      }

    } catch (err) {
      console.error(err)
      setMessage({general: "Something went wrong"})
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="signup">
      <Card className="w-full max-w-sm" id="color">
        <CardHeader>
          <CardTitle>Sign-Up</CardTitle>
          <CardDescription>
            Fill in all the fields correctly to create an account with us
          </CardDescription>
          <CardAction>
            <Link to={"/login"}><Button>Login</Button></Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="input">
                {message.fname && <span style={{ color: "red" }}>{message.fname}</span>}
                <Input
                  id="fname"
                  type="text"
                  name="fname"
                  value={user.fname}
                  placeholder="First Name"
                  onChange={handleChange}
                />

                {message.lname && <span style={{ color: "red" }}>{message.lname}</span>}
                <Input
                  id="lname"
                  type="text"
                  name="lname"
                  value={user.lname}
                  placeholder="Last Name"
                  onChange={handleChange}
                />

                <span style={{ color: "red" }}>{message.email}</span>
                <span style={{ color: "red" }}>{message.general}</span>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={user.email}
                  placeholder="Email e.g...m@example.com"
                  onChange={handleChange}
                />

                {message.password && <span style={{ color: "red" }}>{message.password}</span>}
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={user.password}
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center" id='forgotten-password'>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Button className="w-full">
              Login
            </Button>
          </form>
          {loading && <p style={{textAlign:"center", marginTop:"20px"}}>Signing up....</p>}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full" id="google">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

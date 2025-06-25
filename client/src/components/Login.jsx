import React, { useState } from 'react'
import {Button} from "@/components/ui/button"
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

export default function Login() {

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>{
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError("")
    setMessage("")

    if (!user.email || !user.password){
      setError("All fields are required")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("http://localhost:2007/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user),
      })

      const data = await res.json()

      if(res.ok){
        setMessage("Login Successfully")
        sessionStorage.setItem("email", data.email)
        alert(data.message)
      }else{
        setError(data.message || "Login failed")
      }

    } catch (err) {
      console.error(err)
      setError("Server error. Try again")
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
    <div className="login">
            <Card className="w-full max-w-sm" id="color">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email and password to login into your account
            </CardDescription>
            <CardAction>
              <Link to={"/signup"}><Button>SignUp</Button></Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="input">
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="m@example.com"
                    onChange={handleChange}
                  />

                  <Input id="password"
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
                  {error && <p style={{color:"red", marginBottom:"15px"}}>{error}</p>}
                  {message && <p style={{color:"green", marginBottom:"15px"}}>{message}</p>}
                  {loading && <p style={{textAlign:"center", marginBottom:"15px"}}>Logging in...</p>}
            <Button className="w-full">
              Login
            </Button>
            </form> 
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button variant="outline" className="w-full" id="google">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
        </div>
    </>
  )
}

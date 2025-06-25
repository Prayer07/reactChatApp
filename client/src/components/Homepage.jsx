import React from 'react'
import { Link } from 'react-router-dom'
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

function Homepage() {
  return (
    <>
    <h1>Homepage</h1>
    <div className="create">
    <Card className="color">
      <CardContent>
        <Link to={"/login"}><Button>Login</Button> </Link>        
      </CardContent>
    </Card>
    <Card className="color">
      <CardContent>
        <Link to={"/signup"}> <Button>SignUp</Button> </Link>    
      </CardContent>
    </Card>
    </div>
    <div className="instructions">
      <p>If u already have an account <br /> with us click the Login button</p>
      <p>If u dont have an account <br /> with us click the Sign Up button</p>
    </div>
    <marquee behavior="" direction="left">Welcome to Ezenwa's Chat App😎👌👏👏🤷‍♀️</marquee>
    </>
  )
}

export default Homepage
import User from "../models/user.model.js";
import dotenv from "dotenv"
import bcrypt from "bcrypt"

// dotenv.config()

const signup = async (req, res) => {
    const {fname, lname, email, password} = req.body

    try {

        const takenEmail = await User.findOne({email})

        if(takenEmail) return res.status(400).json({message: `This email already exist`})
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fname, 
            lname,
            email,
            password: hashedPassword
    })

    await newUser.save()
    res.status(201).json({message: "Signed up successfully"})

    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({message: "Server error"})
    }
}

const login = async (req, res) =>{
    const {email, password} = req.body

    try {
        const user = await User.findOne({email}) 
        const userPassword = await bcrypt.compare(password, user.password)

        if(!user || !userPassword){
            res.status(400).json({message: "Incorrect email or password"})
        }

        res.status(200).json({
            user: {
                email: user.email,
            }
        })

    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

const chat = async (req, res) =>{
    try {
        const user = await User.findOne({email: req.user.email})

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({
            email: user.email,
        })

    } catch (error) {
        res.status(500).json({message: "Server error"})
    }

}

export {signup, login, chat}
import { generateToken } from "../utils/token.js";
import Users from "./../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js"

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log("name ===> ", fullName);

    if (!fullName || !email || !password) {
      res.status(400).json({ message: "Please fill all the required  fields" });
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be atleast of 6 characters" });
    }

    const user = await Users.findOne({ email });

    if (user) {
      res.status(400).json({ message: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
       generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser?.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User " });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signin = async (req, res) => {
  
  try {
   const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

     generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const update_profile = async(req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      res.status(400).json({ message: "No profile Picture to Change" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updateUser = await Users.findByIdAndUpdate(userId, {profilePic : uploadResponse.secure_url}, {new:true})
    res.status(200).json(updateUser);

  } catch (error) {
    console.log("Error in update_profile controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


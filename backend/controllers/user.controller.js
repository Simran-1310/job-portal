const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");

// Register
const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role, bio } = req.body; // bio bhi user se
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use", success: false });

    let profilePhotoUrl = "";
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
        bio: bio || "",
        skills: []
      }
    });

    return res.status(201).json({ message: "Account created successfully", success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Incorrect email or password", success: false });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return res.status(400).json({ message: "Incorrect email or password", success: false });
    if (user.role !== role) return res.status(400).json({ message: "Invalid role selected", success: false });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    const userData = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile // <-- user se directly le lo, jo Cloudinary URL aur bio saved hai
    };

    return res
      .status(200)
      .cookie("token", token, { maxAge: 24*60*60*1000, httpOnly: true, secure: true, sameSite: "None" })
      .json({ message: `Welcome back ${user.fullName}`, user: userData, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};


// Logout
const logOut = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0, httpOnly: true, secure: true, sameSite: "None" })
      .json({ message: "Logged out successfully", success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};


// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const userId = req.id; // Ensure this comes from auth middleware
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    let skillsArray = typeof skills === "string" ? skills.split(",").map(s => s.trim()) : [];

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    user.profile = user.profile || {};
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    //resume comes later here
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;   //save the cloudinary url
      user.profile.resumeOriginalName = file.originalname;   //save the original file name
    }
    await user.save();

    const userData = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({ message: "Profile updated successfully", user: userData, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};

module.exports = {
  register,
  login,
  logOut,
  updateProfile,
};
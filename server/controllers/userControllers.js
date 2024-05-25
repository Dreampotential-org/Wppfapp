const HttpError = require("../models/errorModels");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require("uuid");

// Register User
const register = async (req, res, next) => {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password || !password2) {
        return next(new HttpError("Fill the details", 422));
    }
    const newName = name.toLowerCase();
    const exitName = await User.findOne({ name: newName });
    const newEmail = email.toLowerCase();
    const exitEmail = await User.findOne({ email: newEmail });
    if (exitName) {
        return next(new HttpError("Name already exists", 422));
    }
    if (exitEmail) {
        return next(new HttpError("Email already exists", 422));
    }
    if ((password.trim()).length < 6) {
        return next(new HttpError("Password must be 6 letters", 422));
    }
    if (password != password2) {
        return next(new HttpError("Password doesn't match", 422));
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await User.create({ name, email: newEmail, password: passwordHash });
    res.status(201).json(newUser);
}

// Login User
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new HttpError("Fill the details", 422));
    }
    const newEmail = email.toLowerCase();
    const user = await User.findOne({ email: newEmail });
    if (!user) {
        return next(new HttpError("User emailId not found", 422));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new HttpError("Invalid password", 422));
    }
    const { _id: id, name } = user;
    const token = jwt.sign({ id, name }, process.env.JWT_KEY, { expiresIn: '1d' });
    res.status(200).json({ token, id, name });
}

// Get User by ID
const getUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
        return next(new HttpError("User not found.", 404));
    }
    res.status(200).json(user);
}

// Change Avatar
const changeAvatar = async (req, res, next) => {
    if (!req.files || !req.files.avatar) {
        return next(new HttpError("Please choose only png, jpeg, jpg", 422));
    }
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new HttpError("User not found", 404));
    }
    // Delete the old pic if exists
    if (user.avatar) {
        fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (unlinkErr) => {
            if (unlinkErr) {
                return next(new HttpError(unlinkErr.message, 500));
            }
        });
    }
    const { avatar } = req.files;
    if (avatar.size > 500000) {
        return next(new HttpError("File size is too big, please upload below 500kb", 422));
    }
    let fileName = avatar.name;
    const splitFileName = fileName.split('.');
    let newFileName = splitFileName[0] + uuid() + '.' + splitFileName[splitFileName.length - 1];
    avatar.mv(path.join(__dirname, '..', 'uploads', newFileName), async (mvErr) => {
        if (mvErr) {
            return next(new HttpError(mvErr.message, 500));
        }
        const updateAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFileName }, { new: true });
        if (!updateAvatar) {
            return next(new HttpError("Avatar not changed.", 404));
        }
        res.status(200).json(updateAvatar);
    });
}

// Edit User (Stub)
const editUser = async (req, res, next) => {
    try {
        const {name,email,currentPassword,newPassword,confirmNewPassword}=req.body;
        if(!name || !email || !currentPassword || !newPassword){
            return next(new HttpError("Fill the details", 422));
        }
        // user database
        const user=await User.findById(req.user.id);
        if(!user){
            return next(new HttpError("User not found", 404));
        }
        const exitUser=await User.findOne({email})
        if(exitUser && (exitUser._id != req.user.id)){
            return next(new HttpError("Email already exists", 422));
        }
        const validateUserpassword=await bcrypt.compare(currentPassword,user.password)
        if(!validateUserpassword){
            return next(new HttpError("Invalid password", 422));
        }
        if((newPassword.trim()).length < 6){
            return next(new HttpError("Password must be 6 letters", 422));
        }
        if(newPassword!= confirmNewPassword){
            return next(new HttpError("New Password doesn't match", 422));
        }
        const salt=await bcrypt.genSalt(10)
        const passwordHash=await bcrypt.hash(newPassword,salt)
        const newUserPassword=await User.findByIdAndUpdate(req.user.id,{name,email,password:passwordHash},{new:true})
        res.status(200).json(newUserPassword)

    } catch (error) {

        return next(new HttpError("Avatar not changed.", 404));

        
    }
}

// Get Authors
const getAuthor = async (req, res, next) => {
    const author = await User.find().select('-password');
    res.status(200).json(author);
}

module.exports = {
    getUser,
    changeAvatar,
    editUser,
    getAuthor,
    loginUser,
    register,
}
 
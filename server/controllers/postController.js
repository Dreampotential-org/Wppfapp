const Posts=require('../models/postsModel')
const HttpError = require("../models/errorModels");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require("uuid");



const creatPost=async(req,res,next)=>{
    try {
        const {title,category,description}=req.body;
        if(!title || !category || !description || !req.files){
            return next(new HttpError("Fill the details", 422));
        }
        const {thambnail}=req.files;
        if(thambnail.size > 5000000) {
            return next(new HttpError("File size is too big, please upload below 500kb", 422));
        }
        let fileName = thambnail.name;
        const splitFileName = fileName.split('.');
        const newFileName=splitFileName[0] + uuid() + '.' + splitFileName[splitFileName.length-1]
        thambnail.mv(path.join(__dirname, '..', '/uploads', newFileName), async (err) => {
            if (err) {
                return next(new HttpError(err.message, 500));
            }else{
                const Newpost=await Posts.create({
                    title,
                    category,
                    description,
                    thambnail: newFileName,
                    creator: req.user.id,
                })
               if(!Newpost){
    
                return next(new HttpError("Invalid Posts", 422));
               }
               const currentPost=await User.findById(req.user.id);
               const postCount=currentPost.posts+1;
               await User.findByIdAndUpdate(req.user.id, {posts: postCount})
               res.status(201).json(Newpost);
                
            }
           
        })


    } catch (error) {
        return next(new HttpError("Invalid Posts", 422));
        
    }
}


const getPosts=async(req,res,next)=>{
    try {
        const posts=await Posts.find().sort({updatedAt: -1});
        if(!posts){
            return next(new HttpError("No posts are found", 422));
        }
        res.status(200).json(posts);
        
    } catch (error) {
        return next(new HttpError("No posts are found", 422));

    }
}



const getSinglePost=async(req,res,next)=>{
    try {
        const postId=req.params.id;
        const post=await Posts.findById(postId)
        if(!post){
            return next(new HttpError("No posts are found", 422));
        }
        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError(error));
        
    }
}



const getCatPosts=async(req,res,next)=>{
    try {
        const {category}=req.params;
        const caatPost=await Posts.find({category}).sort({createdAt: -1});
        if(!caatPost){
            return next(new HttpError("No catagory are found", 422));
        }
        res.status(200).json(caatPost);
    } catch (error) {
        return next(new HttpError(error));

        
    }
}


const getUserPost=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const posts=await Posts.find({creator: id}).sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error));

        
    }
}

const editPosts = async (req, res, next) => {
    let fileName;
    let newFileName;
    let updatedPost;
    const postId = req.params.id;
    const { title, category, description } = req.body;

    if (!title || !category || description.length < 12) {
        return next(new HttpError("Fill the details", 422));
    }

    const oldPost = await Posts.findById(postId);
    if (!oldPost) {
        return next(new HttpError("Post not found", 404));
    }

    if (req.user.id !== oldPost.creator.toString()) {
        return next(new HttpError("You are not authorized to edit this post", 403));
    }

    if (!req.files || !req.files.thambnail) {
        updatedPost = await Posts.findByIdAndUpdate(postId, { title, category, description }, { new: true });
    } else {
        if (oldPost.thambnail) {
            fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thambnail), (err) => {
                if (err) {
                    return next(new HttpError(err.message, 500));
                }
            });
        }

        const { thambnail } = req.files;
        if (thambnail.size > 5000000) {
            return next(new HttpError("File size is too big, please upload below 5MB", 422));
        }

        fileName = thambnail.name;
        const splitFileName1 = fileName.split('.');
        newFileName = splitFileName1[0] + uuid() + '.' + splitFileName1[splitFileName1.length - 1];

        thambnail.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
            if (err) {
                return next(new HttpError(err.message, 500));
            }

            updatedPost = await Posts.findByIdAndUpdate(postId, { title, category, description, thambnail: newFileName }, { new: true });

            if (!updatedPost) {
                return next(new HttpError("Could not update the post", 422));
            }

            res.status(200).json(updatedPost);
        });

        return; // Ensure the response is only sent once the file move is complete
    }

    if (!updatedPost) {
        return next(new HttpError("Could not update the post", 422));
    }

    res.status(200).json(updatedPost);
};


const deletePost=async(req,res,next)=>{
    try {
        const postId=req.params.id;
        if(!postId){
            return next(new HttpError("No posts are found", 422));
        }
        const post=await Posts.findById(postId);
        const fileName=post?.thambnail;
        if(req.user.id == post.creator){
        fs.unlink(path.join(__dirname,'..','uploads',fileName),async (err)=>{
            if(err){
                return next(new HttpError(err.message, 500));
            }else{
                await Posts.findByIdAndDelete(postId)

                const currentUser=await User.findById(req.user.id)
                const postCount=currentUser?.posts-1;
                await User.findByIdAndUpdate(req.user.id, {posts: postCount})
                res.status(200).json({message: `post ${postId} has deleted`});
        }
    })
}    else{
    return next(new HttpError("You are not authorized to delete this post", 401));
}
       
    } catch (error) {
        return next(new HttpError(error.message, 500));
        
    }
}

module.exports={
    creatPost,
    getPosts,
    getSinglePost,
    getCatPosts,
    getUserPost,
    editPosts,
    deletePost,
}
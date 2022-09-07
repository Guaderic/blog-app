import PostModel from "../models/Post.js";
import e from "express";

export const getLastTags = async (req, res)=>{
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалося знайти статтю'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            texts: req.body.texts,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })
        const post = await doc.save();

        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалося створити статтю'
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалося знайти статтю'
        })
    }
}
export const getOne =  async (req, res) => {
    try {
        const postId = req.params.id

        await PostModel.findOneAndUpdate({
                _id: postId,
            },
            {
                $inc: {viewsCount: 1},
            },
            {
                returnDocument: 'after',
            },
            (err, doc)=>{
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        message: 'Не вдалося повернути статтю'
                    })
                }
                if(!doc){
                    return res.status(404).json({
                        message:'Стаття не знайдена'
                    })
                }
                res.json(doc)
            }
            )

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалося знайти статтю'
        })
    }
}
export const remove =  async (req, res) => {
    try {
        const postId = req.params.id;

       await PostModel.findByIdAndDelete({
            _id: postId,
        },
            (err, doc)=>{
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        message: 'Не вдалося видалити статтю'
                    })
                }
                if(!doc){
                    return res.status(404).json({
                        message:'Стаття не знайдена'
                    })
                }
                res.json({
                    success:true,
                })
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не вдалося знайти статтю'
        })
    }
}
export const update = async (req, res)=>{
    try {
        const postId = req.params.id;

        await PostModel.findOneAndUpdate({
            _id: postId,
        },{
            title: req.body.title,
            texts: req.body.texts,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })
        res.json({
            success: true,
        })
    }catch (err){
        console.log(err)
        res.status(500).json({
            message: 'Не вдалося оновити статтю'
        })
    }
}

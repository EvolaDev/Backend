import { Request, Response } from 'express'
import Post from '../schemas/Post'
import { IPostBodyRequest } from './IPostController'

class PostController {
    async create(req: Request, res: Response) {
        try {
            const { author, title, content, picture } = req.body as IPostBodyRequest
            const post = await Post.create({ author, title, content, picture })
            res.json(post)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getAll(_req: Request, res: Response) {
        try {
            const posts = await Post.find()
            return res.json(posts)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getPost(req: Request, res: Response) {
        try {
            const { id } = req.params
            if (!id) res.status(400).json({ message: 'Post id is not found' })
            const post = await Post.findById(id)
            return res.json(post)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const post = req.body
            if (!post._id) res.status(400).json({ message: 'Post id is not specified' })
            const updatedPost = await Post.findByIdAndUpdate(post.id, post, { new: true })
            return res.json(updatedPost)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            if (!id) res.status(400).json({ message: 'Post id is required' })
            const post = await Post.findByIdAndDelete(id)
            return res.json(post)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default new PostController()

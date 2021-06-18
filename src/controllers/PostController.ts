import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import PostService from '../services/PostService'
import { IPostBodyRequest } from './IPostController'

class PostController {
    async create(req: Request, res: Response) {
        try {
            console.log(req.body)
            const post = await PostService.create(req.body, <UploadedFile>req.files?.picture)
            res.json(post)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async getAll(_req: Request, res: Response) {
        try {
            const posts = await PostService.getAll()
            return res.json(posts)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async getPost(req: Request, res: Response) {
        try {

            const post = await PostService.getPost(req.params.id)
            return res.json(post)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedPost = await PostService.update(req.body)
            return res.json(updatedPost)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const post = await PostService.delete(req.params.id)
            return res.json(post)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

export default new PostController()

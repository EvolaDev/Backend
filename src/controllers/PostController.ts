import { Request, Response } from 'express'
import formidable, { Fields } from 'formidable'
import PostService from '../services/PostService'
import { IPostBodyRequest } from './IPostController'

class PostController {
    // eslint-disable-next-line require-await
    async create(req: Request, res: Response) {
        try {
            const form = formidable({ multiples: true })
            form.parse(req, async (_err, fields, files) => {
                try {
                    const post = await PostService.create(<Fields>fields, files as unknown as File)
                    res.json(post)
                } catch (error) {
                    res.status(500).json(error.message)
                }
            })
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

import Router, { IRouter, Response } from 'express'
import Post from './schemas/Post'

interface IRouterType {
    post: (type: string, cb?: Function) => void;
    get: (type: string, cb?: Function) => void;
    put: (type: string, cb?: Function) => void;
    delete: (type: string, cb?: Function) => void;
}

interface IPostBodyRequest extends ReadableStream<Uint8Array> {
    author: string;
    title: string;
    content: string;
    picture?: string;
}

const router: IRouterType = new (Router as any)()

router.post('/posts', async (req: Request, res: Response) => {
    try {
        const { author, title, content, picture } = req.body as IPostBodyRequest
        const post = await Post.create({ author, title, content, picture })
        res.json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/posts')
router.get('/posts/:id')
router.put('/posts')
router.delete('/posts/:id')

export default router as unknown as IRouter

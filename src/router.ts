import Router, { IRouter, Response } from 'express'
import PostController from './controllers/PostController'
import Post from './schemas/Post'

interface IRouterType {
    post: (type: string, cb?: Function) => void;
    get: (type: string, cb?: Function) => void;
    put: (type: string, cb?: Function) => void;
    delete: (type: string, cb?: Function) => void;
}

const router: IRouterType = new (Router as any)()

router.post('/posts', PostController.create)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getPost)
router.put('/posts', PostController.update)
router.delete('/posts/:id', PostController.delete)

export default router as unknown as IRouter

import { UploadedFile } from 'express-fileupload'
import Post from '../schemas/Post'
import FileService from './FileService'

export interface Post {
    author: string;
    title: string;
    content: string;
    picture: string;
    _id?: string;
    __v?: number;
}

class PostService {
    async create(post: Post, picture: UploadedFile | undefined) {
        const fileName = FileService.saveFile(picture)
        console.log({ ...post, picture: fileName })
        const createdPost = await Post.create({ ...post, picture: fileName })
        return createdPost
    }

    async getAll() {
        const posts = await Post.find()
        return posts
    }

    async getPost(id: string) {
        if (!id) new Error('post id is required')
        const post = await Post.findById(id)
        return post

    }

    async update(post: Post) {
        if (!post._id) throw new Error('post id is required')
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true })
        return updatedPost
    }

    async delete(id: string) {
        if (!id) new Error('post id is required')
        const deletedPost = await Post.findByIdAndDelete(id)
        return deletedPost
    }
}

export default new PostService()

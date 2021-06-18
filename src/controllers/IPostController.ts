export interface IPostBodyRequest extends ReadableStream<Uint8Array> {
    author: string;
    title: string;
    content: string;
    picture?: string;
    files?: {
        picture: string;
    }
}

export interface createPostInput {
    description?: string
    imageUrl: string
    authorId: string
}
export interface updatePostInput {
    id: string,
    postId: string,
    description?: string,
    imageUrl: string
}
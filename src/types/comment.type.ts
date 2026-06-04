export interface CreateCommentData {
    content: string;
    postId: string;
    authorId: string;
    parentId?: string;
}

// ─── Request type (what frontend sends) ──────────────────────────────────────
export type CreateCommentData = {
    content: string;
    postId: string;
    parentId?: string;   // the exact comment id the user tapped "Reply" on
    // server derives replyToUserId and replyToCommentId from this
};

// ─── Response type (what service returns) ────────────────────────────────────
export type CommentAuthor = {
    id: string;
    userName: string;
    avatarUrl: string | null;
};

export type ReplyToComment = {
    content: string;
    author: Pick<CommentAuthor, "userName">;
};

export type Comment = {
    id: string;
    content: string;
    postId: string;
    authorId: string;
    parentId: string | null;
    replyToUserId: string | null;
    replyToCommentId: string | null;

    author: CommentAuthor;
    replyToUser?: CommentAuthor | null;
    replyToComment?: ReplyToComment | null;  // manually attached in service

    // frontend-only fields (not from DB)
    replies?: Comment[];
    repliesLoaded?: boolean;
    showReplies?: boolean;
    _count?: { replies: number };

    createdAt: string;
    updatedAt: string;
};
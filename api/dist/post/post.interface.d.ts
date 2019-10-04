export interface Post {
    id: string;
    name: string;
    body: string;
    likes: number;
    userId: string;
    comments: Comment[];
    created: Date;
    updated: Date;
    description: string;
}
export interface Comment {
    userId: string;
    postId: string;
    text: string;
    date: Date;
}

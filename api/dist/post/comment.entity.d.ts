import { PostEntity } from './post.entity';
export declare class CommentEntity {
    id: string;
    body: string;
    created: Date;
    updated: Date;
    updateTimestamp(): void;
    post: PostEntity;
}

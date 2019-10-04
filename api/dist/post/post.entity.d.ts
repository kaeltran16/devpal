import { UserEntity } from '../user/user.entity';
import { CommentEntity } from './comment.entity';
export declare class PostEntity {
    id: string;
    name: string;
    body: string;
    created: Date;
    updated: Date;
    description: string;
    updateTimestamp(): void;
    tags: string[];
    user: UserEntity;
    comment: CommentEntity[];
    likeCount: number;
}

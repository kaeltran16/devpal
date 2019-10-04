import { PostEntity } from '../post/post.entity';
export declare class UserEntity {
    id: string;
    username: string;
    email: string;
    bio: string;
    avatar: string;
    password: string;
    hashPassword(): void;
    likes: PostEntity[];
    posts: PostEntity[];
}

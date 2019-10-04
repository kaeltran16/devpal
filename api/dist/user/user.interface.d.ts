export interface User {
    username: string;
    email: string;
    bio: string;
    avatar?: string;
}
export interface UserRO {
    user: User & {
        token: string;
    };
}
export interface Token {
    id: string;
    username: string;
    email: string;
    exp: number;
}

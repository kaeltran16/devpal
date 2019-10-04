import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { IsEmail } from 'class-validator';
import * as crypto from 'crypto';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({default: ''})
    bio: string;

    @Column({default: ''})
    avatar: string;

    @Column()
    password: string;

    @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }

    @ManyToMany(type => PostEntity)
    @JoinTable()
    likes: PostEntity[];

    @OneToMany(type => PostEntity, post => post.user)
    posts: PostEntity[]
}

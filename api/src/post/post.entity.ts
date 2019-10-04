import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from './comment.entity';

@Entity('post')
export class PostEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({default: ''})
    body: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated: Date;

    @Column({default: ''})
    description: string;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated = new Date;
    }

    @Column('simple-array')
    tags: string[];

    @ManyToOne(type => UserEntity, user => user.posts)
    user: UserEntity;

    @OneToMany(type => CommentEntity, comment => comment.post, {eager: true})
    @JoinColumn()
    comment: CommentEntity[];

    @Column({default: 0})
    likeCount: number;
}

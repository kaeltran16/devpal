import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('comment')
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    body: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated = new Date;
    }

    @ManyToOne(type => PostEntity, post => post.comment)
    post: PostEntity;
}

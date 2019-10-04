import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { CommentEntity } from './comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity, CommentEntity])],
    controllers: [PostController],
    providers: [PostService]
})
export class PostModule {
}

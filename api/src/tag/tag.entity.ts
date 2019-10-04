import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}

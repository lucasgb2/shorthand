import { Entity, ObjectId, ObjectIdColumn, Column, BaseEntity } from "typeorm";


@Entity()
export class UrlEntity extends BaseEntity{

    @ObjectIdColumn()
    id: ObjectId

    @Column()
    sequence: number

    @Column()
    token: string

    @Column()
    longUrl: string

    @Column()
    shortUrl: string

    @Column({default: 0})
    hit: number
}
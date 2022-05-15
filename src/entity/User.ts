import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "users"})
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column({nullable: true})
    middle_name: string;

    @Column({nullable: true})
    last_name: string;

    @Column()
    email: string;

    @Column({nullable: true})
    phone: string;

    @Column()
    password_hash: string;

    @Column()
    created_at: Date;

    @Column({nullable: true})
    updated_at: Date;

    @Column({nullable: true})
    deleted_at: Date;

    @Column({nullable: true})
    image_url: string;

    @Column({type: 'varchar', nullable: false, default: 0})
    access_level: string; 

    @Column({nullable: true, default: true})
    is_active: boolean;

    @Column({nullable: true, type:'text'})
    refresh_token: string;

}

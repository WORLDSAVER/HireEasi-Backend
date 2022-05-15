import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User";

@Entity({ name: "education" })
export class Education {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => Users)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: Users;

    @Column({ type: 'text' })
    school_name: string;

    @Column({ type: 'text' })
    school_location: string;

    @Column({ type: 'text' })
    degree: string;

    @Column({ type: 'text' , nullable: true})
    field_of_study: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true})
    marks: string;

    @Column({ type: 'text' })
    start_date: string;

    @Column({ type: 'text' })
    end_date: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

}

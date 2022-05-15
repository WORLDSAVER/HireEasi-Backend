import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User";

@Entity({ name: "candidate" })
export class Candidate {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Users)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: Users;

    @Column({ type: 'text', nullable: true })
    professional_title: string;

    @Column({ type: 'text' , nullable: true})
    bio: string;

    @Column({ type: 'text', nullable: true })
    age: string;

    @Column({ type: 'text' })
    current_salary: string;

    @Column({ type: 'text' })
    expected_salary: string;

    @Column({ type: 'text' , nullable: true})
    experience: string;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: 'text' })
    postcode: string;

    @Column({ type: 'text' })
    city: string;

    @Column({ type: 'text' })
    country: string;

    @Column({ type: 'text' , nullable: true})
    headline: string;

    @Column({ type: 'text', nullable: true })
    skills: string; // comma separated


    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

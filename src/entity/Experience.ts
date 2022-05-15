import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User";

@Entity({ name: "experience" })
export class Experience {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => Users)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: Users;

    @Column({ type: 'text' })
    company_name: string;

    @Column({ type: 'text' })
    company_location: string; 

    @Column({ type: 'text' })
    designation: string;

    @Column({ type: 'text' , nullable: true})
    description: string;

    @Column({ type: 'text' })
    start_date: string;

    @Column({ type: 'text' })
    end_date: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

}

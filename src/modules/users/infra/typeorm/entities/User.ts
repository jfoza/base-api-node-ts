import { IUser } from "@modules/users/domain/models/IUser";
import {
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    
    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
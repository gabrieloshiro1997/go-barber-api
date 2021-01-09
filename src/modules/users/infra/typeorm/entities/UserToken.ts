import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Generated,
} from 'typeorm';

@Entity('user_tokens')
class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    user_id: string;

    @UpdateDateColumn()
    updated_at: Date;
}

export default UserToken;

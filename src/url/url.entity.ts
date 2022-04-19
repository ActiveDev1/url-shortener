import { User } from '../auth/user.entity'
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Url extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	userId: number

	@Column({ nullable: false })
	title: string

	@Column({ nullable: false })
	url: string

	@Column({ nullable: false, unique: true })
	slug: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	created_at: Date

	@ManyToOne(() => User, (user) => user.urls)
	user: User
}

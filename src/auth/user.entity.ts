import { Url } from 'src/url/url.entity'
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from 'typeorm'
import * as argon from '../utils/argon2'

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 20, nullable: false, unique: true })
	username: string

	@Column({ nullable: false })
	password: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	created_at: Date

	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
	updated_at: Date

	@OneToMany(() => Url, (url) => url.user)
	urls: Url[]

	async validateUserPassword(password: string): Promise<boolean> {
		return argon.verifyPassword(this.password, password)
	}
}

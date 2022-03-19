import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'
import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import * as argon from '../utils/argon2'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async signup(username: string, password: string): Promise<void> {
		try {
			const user = this.create({ username, password })
			user.password = await argon.hashPassword(password)
			await user.save()
		} catch (error) {
			if (error.code === 'ER_DUP_ENTRY') {
				throw new ConflictException('Username already exists')
			} else {
				throw new InternalServerErrorException()
			}
		}
	}

	async findOneByUsername(username: string): Promise<User | null> {
		return await this.findOne({ username })
	}
}

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { jwtConfig } from '../config'
import { User } from './user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.secret
		})
	}

	async validate(payload: JwtPayload): Promise<User> {
		const user = await this.userRepository.findOneByUsername(payload.username)
		if (!user) {
			throw new UnauthorizedException()
		}
		return user
	}
}

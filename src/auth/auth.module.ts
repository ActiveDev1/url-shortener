import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { UserRepository } from './user.repository'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { jwtConfig } from '../config'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		TypeOrmModule.forFeature([UserRepository]),
		JwtModule.register(jwtConfig)
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}

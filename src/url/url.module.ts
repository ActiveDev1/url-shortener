import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { UrlController } from './url.controller'
import { UrlRepository } from './url.repository'
import { UrlService } from './url.service'

@Module({
	imports: [AuthModule, TypeOrmModule.forFeature([UrlRepository])],
	controllers: [UrlController],
	providers: [UrlService]
})
export class UrlModule {}

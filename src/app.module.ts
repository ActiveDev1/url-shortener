import { Module } from '@nestjs/common'
import { UrlModule } from './url/url.module'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config'

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), UrlModule, AuthModule]
})
export class AppModule {}

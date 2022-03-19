import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/auth/decorators/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { CreateShortUrlDto } from './dtos/create-url.dto'
import { UrlService } from './url.service'
import { FastifyReply } from 'fastify'
import { GetSlugDto } from './dtos/get-slug.dto'

@Controller('')
export class UrlController {
	constructor(private urlService: UrlService) {}

	@Post('short-link')
	@UseGuards(AuthGuard())
	async createShortUrl(@Body() createShortUrlDto: CreateShortUrlDto, @GetUser() user: User) {
		return await this.urlService.createShortUrl(createShortUrlDto, user.id)
	}

	@Get('/:slug')
	async redirect(@Res() res: FastifyReply, @Param() slug: GetSlugDto) {
		const url = await this.urlService.getShortLink(slug.slug)
		return res.status(301).redirect(url)
	}

	@Get('/user/urls')
	@UseGuards(AuthGuard())
	async getUserUrls(@GetUser() user: User) {
		return await this.urlService.getUserUrls(user.id)
	}
}

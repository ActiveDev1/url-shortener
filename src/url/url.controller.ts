import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../auth/decorators/get-user.decorator'
import { User } from '../auth/user.entity'
import { CreateShortUrlDto } from './dtos/create-url.dto'
import { UrlService } from './url.service'
import { FastifyReply } from 'fastify'
import { GetSlugDto } from './dtos/get-slug.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('Url')
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
	@ApiOperation({ summary: 'Create cat' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	async getUserUrls(@GetUser() user: User) {
		return await this.urlService.getUserUrls(user.id)
	}
}

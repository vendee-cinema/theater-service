import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/prisma'

import { RowEntity } from '../../domain/entities'
import { HallRepositoryPort } from '../../domain/ports'

@Injectable()
export class CreateHallUsecase {
	public constructor(
		private readonly repository: HallRepositoryPort,
		private readonly prisma: PrismaService
	) {}

	public async execute(data: {
		name: string
		theaterId: string
		rows: RowEntity[]
	}) {
		return this.prisma.$transaction(async () => {
			const hall = await this.repository.create(data)
			await this.repository.createSeats(hall.id, data.rows)
			return hall
		})
	}
}

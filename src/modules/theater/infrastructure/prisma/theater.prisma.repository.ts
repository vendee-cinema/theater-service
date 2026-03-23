import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/prisma'

import { TheaterEntity } from '../../domain/entities'
import { TheaterRepositoryPort } from '../../domain/ports'

@Injectable()
export class TheaterPrismaRepository implements TheaterRepositoryPort {
	public constructor(private readonly prisma: PrismaService) {}

	public async findAll(): Promise<TheaterEntity[]> {
		const theaters = await this.prisma.theater.findMany({
			orderBy: { name: 'asc' }
		})
		return theaters.map(
			theater =>
				new TheaterEntity(
					theater.id,
					theater.name,
					theater.address,
					theater.createdAt,
					theater.updatedAt
				)
		)
	}

	public async findById(id: string): Promise<TheaterEntity | null> {
		const theater = await this.prisma.theater.findUnique({ where: { id } })
		return theater
			? new TheaterEntity(
					theater.id,
					theater.name,
					theater.address,
					theater.createdAt,
					theater.updatedAt
				)
			: null
	}

	public async create(
		data: Pick<TheaterEntity, 'name' | 'address'>
	): Promise<TheaterEntity> {
		const theater = await this.prisma.theater.create({ data })
		return new TheaterEntity(
			theater.id,
			theater.name,
			theater.address,
			theater.createdAt,
			theater.updatedAt
		)
	}
}

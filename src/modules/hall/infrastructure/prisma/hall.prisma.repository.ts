import { Injectable } from '@nestjs/common'
import { SeatCreateManyInput } from '@prisma/generated/models'

import { PrismaService } from '@/infra/prisma'

import { HallEntity, RowEntity } from '../../domain/entities'
import { HallRepositoryPort } from '../../domain/ports'

@Injectable()
export class HallPrismaRepository implements HallRepositoryPort {
	public constructor(private readonly prisma: PrismaService) {}

	public async listByTheater(theaterId: string): Promise<HallEntity[]> {
		const halls = await this.prisma.hall.findMany({
			where: { theaterId },
			orderBy: { name: 'asc' }
		})
		return halls.map(
			hall =>
				new HallEntity(
					hall.id,
					hall.name,
					hall.theaterId,
					hall.createdAt,
					hall.updatedAt
				)
		)
	}

	public async findById(id: string): Promise<HallEntity | null> {
		const hall = await this.prisma.hall.findUnique({ where: { id } })
		return hall
			? new HallEntity(
					hall.id,
					hall.name,
					hall.theaterId,
					hall.createdAt,
					hall.updatedAt
				)
			: null
	}

	public async create(data: {
		name: string
		theaterId: string
		rows: RowEntity[]
	}): Promise<HallEntity> {
		const { name, theaterId } = data
		const hall = await this.prisma.hall.create({ data: { name, theaterId } })
		return new HallEntity(
			hall.id,
			hall.name,
			hall.theaterId,
			hall.createdAt,
			hall.updatedAt
		)
	}

	public async createSeats(hallId: string, rows: RowEntity[]): Promise<void> {
		const seats: SeatCreateManyInput[] = []
		for (const row of rows) {
			for (let num = 1; num <= row.columns; num++) {
				seats.push({
					row: row.row,
					price: row.price,
					type: row.type,
					number: num,
					hallId,
					x: num,
					y: row.row
				})
			}
		}
		await this.prisma.seat.createMany({ data: seats })
	}
}

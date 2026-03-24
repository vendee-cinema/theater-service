import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/prisma'

import { SeatEntity } from '../../domain/entities'
import { SeatRepositoryPort } from '../../domain/ports'

@Injectable()
export class SeatPrismaRepository implements SeatRepositoryPort {
	public constructor(private readonly prisma: PrismaService) {}

	public async findByHall(hallId: string): Promise<SeatEntity[]> {
		const seats = await this.prisma.seat.findMany({
			where: { hallId },
			orderBy: [{ row: 'asc', number: 'asc' }]
		})
		return seats.map(
			seat =>
				new SeatEntity(
					seat.id,
					seat.row,
					seat.number,
					seat.price,
					seat.type,
					seat.hallId
				)
		)
	}

	public async findById(id: string): Promise<SeatEntity | null> {
		const seat = await this.prisma.seat.findUnique({ where: { id } })
		return seat
			? new SeatEntity(
					seat.id,
					seat.row,
					seat.number,
					seat.price,
					seat.type,
					seat.hallId
				)
			: null
	}
}

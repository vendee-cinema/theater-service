import { Injectable } from '@nestjs/common'

import { BookingPort, SeatRepositoryPort } from '../../domain/ports'

@Injectable()
export class ListSeatsUsecase {
	public constructor(
		private readonly repository: SeatRepositoryPort,
		private readonly booking: BookingPort
	) {}

	public async execute(hallId: string, sessionId: string) {
		const seats = await this.repository.findByHall(hallId)
		const reserved = await this.booking.listReservedSeats(hallId, sessionId)
		return seats.map(seat => ({
			...seat,
			status: reserved.includes(seat.id) ? 'reserved' : 'available'
		}))
	}
}

import { Injectable } from '@nestjs/common'

import { SeatRepositoryPort } from '../../domain/ports'

@Injectable()
export class ListSeatsUsecase {
	public constructor(private readonly repository: SeatRepositoryPort) {}

	public async execute(hallId: string, sessionId: string) {
		const seats = await this.repository.findByHall(hallId)
		return seats.map(seat => ({ ...seat, status: 'available' }))
	}
}

import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { RpcStatus } from '@vendee-cinema/common'

import { SeatRepositoryPort } from '../../domain/ports'

@Injectable()
export class GetSeatUsecase {
	public constructor(private readonly repository: SeatRepositoryPort) {}

	public async execute(id: string) {
		const seat = await this.repository.findById(id)

		if (!seat)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Seat not found'
			})

		// TODO: idk if it will be needed but msut to think about getting status
		return { ...seat, status: undefined }
	}
}

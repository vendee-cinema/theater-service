import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { RpcStatus } from '@vendee-cinema/common'

import { HallRepositoryPort } from '../../domain/ports'

@Injectable()
export class GetHallUsecase {
	public constructor(private readonly repository: HallRepositoryPort) {}

	public async execute(id: string) {
		const hall = await this.repository.findById(id)
		if (!hall)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Hall not found'
			})
		return hall
	}
}

import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import type {
	CreateTheaterRequest,
	CreateTheaterResponse,
	GetTheaterRequest,
	GetTheaterResponse,
	ListTheatersResponse
} from '@vendee-cinema/contracts/theater'

import { CreateTheaterUsecase } from '../../application/commands'
import {
	GetTheaterUsecase,
	ListTheatersUsecase
} from '../../application/queries'

@Controller()
export class TheaterGrpcController {
	public constructor(
		private readonly listUC: ListTheatersUsecase,
		private readonly getUC: GetTheaterUsecase,
		private readonly createUC: CreateTheaterUsecase
	) {}

	@GrpcMethod('TheaterService', 'ListTheaters')
	public async getAll(): Promise<ListTheatersResponse> {
		const theaters = await this.listUC.execute()
		return { theaters }
	}

	@GrpcMethod('TheaterService', 'GetTheater')
	public async getById(data: GetTheaterRequest): Promise<GetTheaterResponse> {
		const { id } = data
		const theater = await this.getUC.execute(id)
		return { theater }
	}

	@GrpcMethod('TheaterService', 'CreateTheater')
	public async create(
		data: CreateTheaterRequest
	): Promise<CreateTheaterResponse> {
		const theater = await this.createUC.execute(data)
		return { theater }
	}
}

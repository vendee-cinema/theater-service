import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import type {
	CreateHallRequest,
	CreateHallResponse,
	GetHallRequest,
	GetHallResponse,
	ListHallsRequest,
	ListHallsResponse
} from '@vendee-cinema/contracts/hall'

import { CreateHallUsecase } from '../../application/commands'
import { GetHallUsecase, ListHallsUsecase } from '../../application/queries'

@Controller()
export class HallGrpcController {
	public constructor(
		private readonly listUC: ListHallsUsecase,
		private readonly getUC: GetHallUsecase,
		private readonly createUC: CreateHallUsecase
	) {}

	@GrpcMethod('HallService', 'ListHalls')
	public async list(data: ListHallsRequest): Promise<ListHallsResponse> {
		const halls = await this.listUC.execute(data.theaterId)
		return { halls }
	}

	@GrpcMethod('HallService', 'GetHall')
	public async getById(data: GetHallRequest): Promise<GetHallResponse> {
		const { id } = data
		const hall = await this.getUC.execute(id)
		return { hall }
	}

	@GrpcMethod('HallService', 'CreateHall')
	public async create(data: CreateHallRequest): Promise<CreateHallResponse> {
		const hall = await this.createUC.execute(data)
		return { hall }
	}
}

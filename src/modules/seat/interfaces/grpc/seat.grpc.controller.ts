import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import type {
	GetSeatRequest,
	GetSeatResponse,
	ListSeatsRequest,
	ListSeatsResponse
} from '@vendee-cinema/contracts/seat'

import { GetSeatUsecase, ListSeatsUsecase } from '../../application/queries'

@Controller()
export class SeatGrpcController {
	public constructor(
		private readonly listUC: ListSeatsUsecase,
		private readonly getUC: GetSeatUsecase
	) {}

	@GrpcMethod('SeatService', 'ListSeatsByHall')
	public async list(data: ListSeatsRequest): Promise<ListSeatsResponse> {
		const seats = await this.listUC.execute(data.hallId, data.sessionId)
		return { seats }
	}

	@GrpcMethod('SeatService', 'GetSeat')
	public async getById(data: GetSeatRequest): Promise<GetSeatResponse> {
		const { id } = data
		const seat = await this.getUC.execute(id)
		return { seat }
	}
}

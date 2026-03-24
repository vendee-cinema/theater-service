import { Module } from '@nestjs/common'

import { GetSeatUsecase, ListSeatsUsecase } from '../application/queries'
import { SeatRepositoryPort } from '../domain/ports'
import { SeatGrpcController } from '../interfaces/grpc'

import { SeatPrismaRepository } from './prisma'

@Module({
	controllers: [SeatGrpcController],
	providers: [
		{ provide: SeatRepositoryPort, useClass: SeatPrismaRepository },
		ListSeatsUsecase,
		GetSeatUsecase
	]
})
export class SeatModule {}

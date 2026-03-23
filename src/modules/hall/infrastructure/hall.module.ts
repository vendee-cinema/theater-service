import { Module } from '@nestjs/common'

import { CreateHallUsecase } from '../application/commands'
import { GetHallUsecase, ListHallsUsecase } from '../application/queries'
import { HallRepositoryPort } from '../domain/ports'
import { HallGrpcController } from '../interfaces/grpc'

import { HallPrismaRepository } from './prisma'

@Module({
	controllers: [HallGrpcController],
	providers: [
		{ provide: HallRepositoryPort, useClass: HallPrismaRepository },
		ListHallsUsecase,
		GetHallUsecase,
		CreateHallUsecase
	]
})
export class HallModule {}

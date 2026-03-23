import { Module } from '@nestjs/common'

import { CreateTheaterUsecase } from '../application/commands'
import { GetTheaterUsecase, ListTheatersUsecase } from '../application/queries'
import { TheaterRepositoryPort } from '../domain/ports'
import { TheaterGrpcController } from '../interfaces/grpc'

import { TheaterPrismaRepository } from './prisma'

@Module({
	controllers: [TheaterGrpcController],
	providers: [
		{ provide: TheaterRepositoryPort, useClass: TheaterPrismaRepository },
		ListTheatersUsecase,
		GetTheaterUsecase,
		CreateTheaterUsecase
	]
})
export class TheaterModule {}

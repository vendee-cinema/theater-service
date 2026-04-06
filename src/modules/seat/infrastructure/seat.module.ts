import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PROTO_PATHS } from '@vendee-cinema/contracts'

import { GetSeatUsecase, ListSeatsUsecase } from '../application/queries'
import { BookingPort, SeatRepositoryPort } from '../domain/ports'
import { SeatGrpcController } from '../interfaces/grpc'

import { BookingGrpcAdapter } from './grpc'
import { SeatPrismaRepository } from './prisma'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'BOOKING_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'booking.v1',
						protoPath: PROTO_PATHS.BOOKING,
						url: configService.getOrThrow<string>('BOOKING_GRPC_URL')
					}
				}),
				inject: [ConfigService]
			}
		])
	],
	controllers: [SeatGrpcController],
	providers: [
		{ provide: SeatRepositoryPort, useClass: SeatPrismaRepository },
		{ provide: BookingPort, useClass: BookingGrpcAdapter },
		ListSeatsUsecase,
		GetSeatUsecase
	]
})
export class SeatModule {}

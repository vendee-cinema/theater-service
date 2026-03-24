import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PrismaModule } from './infra/prisma'
import { HallModule } from './modules/hall/infrastructure'
import { SeatModule } from './modules/seat/infrastructure'
import { TheaterModule } from './modules/theater/infrastructure'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		TheaterModule,
		HallModule,
		SeatModule
	]
})
export class AppModule {}

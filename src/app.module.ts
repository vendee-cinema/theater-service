import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PrismaModule } from './infra/prisma'
import { TheaterModule } from './modules/theater/infrastructure'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		TheaterModule
	]
})
export class AppModule {}

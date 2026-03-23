import { Injectable } from '@nestjs/common'

import { TheaterEntity } from '../../domain/entities'
import { TheaterRepositoryPort } from '../../domain/ports'

@Injectable()
export class CreateTheaterUsecase {
	public constructor(private readonly repository: TheaterRepositoryPort) {}

	public async execute(data: Pick<TheaterEntity, 'name' | 'address'>) {
		return await this.repository.create(data)
	}
}

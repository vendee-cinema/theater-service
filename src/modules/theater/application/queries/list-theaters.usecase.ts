import { Injectable } from '@nestjs/common'

import { TheaterRepositoryPort } from '../../domain/ports'

@Injectable()
export class ListTheatersUsecase {
	public constructor(private readonly repository: TheaterRepositoryPort) {}

	public async execute() {
		return await this.repository.findAll()
	}
}

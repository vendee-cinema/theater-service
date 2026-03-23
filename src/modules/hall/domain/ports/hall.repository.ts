import { HallEntity, RowEntity } from '../entities'

export abstract class HallRepositoryPort {
	public abstract listByTheater(theaterId: string): Promise<HallEntity[]>
	public abstract findById(id: string): Promise<HallEntity | null>
	public abstract create(data: {
		name: string
		theaterId: string
		rows: RowEntity[]
	}): Promise<HallEntity>

	public abstract createSeats(hallId: string, rows: RowEntity[]): Promise<void>
}

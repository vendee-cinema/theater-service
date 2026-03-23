import { TheaterEntity } from '../entities'

export abstract class TheaterRepositoryPort {
	public abstract findAll(): Promise<TheaterEntity[]>
	public abstract findById(id: string): Promise<TheaterEntity | null>
	public abstract create(
		data: Pick<TheaterEntity, 'name' | 'address'>
	): Promise<TheaterEntity>
}

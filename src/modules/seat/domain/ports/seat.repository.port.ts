import { SeatEntity } from '../entities'

export abstract class SeatRepositoryPort {
	public abstract findById(id: string): Promise<SeatEntity | null>
	public abstract findByHall(hallId: string): Promise<SeatEntity[]>
}

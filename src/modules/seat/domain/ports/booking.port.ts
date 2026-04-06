export abstract class BookingPort {
	public abstract listReservedSeats(
		hallId: string,
		sessionId: string
	): Promise<string[]>
}

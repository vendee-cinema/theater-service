export class RowEntity {
	public constructor(
		public readonly row: number,
		public readonly columns: number,
		public readonly type: string,
		public readonly price: number
	) {}
}

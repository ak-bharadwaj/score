export type Team = {
	_id?: string;
	name: string;
	medals?: {
		bronze: number;
		silver: number;
		gold: number;
	};
	points?: number;
};

export default interface Team {
  _id?: string;
  name: string;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
  points: number;
}

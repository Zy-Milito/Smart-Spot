import { ISale } from './Sale';

export interface IParkingSpot {
  id: number;
  number: string;
  availability: number;
  access: string;
  sale: ISale | undefined;
}

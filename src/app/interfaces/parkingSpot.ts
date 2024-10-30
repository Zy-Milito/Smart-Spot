import { ISale } from './Sale';

export interface IParkingSpot {
  id: number;
  number: string;
  availability: boolean;
  access: string;
  sale: ISale | undefined;
}

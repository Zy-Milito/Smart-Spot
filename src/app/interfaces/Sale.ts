export interface ISale {
    id: number,
    plate: string,
    entranceTime: string,
    departureTime: string,
    cost: number,
    entranceUserId: string,
    departureUserId: string,
    parkingSpotId: number,
    status: boolean | null,
    parked: number
}
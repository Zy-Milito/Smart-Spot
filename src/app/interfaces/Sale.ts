export interface ISale {
    id: number,
    plate: string,
    entranceTime: string,
    departureTime: string,
    price: number,
    entranceUserId: string,
    departureUserId: string,
    parkingSpotId: number,
    status: boolean | null
}
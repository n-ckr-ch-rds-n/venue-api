import {BookingStatus} from "./booking.status";

export interface FilterBookingsRequest {
    venue: string;
    status: BookingStatus;
    date: string;
}

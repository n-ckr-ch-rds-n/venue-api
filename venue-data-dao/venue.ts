import {BookingStatus} from "./booking.status";

export interface Venue {
    date: string;
    venue_name: string;
    space_name: string;
    guest_name: string;
    guest_email: string;
    number_of_guests: number;
    price: string;
    status: BookingStatus;
}

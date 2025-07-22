export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  capacity: number;
  category: string;
  venue: Venue;
  banners: EventBanner[];
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

export interface EventBanner {
  id: string;
  imageUrl: string;
  isMain: boolean;
  isSecond: boolean;
  isAdditional: boolean;
}
export interface TicketType {
  id: string;
  name: string;
  price: number;
  currency: string;
  saleStart: number;
  saleEnd: number;
  description: string;
}

export interface EventSector {
  id: string;
  name: string;
  description?: string | null;
  priceAddition?: number | null;
}

export interface EventSeat {
  id: string;
  label: string;
  seatRowInfo?: string | null;
  seatNumber?: string | null;
  priceAddition?: number | null;
  sector?: EventSector | null;
}

export interface EventDetails {
  id: string;
  title: string;
  description?: string | null;
  startTime: number;
  endTime: number;
  capacity: number;
  venueDto: Venue;
  ticketTypes: TicketType[];
  sectors: EventSector[];
  seats: EventSeat[];
}

export interface NewReservation {
  eventId: string;
  ticketTypeId: string;
  sectorId?: string;
  seatId?: string;
}
export interface Reservation {
  id: string;
  eventId: string;
  ticketTypeId: string;
  ticketTypeName: string;
  ticketTypePrice: number;
  ticketTypeCurrency: string;
  price: number;
  status: string;
  sectorId?: string;
  sectorName?: string;
  seatId?: string;
  seatLabel?: string;
  seatRowInfo?: string;
}

export interface Purchase {
  id: string;
  userInfo: string;
  totalPrice: number;
  paymentStatus: string;
  expiresAt?: number;
  reservations: Reservation[];
}

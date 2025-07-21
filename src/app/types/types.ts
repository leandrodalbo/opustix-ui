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

export interface EventDetailsDto {
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

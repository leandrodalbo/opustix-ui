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

export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  capacity: number;
  venue: Venue;
  createdAt: number;
  category: string;
  banners: EventBanner[];
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  createdAt: number;
}
export interface EventBanner {
  id: string;
  imageUrl: string;
  isMain: boolean;
  isSecond: boolean;
  isAdditional: boolean;
}

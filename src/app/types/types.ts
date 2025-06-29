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
  banners: eventBanner[];
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  createdAt: number;
}
export interface eventBanner {
  id: string;
  imageUrl: string;
  isMain: boolean;
  isSecond: boolean;
  isAdditional: boolean;
}

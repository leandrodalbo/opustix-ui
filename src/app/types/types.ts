export interface Event {
  id: string;
  categeory: string;
  banners: eventBanner[];
}

export interface eventBanner {
  id: string;
  imageUrl: string;
  isMain: boolean;
  isSecond: boolean;
  isAdditional: boolean;
}

import { NewReservation, Purchase } from "../types/types";

import apiPrivateFetch from "./apiPrivateConfig";

export const postReservations = async (
  reservations: NewReservation[]
): Promise<Purchase> => {
  const response = await apiPrivateFetch.post<Purchase>(
    `/reservations/new`,
    reservations
  );
  return response.data;
};

export default postReservations;

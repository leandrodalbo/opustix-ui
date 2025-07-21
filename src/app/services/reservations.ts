import { Purchase, Reservation } from "../types/types";

import apiPrivateFetch from "./apiPrivateConfig";

export const postReservations = async (
  reservations: Reservation[]
): Promise<Purchase> => {
  const response = await apiPrivateFetch.post<Purchase>(
    "/reservations/new",
    reservations
  );
  return response.data;
};

export default postReservations;

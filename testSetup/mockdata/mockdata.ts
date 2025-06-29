import { Event } from "../../src/app/types/types";

import bannerbco from "../banners/bannerbco.png";
import banner13 from "../banners/banner13.jpg";
import banner14 from "../banners/banner14.jpg";
import banner15 from "../banners/banner15.jpg";
import banner16 from "../banners/banner16.jpg";

export const events: Event[] = [
  {
    id: "1",
    categeory: "Recitales",
    banners: [
      {
        id: "banner11",
        imageUrl: bannerbco,
        isMain: true,
        isSecond: false,
        isAdditional: false,
      },
    ],
  },
  {
    id: "2",
    categeory: "Teatro",
    banners: [
      {
        id: "banner22",
        imageUrl: banner13,
        isMain: true,
        isSecond: false,
        isAdditional: false,
      },
    ],
  },
  {
    id: "3",
    categeory: "Workshops",
    banners: [
      {
        id: "banner44",
        imageUrl: banner14,
        isMain: true,
        isSecond: false,
        isAdditional: false,
      },
    ],
  },
  {
    id: "4",
    categeory: "Festival",
    banners: [
      {
        id: "banner33",
        imageUrl: banner15,
        isMain: true,
        isSecond: false,
        isAdditional: false,
      },
    ],
  },
  {
    id: "5",
    categeory: "Conferencias",
    banners: [
      {
        id: "banner55",
        imageUrl: banner16,
        isMain: true,
        isSecond: false,
        isAdditional: false,
      },
    ],
  },

  {
    id: "6",
    categeory: "Familias",
    banners: [
      {
        id: "banner111",
        imageUrl: bannerbco,
        isMain: false,
        isSecond: false,
        isAdditional: false,
      },
    ],
  },
  {
    id: "7",
    categeory: "Infantiles",
    banners: [
      {
        id: "banner222",
        imageUrl: banner13,
        isMain: false,
        isSecond: false,
        isAdditional: false,
      },
    ],
  },
  {
    id: "8",
    categeory: "Cine",
    banners: [
      {
        id: "banner444",
        imageUrl: banner14,
        isMain: false,
        isSecond: false,
        isAdditional: false,
      },
    ],
  },
  {
    id: "9",
    categeory: "Electronica",
    banners: [
      {
        id: "banner333",
        imageUrl: banner15,
        isMain: false,
        isSecond: false,
        isAdditional: false,
      },
    ],
  },
  {
    id: "10",
    categeory: "Deportes",
    banners: [
      {
        id: "banner55",
        imageUrl: banner16,
        isMain: false,
        isSecond: false,
        isAdditional: false,
      },
    ],
  },
  {
    id: "11",
    categeory: "Fiestas",
    banners: [
      {
        id: "banner55",
        imageUrl: banner16,
        isMain: false,
        isSecond: false,
        isAdditional: false,
      },
    ],
  },
];

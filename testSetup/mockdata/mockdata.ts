import { Event } from "../../src/app/types/types";

import bannerbco from "../banners/bannerbco.png";
import banner13 from "../banners/banner13.jpg";
import banner14 from "../banners/banner14.jpg";
import banner15 from "../banners/banner15.jpg";
import banner16 from "../banners/banner16.jpg";

import bannerImage from "../banners/banner.jpg";
import bannerImage2 from "../banners/banner2.jpg";
import bannerImage3 from "../banners/banner3.jpg";
import bannerImage4 from "../banners/banner4.jpg";
import bannerImage5 from "../banners/banner5.jpg";
import bannerImage6 from "../banners//banner6.jpg";
import bannerImage7 from "../banners/banner7.jpg";
import bannerImage8 from "../banners//banner8.jpg";

export const events: Event[] = [
  {
    id: "1",
    title: "Recital de Piano",
    description: "Un recital de piano con obras clásicas y contemporáneas.",
    startTime: 1748638855,
    endTime: 1751317255,
    capacity: 100,
    venue: {
      id: "venue1",
      name: "Teatro Principal",
      address: "Calle Mayor, 123, Madrid",
      city: "Madrid",
      country: "España",
      createdAt: 1672531199,
    },
    createdAt: 1672531199,
    category: "Recitales",
    banners: [
      {
        id: "banner11",
        imageUrl: bannerbco,
        isMain: true,
        isSecond: false,
        isAdditional: false,
      },
      {
        id: "banner1",
        imageUrl: bannerImage,
        isMain: false,
        isSecond: true,
        isAdditional: false,
      },
    ],
  },
  {
    id: "2",
    title: "Obra de Teatro",
    description: "Una obra de teatro contemporánea que explora temas sociales.",
    startTime: 1751144455,
    endTime: 1751317255,
    capacity: 200,
    venue: {
      id: "venue2",
      name: "Teatro Nacional",
      address: "Avenida de la Cultura, 456, Madrid",
      city: "Madrid",
      country: "España",
      createdAt: 1672531199,
    },
    createdAt: 1672531199,
    category: "Teatro",
    banners: [
      {
        id: "banner22",
        imageUrl: banner13,
        isMain: true,
        isSecond: false,
        isAdditional: false,
      },
      {
        id: "banner2",
        imageUrl: bannerImage2,
        isMain: false,
        isSecond: true,
        isAdditional: false,
      },
    ],
  },
  {
    id: "3",
    title: "Taller de Pintura",
    description: "Un taller práctico de pintura al óleo para principiantes.",
    startTime: 1782594055,
    endTime: 1782680455,
    capacity: 30,
    venue: {
      id: "venue3",
      name: "Centro Cultural",
      address: "Plaza de las Artes, 789, Madrid",
      city: "Madrid",
      country: "España",
      createdAt: 1672531199,
    },
    createdAt: 1672531199,
    category: "Workshops",
    banners: [
      {
        id: "banner44",
        imageUrl: banner14,
        isMain: true,
        isSecond: false,
        isAdditional: false,
      },
      {
        id: "banner3",
        imageUrl: bannerImage3,
        isMain: false,
        isSecond: true,
        isAdditional: false,
      },
    ],
  },
  {
    id: "4",
    title: "Festival de Música",
    description: "Un festival de música con bandas locales e internacionales.",
    startTime: 1779915655,
    endTime: 1780002055,
    capacity: 5000,
    venue: {
      id: "venue4",
      name: "Parque Central",
      address: "Avenida de la Música, 321, Madrid",
      city: "Madrid",
      country: "España",
      createdAt: 1672531199,
    },
    createdAt: 1672531199,
    category: "Festival",
    banners: [
      {
        id: "banner33",
        imageUrl: banner15,
        isMain: true,
        isSecond: false,
        isAdditional: false,
      },
      {
        id: "banner4",
        imageUrl: bannerImage4,
        isMain: false,
        isSecond: true,
        isAdditional: false,
      },
    ],
  },
  {
    id: "5",
    title: "Conferencia sobre Tecnología",
    description:
      "Una conferencia sobre las últimas tendencias en tecnología y su impacto en la sociedad.",
    startTime: 1774731655,
    endTime: 1777410055,
    capacity: 500,
    venue: {
      id: "venue5",
      name: "Auditorio Tecnológico",
      address: "Calle de la Innovación, 654, Madrid",
      city: "Madrid",
      country: "España",
      createdAt: 1672531199,
    },
    createdAt: 1672531199,
    category: "Conferencias",
    banners: [
      {
        id: "banner55",
        imageUrl: banner16,
        isMain: true,
        isSecond: false,
        isAdditional: false,
      },
      {
        id: "banner5",
        imageUrl: bannerImage5,
        isMain: false,
        isSecond: true,
        isAdditional: false,
      },
    ],
  },

  {
    id: "6",
    title: "Exposición de Arte",
    description:
      "Una exposición de arte contemporáneo con obras de artistas emergentes.",
    startTime: 1785272455,
    endTime: 1785445255,
    capacity: 150,
    venue: {
      id: "venue6",
      name: "Galería de Arte Moderno",
      address: "Calle del Arte, 987, Madrid",
      city: "Madrid",
      country: "España",
      createdAt: 1672531199,
    },
    createdAt: 1672531199,
    category: "Familias",

    banners: [
      {
        id: "banner111",
        imageUrl: bannerbco,
        isMain: false,
        isSecond: false,
        isAdditional: false,
      },
      {
        id: "banner6",
        imageUrl: bannerImage6,
        isMain: false,
        isSecond: true,
        isAdditional: false,
      },
    ],
  },
  {
    id: "7",
    title: "Cuentacuentos para Niños",
    description:
      "Una sesión de cuentacuentos para niños con historias mágicas y divertidas.",
    startTime: 1816981255,
    endTime: 1819659655,
    capacity: 50,
    venue: {
      id: "venue7",
      name: "Biblioteca Infantil",
      address: "Calle de los Libros, 123, Madrid",
      city: "Madrid",
      country: "España",
      createdAt: 1672531199,
    },
    createdAt: 1672531199,
    category: "Infantiles",
    banners: [
      {
        id: "banner222",
        imageUrl: banner13,
        isMain: true,
        isSecond: false,
        isAdditional: false,
      },
      {
        id: "banner7",
        imageUrl: bannerImage7,
        isMain: false,
        isSecond: true,
        isAdditional: false,
      },
    ],
  },
  {
    id: "8",
    title: "Cine al Aire Libre",
    description:
      "Una proyección de cine al aire libre con una selección de películas clásicas.",
    startTime: 1822338055,
    endTime: 1824930055,
    capacity: 300,
    venue: {
      id: "venue8",
      name: "Cine Plaza",
      address: "Plaza del Cine, 456, Madrid",
      city: "Pergamino",
      country: "Argentina",
      createdAt: 1672531199,
    },
    createdAt: 1672531199,
    category: "Cine",
    banners: [
      {
        id: "banner444",
        imageUrl: banner14,
        isMain: true,
        isSecond: false,
        isAdditional: false,
      },
      {
        id: "banner8",
        imageUrl: bannerImage8,
        isMain: false,
        isSecond: true,
        isAdditional: false,
      },
    ],
  },
  {
    id: "9",
    title: "Concierto de Jazz",
    description:
      "Un concierto de jazz con músicos locales e invitados especiales.",
    startTime: 1827435655,
    endTime: 1827608455,
    capacity: 200,
    venue: {
      id: "venue9",
      name: "Sala de Jazz",
      address: "Calle del Jazz, 789, Madrid",
      city: "Medellín",
      country: "Colombia",
      createdAt: 1672531199,
    },
    createdAt: 1672531199,
    category: "Jazz",

    banners: [
      {
        id: "banner333",
        imageUrl: banner15,
        isMain: false,
        isSecond: false,
        isAdditional: false,
      },
      {
        id: "banner8",
        imageUrl: bannerImage8,
        isMain: false,
        isSecond: true,
        isAdditional: false,
      },
    ],
  },
  {
    id: "10",
    title: "Torneo de Fútbol",
    description: "Un torneo de fútbol amateur con equipos locales.",
    startTime: 1827435655,
    endTime: 1830027655,
    capacity: 1000,
    venue: {
      id: "venue10",
      name: "Estadio Municipal",
      address: "Avenida del Fútbol, 321, Madrid",
      city: "CABA",
      country: "argentina",
      createdAt: 1672531199,
    },
    createdAt: 1672531199,
    category: "Deportes",
    banners: [
      {
        id: "banner55",
        imageUrl: banner16,
        isMain: false,
        isSecond: false,
        isAdditional: false,
      },
      {
        id: "banner8",
        imageUrl: bannerImage8,
        isMain: false,
        isSecond: true,
        isAdditional: false,
      },
    ],
  },
  {
    id: "11",
    title: "Feria de Artesanía",
    description: "Una feria de artesanía local con productos hechos a mano.",
    startTime: 1859058055,
    endTime: 1861650055,
    capacity: 500,
    venue: {
      id: "venue11",
      name: "Plaza de Artesanos",
      address: "Calle de la Artesanía, 654, Madrid",
      city: "Pergamino",
      country: "Argentina",
      createdAt: 1672531199,
    },
    createdAt: 1672531199,
    category: "Fiestas",
    banners: [
      {
        id: "banner55",
        imageUrl: banner16,
        isMain: false,
        isSecond: false,
        isAdditional: false,
      },
      {
        id: "banner8",
        imageUrl: bannerImage8,
        isMain: false,
        isSecond: true,
        isAdditional: false,
      },
    ],
  },
];

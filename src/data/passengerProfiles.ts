
export interface PassengerProfile {
  name: string;
  rating: number;
  trips: number;
  image: string;
  bio: string;
  joinedDate: string;
}

export const PASSENGER_PROFILES: PassengerProfile[] = [
  {
    name: "Ana Beatriz Silva",
    rating: 4.98,
    trips: 1240,
    image: "https://i.pravatar.cc/150?u=ana",
    bio: "Usuária frequente, prefere silêncio e ar-condicionado.",
    joinedDate: "Jan 2021"
  },
  {
    name: "Carlos Eduardo Oliveira",
    rating: 4.75,
    trips: 850,
    image: "https://i.pravatar.cc/150?u=carlos",
    bio: "Sempre pontual no embarque. Viagens de trabalho.",
    joinedDate: "Mar 2022"
  },
  {
    name: "Mariana Costa",
    rating: 4.89,
    trips: 2100,
    image: "https://i.pravatar.cc/150?u=mariana",
    bio: "Gosta de conversar sobre tecnologia e inovação.",
    joinedDate: "Jun 2020"
  },
  {
    name: "Ricardo Santos",
    rating: 4.62,
    trips: 430,
    image: "https://i.pravatar.cc/150?u=ricardo",
    bio: "Viagens curtas, geralmente com pressa.",
    joinedDate: "Nov 2022"
  },
  {
    name: "Juliana Mendes",
    rating: 5.0,
    trips: 156,
    image: "https://i.pravatar.cc/150?u=juliana",
    bio: "Muito educada, sempre deixa gorjeta.",
    joinedDate: "Feb 2023"
  }
];

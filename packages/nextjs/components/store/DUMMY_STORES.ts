import { Store } from "~~/schemas/storeSchema";

export const DUMMY_STORES: Store[] = [
  {
    id: 1,
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    name: "KWIK-E-MART",
    type: "Supermarket",
    location: "",
    rating: 4.0,
    distance: "0.4 km",
    hours: "08:00 às 20:00",
    originalPrice: "R$ 45,26",
    price: "R$ 22,63",
    delivery: "R$ 5,99",
    image: "/placeholder.svg?height=80&width=80",
    bags: 5,
    pickup: true,
    tokenReward: 5,
  },
  {
    id: 2,
    address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    name: "Pizza Palace",
    type: "Restaurant",
    location: "",
    rating: 4.5,
    distance: "1.2 km",
    hours: "11:00 às 23:00",
    originalPrice: "R$ 60,00",
    price: "R$ 45,00",
    delivery: "R$ 10,00",
    image: "/pizza-placeholder.svg?height=80&width=80",
    bags: 2,
    pickup: false,
    tokenReward: 10,
  },
  {
    id: 3,
    address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    name: "Healthy Pharmacy",
    type: "Pharmacy",
    location: "",
    rating: 5.0,
    distance: "0.8 km",
    hours: "08:00 às 18:00",
    originalPrice: "R$ 100,00",
    price: "R$ 80,00",
    delivery: "R$ 7,50",
    image: "/pharmacy-placeholder.svg?height=80&width=80",
    bags: 1,
    pickup: true,
    tokenReward: 8,
  },
  {
    id: 4,
    address: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    name: "Fashion Forward",
    type: "Clothing",
    location: "",
    rating: 3.8,
    distance: "2.0 km",
    hours: "10:00 às 21:00",
    originalPrice: "R$ 200,00",
    price: "R$ 150,00",
    delivery: "R$ 15,00",
    image: "/clothing-placeholder.svg?height=80&width=80",
    bags: 3,
    pickup: false,
    tokenReward: 12,
  },
  {
    id: 5,
    address: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    name: "Gadget World",
    type: "Electronics",
    location: "",
    rating: 4.7,
    distance: "3.5 km",
    hours: "09:00 às 19:00",
    originalPrice: "R$ 500,00",
    price: "R$ 450,00",
    delivery: "R$ 20,00",
    image: "/electronics-placeholder.svg?height=80&width=80",
    bags: 1,
    pickup: true,
    tokenReward: 15,
  },
];
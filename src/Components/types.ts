import { Timestamp } from "firebase/firestore";

export interface UserDbData {
    id: string;
    userName: string;
    email: string;
    role: string
}

export interface Products {
    id: string;
    images: string[];
    description: string;
    name: string;
    type: string;
    price: number;
    discount: number;
    quantity: number;
    brand: string;
}
export interface Messages {
    id?: string
    name: string,
    phone: string,
    message: string,
    createdAt: Timestamp
}
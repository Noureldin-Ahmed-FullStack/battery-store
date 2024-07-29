
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
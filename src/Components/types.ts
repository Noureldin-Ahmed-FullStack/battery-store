
export interface UserDbData {
    id: string;
    userName: string;
    email: string;
}

export interface Products {
    id: string;
    images: string[];
    name: string;
    type: string;
    price: number;
    discount: number;
    count: number;
    brand: string;
}
export type ParsedDataType = {
    [key:string]: Array<any>;
}

export type PriceType = {
    amount: number;
    currency: {
        symbol: string;
        label: string;
    }
}

export type AttributeType = {
    id: string;
    value: string;
}

export type AttributeSetType = {
    id: string;
    name: string;
    type: string;
    items: AttributeType[];
}

export type ProductDataType = {
    id: string;
    name: string;
    brand: string;
    inStock: boolean;
    description: string;
    gallery: Array<string>;
    prices: PriceType[];
    attributes: AttributeSetType[];
}
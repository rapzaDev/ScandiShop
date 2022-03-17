export type ParsedDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: Array<any>;
};

export type PriceType = {
  amount: number;
  currency: {
    symbol: string;
    label: string;
  };
};

export type AttributeType = {
  id: string;
  value: string;

  /** @description Refers to the selected item option on cart products for each attribute item. */
  selected: boolean;
};

export type AttributeSetType = {
  id: string;
  name: string;
  type: string;
  items: AttributeType[];
};

export type ProductDataType = {
  id: string;
  name: string;
  brand: string;
  inStock: boolean;
  description: string;
  gallery: Array<string>;
  prices: PriceType[];
  attributes: AttributeSetType[];

  /** @description Refers to quantity of each product in the cart. */
  quantity: number;

  /**
   * @description Each product in cart products will have one unique key. That will make more ease
   * to locate any product and make changes on cart products.
   */
  KEY_ID: string;
};

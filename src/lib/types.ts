export type ProductsType = {
  id: string;
  categoryId: string;
  subCategoryId: string;
  title: string;
  description: string;
  thumbnail: string;
  off: number;
  en_name: string;
  en_s_name: string;
  fa_name: string;
  fa_s_name: string;
  variants: VariantType[];
};

export type VariantType = {
  id?: string;
  color: string;
  hex: string;
  count: string;
  price: number;
};

export type SubCategoryType = {
  id: string;
  fa_s_name: string;
  en_s_name: string;
};

export type CategoryType = {
  id: string;
  fa_name: string;
  en_name: string;
  subs: SubCategoryType[];
};

export type OrderProductType = {
  product_id: string;
  quantity: number;
  price_is: number;
  variant_id: string;
};

export type OrderProductsType = {
  products: OrderProductType[];
};

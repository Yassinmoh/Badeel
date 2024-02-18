import { Category } from "./Category";

export interface Product {
  id?:number;
  status?: string;
  productArName?: string;
  productEnName?: string;
  company?: string;
  details?: string;
  link?: string;
  categories?: Category[];
}

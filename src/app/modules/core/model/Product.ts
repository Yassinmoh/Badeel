export interface Product {
  id?:number | string;
  status?: string;
  productArName?: string;
  productEnName?: string;
  company?: string;
  details?: string;
  link?: string;
  category?: string;
  subCategory?: string;
  isReviewed?:boolean;
}

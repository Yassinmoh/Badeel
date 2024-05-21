export interface Category {
  id?: number;
  catArName?: string,
  catEnName?: string,
  subCategories?:SubCategory[]
}

export interface SubCategory {
  subCatArName: string
  subCatEnName: string
}

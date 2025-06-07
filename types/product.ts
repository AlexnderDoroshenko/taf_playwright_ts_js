//Product{
// name*	string
// description*	string
// price*	string($decimal)
// pattern: ^-?\d{0,8}(?:\.\d{0,2})?$
// categories*	[integer]
// brand*	string
// types	[string]
// audiences	[string]
// images	[ProductImage{
// url*	string($uri)
// maxLength: 1000
// }]
// discount	string($decimal)
// pattern: ^-?\d{0,3}(?:\.\d{0,2})?$
// stock	integer
// stars	string($decimal)
// pattern: ^-?\d{0,1}(?:\.\d{0,2})?$
// }

export interface ProductImage {
    url: string; // URI of the product image
}


export interface ProductDTO {
    id?: number;
    name: string;
    description: string;
    price: string; // decimal as string to avoid precision issues
    categories: number[]; // array of category IDs
    brand: string;
    types?: string[]; // optional array of product types
    audiences?: string[]; // optional array of target audiences
    images?: ProductImage[]; // optional array of product images
    discount?: string; // optional decimal as string
    stock?: number; // optional stock quantity
    stars?: string; // optional rating as decimal in string format
}
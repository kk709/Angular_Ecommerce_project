export interface signUp{
    name:string,
    password:string,
    email:string

}

export interface login{
    email:string;
    password:string;
}
export interface products{
    id:number;
    name:string;
    price:string;
    category:string;
    image:string;
    discription:string;
    quantity: undefined | number;
}
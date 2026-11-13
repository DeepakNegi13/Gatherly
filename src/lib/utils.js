export { cn } from "cn"
export function formatPrice(price,currency="INR") {
    const val = Number(price)
    if(!val) return "FREE"
    else return val+" "+currency;
 
}
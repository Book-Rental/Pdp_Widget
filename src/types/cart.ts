export interface AddToCartPayload {
    bookId: string;
    quantity: number;
    pricingMode: "rent" | "buy";
    rentalPeriod?: "day" | "week" | "month";
}
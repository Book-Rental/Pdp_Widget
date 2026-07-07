type RentalField =
    | "rentalPricePerDay"
    | "rentalPricePerWeek"
    | "rentalPricePerMonth";

export const BOOK_CONSTANTS = {
    LABELS: {
        RENTAL_PRICE: "Rental Price",
        SECURITY_DEPOSIT: "Security Deposit",
        AVAILABILITY: "Availability",
        RENTAL_DURATION: "Select Rental Duration",
        REFUNDABLE: "(Refundable)",
    },

    BUTTONS: {
        ADD_TO_CART: "Add To Cart",
        ADD_TO_WISHLIST: "Add to Wishlist",
    },

    RENTAL_OPTIONS: [
        {
            label: "1 Days",
            field: "rentalPricePerDay" as RentalField,
            variant: "outline",
        },
        {
            label: "7 Days",
            field: "rentalPricePerWeek" as RentalField,
            variant: "primary",
        },
        {
            label: "30 Days",
            field: "rentalPricePerMonth" as RentalField,
            variant: "outline",
        },
    ],

    RATING: {
        VALUE: 5,
        TEXT: "5.0",
    },
};
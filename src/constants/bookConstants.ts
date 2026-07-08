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
        PURCHASE_PRICE: "Purchase Price",
        CONDITION: "Condition",
    },

    TABS: {
        RENT: "Rent",
        BUY: "Buy",
    },

    BUTTONS: {
        ADD_TO_CART: "Add To Cart",
        ADD_TO_WISHLIST: "Add to Wishlist",
    },

    DETAILS: {
        ABOUT_BOOK: "About this Book",
        BOOK_DETAILS: "Book Details",
        PUBLISHER: "Publisher",
        LANGUAGE: "Language",
        PUBLISHED: "Published",
        PAGES: "Pages",
        GENRE: "Genre",
        AUTHOR: "Author",
        ISBN: "ISBN",
        EDITION: "Edition",
        NOT_AVAILABLE: "N/A",
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
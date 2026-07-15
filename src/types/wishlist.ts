export interface Wishlist {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    books: any;
    _id: string;
    name: string;
}

export interface WishlistResponse {
    status: string;
    message: string;
    data: Wishlist[];
}

export interface AddToWishlistPayload {
    wishlistId: string;
    bookId: string;
}

export interface CreateWishlistPayload {
    name: string;
}
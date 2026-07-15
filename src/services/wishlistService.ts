import { WishlistResponse, AddToWishlistPayload, CreateWishlistPayload, } from "../types/wishlist";

const API_URL = import.meta.env.VITE_API_URL;

export const getWishlistNames = async (
    userId: string
): Promise<WishlistResponse> => {
    const response = await fetch(
        `${API_URL}/api/wishList/getAllWishList/${userId}`,
        {
            credentials: "include",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return {
        ...result,
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        data: result.data.map((item: any) => ({
            _id: item.wishlistId,
            name: item.wishlistName,
            books: item.books,
        })),
    };
};

/**
 * Add book to wishlist
 */
export const addBookToWishlist = async (
    payload: AddToWishlistPayload
) => {
    const response = await fetch(
        `${API_URL}/api/wishList/add`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
};

/**
 * Create wishlist
 */
export const createWishlistGroup = async (
    userId: string,
    payload: CreateWishlistPayload
) => {
    const response = await fetch(
        `${API_URL}/api/wishList/group`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                name: payload.name,
            }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
};

export const removeBookFromWishlist = async (
    wishlistId: string,
    bookId: string
) => {
    const response = await fetch(
        `${API_URL}/api/wishList/delete/${bookId}`,
        {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wishlistId,
            }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    window.dispatchEvent(new CustomEvent("wishlist-refresh"));

    return result;
};
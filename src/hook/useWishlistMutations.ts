import { useMutation, useQueryClient } from "@tanstack/react-query";
import {addBookToWishlist,createWishlistGroup,removeBookFromWishlist,} from "../services/wishlistService";

export const useWishlistMutations = (userId: string) => {
    const queryClient = useQueryClient();

    const addBookMutation = useMutation({
        mutationFn: ({
            wishlistId,
            bookId,
        }: {
            wishlistId: string;
            bookId: string;
        }) =>
            addBookToWishlist({
                wishlistId,
                bookId,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlistNames", userId],
            });

            window.dispatchEvent(new CustomEvent("wishlist-refresh"));
        },
    });

    const createWishlistMutation = useMutation({
        mutationFn: ({ name }: { name: string }) =>
            createWishlistGroup(userId, { name }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlistNames", userId],
            });
        },
    });

    const removeBookMutation = useMutation({
        mutationFn: ({
            wishlistId,
            bookId,
        }: {
            wishlistId: string;
            bookId: string;
        }) => removeBookFromWishlist(wishlistId, bookId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlistNames", userId],
            });

            window.dispatchEvent(new CustomEvent("wishlist-refresh"));
        },
    });
    return {
        addBookMutation,
        createWishlistMutation,
        removeBookMutation
    };
};
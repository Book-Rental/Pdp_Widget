import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Modal, ModalHeader, ModalBody, Dropdown, Rb_Button, Rb_Input, } from "@rentbook/rentbook-ui-lib";
import { Book } from "../types/book";
import { useWishlistNames } from "../hook/useWishlistNames";
import { useWishlistMutations } from "../hook/useWishlistMutations";


interface WishlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    book: Book;
    userId: string;
}

const WishlistModal = ({
    isOpen,
    onClose,
    book,
    userId,
}: WishlistModalProps) => {
    const { data } = useWishlistNames(userId, isOpen);

    const { addBookMutation, createWishlistMutation, } = useWishlistMutations(userId);
    const wishlistOptions =
        data?.data.map((wishlist) => ({
            label: wishlist.name,
            value: wishlist._id,
        })) ?? [];
    const [selectedWishlist, setSelectedWishlist] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [newWishlist, setNewWishlist] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setSelectedWishlist("");
            setNewWishlist("");
            setIsCreating(false);
        }
    }, [isOpen]);

    const showToast = (
        message: string,
        type: "success" | "error" = "success"
    ) => {
        window.dispatchEvent(
            new CustomEvent("app-toast-notification", {
                detail: {
                    message,
                    type,
                },
            })
        );
    };

    const handleAdd = async (
        wishlistId: string,
        wishlistName: string
    ) => {
        try {
            console.log("Before API");

            await addBookMutation.mutateAsync({
                wishlistId,
                bookId: book._id,
            });

            console.log("After API");

            showToast(
                `"${book.name}" added to "${wishlistName}"`,
                "success"
            );

            onClose();
        } catch (error) {
            console.log("Inside catch");
            console.log(error);
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to add to wishlist";

            console.log("Before showToast");

            showToast(message, "error");

            console.log("After showToast");
        }
    };

    const handleCreate = async () => {
        try {
            const result =
                await createWishlistMutation.mutateAsync({
                    name: newWishlist.trim(),
                });

            await addBookMutation.mutateAsync({
                wishlistId: result.data._id,
                bookId: book._id,
            });

            showToast(
                `"${book.name}" added to "${newWishlist}"`,
                "success"
            );

            onClose();
        } catch (error) {
            showToast(
                error instanceof Error
                    ? error.message
                    : "Failed to create wishlist",
                "error"
            );
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHeader onClose={onClose}>
                {isCreating
                    ? "Create New Wishlist"
                    : "Add to Wishlist"}
            </ModalHeader>

            <ModalBody>
                {!isCreating ? (
                    <div className="flex flex-col gap-4">
                        <Dropdown
                            placeholder="Select Wishlist"
                            options={wishlistOptions}
                            value={selectedWishlist}
                            onChange={setSelectedWishlist}
                        />

                        <div className="flex justify-between items-center mt-4">
                            <button
                                type="button"
                                className="font-medium text-blue-600 hover:text-blue-700"
                                onClick={() =>
                                    setIsCreating(true)
                                }
                            >
                                + Create New Wishlist
                            </button>

                            <Rb_Button
                                disabled={
                                    !selectedWishlist ||
                                    addBookMutation.isPending
                                }
                                onClick={() => {
                                    const wishlist =
                                        data?.data.find(
                                            (w) =>
                                                w._id ===
                                                selectedWishlist
                                        );

                                    if (!wishlist) return;

                                    handleAdd(
                                        wishlist._id,
                                        wishlist.name
                                    );
                                }}
                            >
                                {addBookMutation.isPending
                                    ? "Adding..."
                                    : "Add to Wishlist"}
                            </Rb_Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        <Rb_Input
                            placeholder="Wishlist Name"
                            value={newWishlist}
                            onChange={(e) =>
                                setNewWishlist(
                                    e.target.value
                                )
                            }
                        />

                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                className="flex items-center gap-2 text-gray-600"
                                onClick={() => {
                                    setIsCreating(false);
                                    setNewWishlist("");
                                }}
                            >
                                <FiArrowLeft />
                                Back
                            </button>

                            <Rb_Button
                                disabled={
                                    !newWishlist.trim() ||
                                    createWishlistMutation.isPending ||
                                    addBookMutation.isPending
                                }
                                onClick={handleCreate}
                            >
                                {createWishlistMutation.isPending
                                    ? "Creating..."
                                    : "Create & Add"}
                            </Rb_Button>
                        </div>
                    </div>
                )}
            </ModalBody>
        </Modal>
    );
};

export default WishlistModal;
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BOOK_CONSTANTS } from "../constants/bookConstants";
import { BookInfoProps } from "../types/book";
import { Rb_Button, Rb_Icon, Rb_Text, } from "@rentbook/rentbook-ui-lib";
import { addToCart } from "../services/cartService";
import WishlistModal from "./WishlistModal";
import { useWishlistNames } from "../hook/useWishlistNames";
import { useWishlistMutations } from "../hook/useWishlistMutations";

const BookPricing = ({ book }: BookInfoProps) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [wishlistId, setWishlistId] = useState("");

    const defaultRental = BOOK_CONSTANTS.RENTAL_OPTIONS.findIndex(
        (item) => item.variant === "primary"
    );

    const [selectedRental, setSelectedRental] = useState(
        defaultRental >= 0 ? defaultRental : 0
    );

    // const [mode, setMode] = useState<"rent" | "buy">(
    //     book.availableForRent ? "rent" : "buy"
    // );
    const mode = "rent" as const;

    const activeRental =
        BOOK_CONSTANTS.RENTAL_OPTIONS[selectedRental];

    const { data } = useWishlistNames(user._id, true);

    const { removeBookMutation } =
        useWishlistMutations(user._id);

    useEffect(() => {
        if (!data?.data) return;

        let found = false;

        for (const wishlist of data.data) {
            const exists = wishlist.books?.some(
                // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                (item: any) => item.bookId === book._id
            );

            if (exists) {
                found = true;
                setWishlistId(wishlist._id);
                break;
            }
        }

        setIsWishlisted(found);
    }, [data, book._id]);

    const showToast = (
        message: string,
        type: "success" | "error"
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

    const handleAddToCart = async () => {
        try {
            await addToCart({
                bookId: book._id,
                quantity: 1,
                pricingMode: mode,
                rentalPeriod:
                    mode === "rent"
                        ? activeRental.value
                        : undefined,
            });

            showToast("Item added to cart", "success");
        } catch (error) {
            showToast(
                error instanceof Error
                    ? error.message
                    : "Failed to add item",
                "error"
            );
        }
    };

    const handleRemoveWishlist = async () => {
        try {
            await removeBookMutation.mutateAsync({
                wishlistId,
                bookId: book._id,
            });

            showToast(
                "Book removed from wishlist",
                "success"
            );

            setIsWishlisted(false);
        } catch (error) {
            showToast(
                error instanceof Error
                    ? error.message
                    : "Failed to remove from wishlist",
                "error"
            );
        }
    };

    return (
        <>
            {/* {book.availableForRent && book.availableForSale && (
                <div className="flex gap-5 border-gray-200 mb-6">
                    <button
                        onClick={() => setMode("rent")}
                        className={`pb-2.5 -mb-px text-[15px] border-b-2 ${mode === "rent"
                            ? "font-medium text-blue-600 border-blue-600"
                            : "font-normal text-black border-transparent"
                            }`}
                    >
                        {BOOK_CONSTANTS.TABS.RENT}
                    </button>

                    <button
                        onClick={() => setMode("buy")}
                        className={`pb-2.5 -mb-px text-[15px] border-b-2 ${mode === "buy"
                            ? "font-medium text-blue-600 border-blue-600"
                            : "font-normal text-black border-transparent"
                            }`}
                    >
                        {BOOK_CONSTANTS.TABS.BUY}
                    </button>
                </div>
            )} */}

            {mode === "rent" && book.availableForRent && (
                <>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <Rb_Text
                                variant="small"
                                className="text-gray-500"
                            >
                                {BOOK_CONSTANTS.LABELS.RENTAL_PRICE}
                            </Rb_Text>

                            <Rb_Text variant="h3">
                                ₹{book[activeRental.field]}
                                <Rb_Text
                                    variant="span"
                                    className="text-sm"
                                >
                                    {" "}
                                    / {activeRental.label}
                                </Rb_Text>
                            </Rb_Text>
                        </div>

                        <div>
                            <Rb_Text
                                variant="small"
                                className="text-gray-500"
                            >
                                {BOOK_CONSTANTS.LABELS.SECURITY_DEPOSIT}
                            </Rb_Text>

                            <Rb_Text
                                variant="h5"
                                className="text-green-600"
                            >
                                ₹{book.securityDeposit}
                                <Rb_Text
                                    variant="span"
                                    className="text-green-600"
                                >
                                    {BOOK_CONSTANTS.LABELS.REFUNDABLE}
                                </Rb_Text>
                            </Rb_Text>
                        </div>
                    </div>

                    <div className="mt-5">
                        <Rb_Text
                            variant="small"
                            className="text-gray-500"
                        >
                            {BOOK_CONSTANTS.LABELS.AVAILABILITY}
                        </Rb_Text>

                        <Rb_Text
                            variant="h6"
                            className="text-green-600"
                        >
                            {book.availabilityStatus}
                        </Rb_Text>
                    </div>

                    <div className="mt-6">
                        <Rb_Text className="font-semibold mb-3">
                            {BOOK_CONSTANTS.LABELS.RENTAL_DURATION}
                        </Rb_Text>

                        <div className="grid sm:grid-cols-3 gap-3">
                            {BOOK_CONSTANTS.RENTAL_OPTIONS.map(
                                (item, index) => {
                                    const active =
                                        selectedRental === index;

                                    return (
                                        <div
                                            key={item.label}
                                            onClick={() =>
                                                setSelectedRental(index)
                                            }
                                            className={`h-20 rounded-lg border cursor-pointer flex flex-col justify-center items-center ${active
                                                ? "border-blue-600 bg-blue-50"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            <Rb_Text
                                                variant="span"
                                                className={
                                                    active ? "text-blue-600" : ""
                                                }
                                            >
                                                {item.label}
                                            </Rb_Text>

                                            <Rb_Text
                                                variant="span"
                                                className={`font-semibold ${active ? "text-blue-600" : ""
                                                    }`}
                                            >
                                                ₹{book[item.field]}
                                            </Rb_Text>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* {mode === "buy" && book.availableForSale && (
                <>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <Rb_Text
                                variant="small"
                                className="text-gray-500"
                            >
                                {BOOK_CONSTANTS.LABELS.PURCHASE_PRICE}
                            </Rb_Text>

                            <Rb_Text variant="h3">
                                ₹{book.purchasePrice}
                            </Rb_Text>
                        </div>

                        <div>
                            <Rb_Text
                                variant="small"
                                className="text-gray-500"
                            >
                                {BOOK_CONSTANTS.LABELS.CONDITION}
                            </Rb_Text>

                            <Rb_Text variant="h6">
                                {book.condition}
                            </Rb_Text>
                        </div>
                    </div>

                    <div className="mt-5">
                        <Rb_Text
                            variant="small"
                            className="text-gray-500"
                        >
                            {BOOK_CONSTANTS.LABELS.AVAILABILITY}
                        </Rb_Text>

                        <Rb_Text
                            variant="h6"
                            className="text-green-600"
                        >
                            {book.availabilityStatus}
                        </Rb_Text>
                    </div>
                </>
            )} */}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Rb_Button
                    onClick={handleAddToCart}
                    className="w-full flex sm:flex-1 h-11 rounded-lg bg-blue-600 text-white"
                >
                    <Rb_Icon
                        icon={FaShoppingCart}
                        size={16}
                    />
                    <span className="ml-2">
                        {BOOK_CONSTANTS.BUTTONS.ADD_TO_CART}
                    </span>
                </Rb_Button>

                <Rb_Button
                    variant="outline"
                    onClick={() => {
                        if (isWishlisted) {
                            handleRemoveWishlist();
                        } else {
                            setIsWishlistOpen(true);
                        }
                    }}
                    className="w-full sm:flex-1 h-11 rounded-lg !text-black !border-black"
                >
                    {isWishlisted
                        ? "Remove from Wishlist"
                        : BOOK_CONSTANTS.BUTTONS.ADD_TO_WISHLIST}
                </Rb_Button>
            </div>

            <WishlistModal
                isOpen={isWishlistOpen}
                onClose={() => {
                    setIsWishlistOpen(false);
                }}
                book={book}
                userId={user._id}
            />
        </>
    );
};

export default BookPricing;
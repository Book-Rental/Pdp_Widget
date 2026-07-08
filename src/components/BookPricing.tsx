import { useState } from "react";
import {
    Rb_Button,
    Rb_Text,
    Rb_Icon,
} from "rentbook-ui-lib";
import { FaShoppingCart } from "react-icons/fa";
import { BOOK_CONSTANTS } from "../constants/bookConstants";
import { BookInfoProps } from "../types/book";

const BookPricing = ({ book }: BookInfoProps) => {
    const defaultRental = BOOK_CONSTANTS.RENTAL_OPTIONS.findIndex(
        (item) => item.variant === "primary"
    );

    const [selectedRental, setSelectedRental] = useState(
        defaultRental >= 0 ? defaultRental : 0
    );

    const [mode, setMode] = useState<"rent" | "buy">(
        book.availableForRent ? "rent" : "buy"
    );

    const activeRental =
        BOOK_CONSTANTS.RENTAL_OPTIONS[selectedRental];

    return (
        <>
            {book.availableForRent && book.availableForSale && (
                <div className="flex gap-5 border-gray-200 mb-6">
                    <button
                        onClick={() => setMode("rent")}
                        className={`pb-2.5 -mb-px text-[15px] border-b-2 ${mode === "rent"
                            ? "font-medium text-black border-blue-600"
                            : "font-normal text-gray-400 border-transparent"
                            }`}
                    >
                        {BOOK_CONSTANTS.TABS.RENT}
                    </button>

                    <button
                        onClick={() => setMode("buy")}
                        className={`pb-2.5 -mb-px text-[15px] border-b-2 ${mode === "buy"
                            ? "font-medium text-black border-blue-600"
                            : "font-normal text-gray-400 border-transparent"
                            }`}
                    >
                        {BOOK_CONSTANTS.TABS.BUY}
                    </button>
                </div>
            )}

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

            {mode === "buy" && book.availableForSale && (
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
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Rb_Button className="w-full flex sm:flex-1 h-11 rounded-lg bg-blue-600 text-white">
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
                    className="w-full sm:flex-1 h-11 rounded-lg !text-black !border-black"
                >
                    {BOOK_CONSTANTS.BUTTONS.ADD_TO_WISHLIST}
                </Rb_Button>
            </div>
        </>
    );
};

export default BookPricing;
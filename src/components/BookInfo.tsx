import { useState } from "react";
import { Rb_Button, Rb_Rating, Rb_Text, Rb_Icon } from "rentbook-ui-lib";
import { FaGlobe, FaFileAlt, FaShoppingCart } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";

import { BookInfoProps } from "../types/book";
import { BOOK_CONSTANTS } from "../constants/bookConstants";

const BookInfo = ({ book }: BookInfoProps) => {

  const defaultIndex = BOOK_CONSTANTS.RENTAL_OPTIONS.findIndex(
    (opt) => opt.variant === "primary"
  );
  const [selectedOption, setSelectedOption] = useState(
    defaultIndex >= 0 ? defaultIndex : 0
  );

  const activeOption = BOOK_CONSTANTS.RENTAL_OPTIONS[selectedOption];

  return (
    <div className="w-full px-4 sm:px-6 py-6">
      <Rb_Text variant="h1" className="text-2xl md:text-3xl">{book.name}</Rb_Text>
      <Rb_Text variant="h6" className="text-gray-500 mt-1">
        {book.author}
      </Rb_Text>
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <Rb_Rating value={BOOK_CONSTANTS.RATING.VALUE} className="flex" />
        <Rb_Text variant="span" className="text-gray-700">
          {BOOK_CONSTANTS.RATING.TEXT}
        </Rb_Text>
      </div>
      <div className="flex flex-wrap gap-4 md:gap-8 mt-6 text-gray-500 text-sm">
        <div className="flex items-center gap-1 font-medium">
          <Rb_Icon icon={FiBookOpen} size={16} />
          <Rb_Text variant="span">{book.edition}</Rb_Text>
        </div>
        <div className="flex items-center gap-1 font-medium">
          <Rb_Icon icon={FaGlobe} size={16} />
          <Rb_Text variant="span">{book.language}</Rb_Text>
        </div>
        <div className="flex items-center gap-1 font-medium">
          <Rb_Icon icon={FaFileAlt} size={16} />
          <Rb_Text variant="span">{book.numberOfPages} pages</Rb_Text>
        </div>
      </div>
      <hr className="my-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Rb_Text variant="small" className="text-gray-500 font-medium">
            {BOOK_CONSTANTS.LABELS.RENTAL_PRICE}
          </Rb_Text>
          <Rb_Text variant="h3">
            ₹{book[activeOption.field]}
            <Rb_Text variant="span" className="text-sm ">
              {" "}/ {activeOption.label}
            </Rb_Text>
          </Rb_Text>
        </div>

        <div>
          <Rb_Text variant="small" className="text-gray-500 font-medium">
            {BOOK_CONSTANTS.LABELS.SECURITY_DEPOSIT}
          </Rb_Text>
          <Rb_Text variant="h5" className="text-green-600">
            ₹{book.securityDeposit}
            <Rb_Text variant="span" className="gap-1 text-green-600">
              {BOOK_CONSTANTS.LABELS.REFUNDABLE}
            </Rb_Text>
          </Rb_Text>

        </div>
      </div>

      <div className="mt-5">
        <Rb_Text variant="small" className="text-gray-500  font-medium">
          {BOOK_CONSTANTS.LABELS.AVAILABILITY}
        </Rb_Text>
        <Rb_Text variant="h6" className="text-green-600">
          {book.availabilityStatus}
        </Rb_Text>
      </div>

      <div className="mt-5">
        <Rb_Text className="mb-2  font-semibold">
          {BOOK_CONSTANTS.LABELS.RENTAL_DURATION}
        </Rb_Text>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BOOK_CONSTANTS.RENTAL_OPTIONS.map((item, index) => {
            const isActive = index === selectedOption;
            return (
              <div
                key={item.label}
                onClick={() => setSelectedOption(index)}
                className={`h-20 border rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors
                 ${isActive
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                  }`}
              >
                <Rb_Text variant="span" className={`font-medium text-sm ${isActive ? "text-blue-700" : "text-gray-800"}`}>
                  {item.label}
                </Rb_Text>
                <Rb_Text variant="span" className={`font-semibold ${isActive ? "text-blue-700" : "text-gray-800"}`}>
                  ₹{book[item.field]}
                </Rb_Text>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Rb_Button
          className="flex flex-1 h-11 rounded-lg bg-blue-600 text-white"
        >
          <Rb_Text variant="span"><Rb_Icon icon={FaShoppingCart} size={16} /></Rb_Text>
          {BOOK_CONSTANTS.BUTTONS.ADD_TO_CART}
        </Rb_Button>
        <Rb_Button
          variant="outline"
          className="flex-1 h-11 rounded-lg !border-black"
        >
          {BOOK_CONSTANTS.BUTTONS.ADD_TO_WISHLIST}
        </Rb_Button>
      </div>
    </div>
  );
};

export default BookInfo;
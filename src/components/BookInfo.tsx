import { Rb_Rating, Rb_Text, Rb_Icon } from "rentbook-ui-lib";
import { FaGlobe, FaFileAlt } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { BookInfoProps } from "../types/book";
import { BOOK_CONSTANTS } from "../constants/bookConstants";
import BookPricing from "./BookPricing";

const BookInfo = ({ book }: BookInfoProps) => {
  return (
    <div className="w-full">

      <Rb_Text variant="h1" className="text-2xl md:text-3xl">
        {book.name}
      </Rb_Text>

      <Rb_Text variant="h6" className="text-gray-500 mt-1">
        {book.author}
      </Rb_Text>

      <div className="flex items-center gap-2 mt-3">
        <Rb_Rating
          value={BOOK_CONSTANTS.RATING.VALUE}
          className="flex"
        />

        <Rb_Text variant="span">
          {BOOK_CONSTANTS.RATING.TEXT}
        </Rb_Text>
      </div>

      <div className="flex flex-wrap gap-6 mt-6 text-gray-500">

        <div className="flex items-center gap-2">
          <Rb_Icon icon={FiBookOpen} size={16} />
          <Rb_Text variant="span">{book.edition}</Rb_Text>
        </div>

        <div className="flex items-center gap-2">
          <Rb_Icon icon={FaGlobe} size={16} />
          <Rb_Text variant="span">{book.language}</Rb_Text>
        </div>

        <div className="flex items-center gap-2">
          <Rb_Icon icon={FaFileAlt} size={16} />
          <Rb_Text variant="span">
            {book.numberOfPages} Pages
          </Rb_Text>
        </div>

      </div>

      <hr className="my-6" />

      <BookPricing book={book} />

    </div>
  );
};

export default BookInfo;
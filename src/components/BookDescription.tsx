import { BookDescriptionProps } from "../types/book";
import { BOOK_CONSTANTS } from "../constants/bookConstants";
import { Rb_Text } from "@rentbook/rentbook-ui-lib";

const BookDescription = ({ book }: BookDescriptionProps) => {
    return (
        <div className="border-t pt-6 md:pt-8">
            <div>
                <Rb_Text variant="h4" className="font-bold text-xl md:text-2xl">
                    {BOOK_CONSTANTS.DETAILS.ABOUT_BOOK}
                </Rb_Text>

                <Rb_Text
                    variant="p"
                    className="mt-3 text-gray-600 leading-7  text-justify text-sm md:text-base"
                >
                    {book.description}
                </Rb_Text>
            </div>

            <div className="mt-8">
                <Rb_Text
                    variant="h4"
                    className="font-bold mb-6 text-xl md:text-2xl"
                >
                    {BOOK_CONSTANTS.DETAILS.BOOK_DETAILS}
                </Rb_Text>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                    <DetailItem
                        label={BOOK_CONSTANTS.DETAILS.PUBLISHER}
                        value={book.publisher ?? BOOK_CONSTANTS.DETAILS.NOT_AVAILABLE}
                    />

                    <DetailItem
                        label={BOOK_CONSTANTS.DETAILS.LANGUAGE}
                        value={book.language}
                    />

                    <DetailItem
                        label={BOOK_CONSTANTS.DETAILS.PUBLISHED}
                        value={book.publicationDate ?? BOOK_CONSTANTS.DETAILS.NOT_AVAILABLE}
                    />

                    <DetailItem
                        label={BOOK_CONSTANTS.DETAILS.PAGES}
                        value={book.numberOfPages}
                    />

                    <DetailItem
                        label={BOOK_CONSTANTS.DETAILS.GENRE}
                        value={book.genre ?? BOOK_CONSTANTS.DETAILS.NOT_AVAILABLE}
                    />

                    <DetailItem
                        label={BOOK_CONSTANTS.DETAILS.AUTHOR}
                        value={book.author}
                    />

                    <DetailItem
                        label={BOOK_CONSTANTS.DETAILS.ISBN}
                        value={book.isbn ?? BOOK_CONSTANTS.DETAILS.NOT_AVAILABLE}
                    />

                    <DetailItem
                        label={BOOK_CONSTANTS.DETAILS.EDITION}
                        value={book.edition}
                    />
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) => (
    <div className="min-w-0">
        <Rb_Text variant="small" className="text-gray-500">
            {label}
        </Rb_Text>

        <Rb_Text
            variant="span"
            className="block mt-1 font-medium text-gray-800 break-words"
        >
            {value}
        </Rb_Text>
    </div>
);

export default BookDescription;
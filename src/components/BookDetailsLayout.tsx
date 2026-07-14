import { useBook } from "../hook/useBook";
import BookGallery from "./BookGallery";
import BookInfo from "./BookInfo";
import BookDescription from "./BookDescription";
import BookReviews from "./BookReviews";
import { useEffect } from "react";
import { Rb_LoadingSpinner } from "@rentbook/rentbook-ui-lib";

const BookDetailsLayout = () => {
    // const searchParams = new URLSearchParams(window.location.search);
    // const id = searchParams.get("bookId");
    const BOOK_ID = "6a4cf30f8fa028f067aee558";
    const { data, isLoading, isError } = useBook(BOOK_ID);

    useEffect(() => {
        const event = new CustomEvent("widget-loading-status", {
            detail: isLoading
        });
        window.dispatchEvent(event);
    }, [isLoading]);

    // if (!id) {
    //     return <div>Book ID not found.</div>;
    // }
    
    if (isLoading) {
        return <Rb_LoadingSpinner text="Loading book details..." />;
    }
    if (isError || !data) return <div>Unable to load book.</div>;

    const book = data.data;

    return (
        <section className="py-10">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
                    <div className="w-full lg:w-[360px] shrink-0">
                        <BookGallery book={book} />
                    </div>
                    <div className="flex-1">
                        <BookInfo book={book} />
                    </div>
                </div>
                <div className=" pt-10">
                    <BookDescription book={book} />
                </div>
                <div className="pt-10">
                    <BookReviews />
                </div>
            </div>
        </section>
    );
};

export default BookDetailsLayout;
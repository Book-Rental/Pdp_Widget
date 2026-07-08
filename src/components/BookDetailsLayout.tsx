import { useBook } from "../hook/useBook";
import BookGallery from "./BookGallery";
import BookInfo from "./BookInfo";
import BookDescription from "./BookDescription";
import BookReviews from "./BookReviews";
import { useParams } from "react-router-dom";

const BookDetailsLayout = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Book ID not found.</div>;
  }
  const { data, isLoading, isError } = useBook(id);

  if (isLoading) return <div>Loading...</div>;
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
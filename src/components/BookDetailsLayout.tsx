import { useBook } from "../hook/useBook";
import BookGallery from "./BookGallery";
import BookInfo from "./BookInfo";

const BOOK_ID = "6a3d04251d1789437feae0e5";

const BookDetailsLayout = () => {
  const { data, isLoading, isError } = useBook(BOOK_ID);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Unable to load book.</div>;
  }

  const book = data.data;
  return (
    <section className="py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 lg:flex-row lg:items-start">

        <div className="w-full lg:w-[340px] shrink-0">
          <BookGallery book={book} />
        </div>


        <div className="flex-1 max-w-3xl">
          <BookInfo book={book} />
        </div>
      </div>
    </section>
  );
};

export default BookDetailsLayout;
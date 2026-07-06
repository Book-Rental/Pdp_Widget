import BookGallery from "./BookGallery";
import BookInfo from "./BookInfo";

const BookDetailsLayout = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/5">
          <BookGallery />
        </div>

        <div className="md:w-3/5">
          <BookInfo />
        </div>
      </div>
    </div>
  );
};

export default BookDetailsLayout;
import { useEffect, useState } from "react";
import ThumbnailCarousel from "./ThumbnailCarousel";
import { BookInfoProps } from "../types/book";
import { Rb_Image } from "@rentbook/rentbook-ui-lib";

const BookGallery = ({ book }: BookInfoProps) => {

  const [selectedImage, setSelectedImage] = useState("");
  const images = [
    book?.coverImage,
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    ...(book?.images?.map((img: any) => img.url) || []),
  ].filter(Boolean) as string[];

  useEffect(() => {
    if (images.length) {
      setSelectedImage(images[0]);
    }
  }, [book]);

  return (
    <div className=" w-full">
      <div className="aspect-[3/4] w-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex items-center justify-center">
        {selectedImage && (
          <Rb_Image
            src={selectedImage}
            alt={book?.name || "Book Image"}
            className="h-full w-full object-contain p-4"
          />
        )}
      </div>
      <ThumbnailCarousel
        images={images}
        selectedImage={selectedImage}
        onSelectImage={setSelectedImage}
      />
    </div>
  );
};

export default BookGallery;
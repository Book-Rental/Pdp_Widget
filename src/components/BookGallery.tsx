import { useEffect, useState } from "react";

import ThumbnailCarousel from "./ThumbnailCarousel";
import { BookInfoProps } from "../types/book";


const BookGallery = ({ book }: BookInfoProps) => {

  const [selectedImage, setSelectedImage] = useState("");



  const images = [
    book?.coverImage,
    ...(book?.images?.map((img: any) => img.url) || []),
  ].filter(Boolean) as string[];

  useEffect(() => {
    if (images.length) {
      setSelectedImage(images[0]);
    }
  }, [book]);

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="aspect-[3/4] w-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex items-center justify-center">
        {selectedImage && (
          <img
            src={selectedImage}
            alt={book?.name}
            className="h-full w-full object-contain p-4 transition-all duration-300"
          />
        )}
      </div>

      {/* Thumbnail Carousel */}
      <ThumbnailCarousel
        images={images}
        selectedImage={selectedImage}
        onSelectImage={setSelectedImage}
      />
    </div>
  );
};

export default BookGallery;
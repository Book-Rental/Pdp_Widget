import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./ThumbnailCarousel.css";

interface ThumbnailCarouselProps {
    images: string[];
    selectedImage: string;
    onSelectImage: (image: string) => void;
}

const ThumbnailCarousel = ({
    images,
    selectedImage,
    onSelectImage,
}: ThumbnailCarouselProps) => {
    return (
        <div className="relative mt-5">
            <button className="thumb-prev absolute left-[-14px] top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow border hover:bg-gray-100">
                <ChevronLeft size={18} />
            </button>

            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: ".thumb-prev",
                    nextEl: ".thumb-next",
                }}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <button
                            type="button"
                            onClick={() => onSelectImage(image)}
                            className={`h-20 w-full overflow-hidden rounded-lg border-2 bg-white transition-all duration-200 ${selectedImage === image
                                ? "border-blue-600"
                                : "border-gray-200 hover:border-gray-400"
                                }`}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="h-full w-full object-contain p-1"
                            />
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button className="thumb-next absolute right-[-14px] top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow border hover:bg-gray-100">
                <ChevronRight size={18} />
            </button>
        </div>
    );
};

export default ThumbnailCarousel;
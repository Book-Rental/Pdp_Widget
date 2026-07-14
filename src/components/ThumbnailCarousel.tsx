import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./ThumbnailCarousel.css";

interface ThumbnailCarouselProps {
    images: string[];
    selectedIndex: number;
    onSelectImage: (index: number) => void;
}

const ThumbnailCarousel = ({
    images,
    selectedIndex,
    onSelectImage,
}: ThumbnailCarouselProps) => {
    const showNavigation = images.length > 4;
    return (
        <div className="relative mt-5">
            {showNavigation && (
                <button className="thumb-prev absolute left-[-14px] top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 border border-gray-100 shadow-md hover:bg-gray-100">
                    <ChevronLeft size={18} className="text-gray-600" />
                </button>
            )}
            <Swiper
                modules={[Navigation]}

                navigation={
                    showNavigation
                        ? {
                            prevEl: ".thumb-prev",
                            nextEl: ".thumb-next",
                        }
                        : false
                }
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <button
                            type="button"
                            onClick={() => onSelectImage(index)}
                            className={`h-20 w-full overflow-hidden rounded-lg border-2 bg-white transition-all duration-200 ${selectedIndex === index
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
            {showNavigation && (
                <button className="thumb-next absolute right-[-14px] top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 border border-gray-100 shadow-md hover:bg-gray-100">
                    <ChevronRight size={18} />
                </button>
            )}
        </div>

    );
};

export default ThumbnailCarousel;
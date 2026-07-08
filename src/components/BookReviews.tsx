import { Rb_Button, Rb_Rating, Rb_Text } from "rentbook-ui-lib";
import { FaStar } from "react-icons/fa";

const ratingDistribution = [
    { star: 5, percent: 70 },
    { star: 4, percent: 45 },
    { star: 3, percent: 30 },
    { star: 2, percent: 20 },
    { star: 1, percent: 10 },
];

const BookReviews = () => {
    return (
        <div className="mt-10 border-t pt-8">
            <div className="flex justify-between items-center">
                <Rb_Text variant="h5" className="font-semibold">
                    Ratings & Reviews
                </Rb_Text>

                <Rb_Button
                    variant="outline"
                    className="px-5 h-10 rounded-lg"
                >
                    Write a Review
                </Rb_Button>
            </div>
            <div className="mt-8 flex flex-col lg:flex-row items-start gap-8">
                <div className="flex gap-8 shrink-0">
                    <div className="min-w-[110px]">
                        <Rb_Text variant="h1" className=" text-5xl font-bold">
                            4.7
                        </Rb_Text>
                        <div className="mt-2">
                            <Rb_Rating value={5} className="flex" />
                        </div>
                        <Rb_Text
                            variant="small"
                            className="text-gray-500 mt-2 block"
                        >
                            300 reviews
                        </Rb_Text>
                    </div>
                    <div className="space-y-3 mt-2">
                        {ratingDistribution.map((item) => (
                            <div
                                key={item.star}
                                className="flex items-center gap-3"
                            >
                                <Rb_Text
                                    variant="span"
                                    className="w-4 text-sm"
                                >
                                    {item.star}
                                </Rb_Text>

                                <FaStar
                                    size={12}
                                    className="text-yellow-500"
                                />
                                <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-orange-400 rounded-full"
                                        style={{ width: `${item.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full lg:max-w-[650px] rounded-xlp-5 shadow-sm">
                    <div className=" items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/60?img=12"
                            alt="Reviewer"
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <Rb_Text variant="span" className="font-semibold block">
                                Rahul Sharma
                            </Rb_Text>
                            <Rb_Text
                                variant="small"
                                className="text-gray-500"
                            >
                                12 May 2024
                            </Rb_Text>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Rb_Rating value={5} className="flex" />
                    </div>
                    <Rb_Text
                        variant="p"
                        className="mt-3 text-gray-600"
                    >
                        Amazing book with a beautiful life lesson!
                    </Rb_Text>
                </div>
            </div>
        </div>
    );
};

export default BookReviews;
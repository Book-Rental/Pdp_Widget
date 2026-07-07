export interface BookImage {
  _id: string;
  url: string;
  altText: string;
}

export interface Book {
  _id: string;
  name: string;
  description: string;
  language: string;
  author: string;
  edition: string;
  coverImage: string;
  rentalPricePerDay: number;
  rentalPricePerWeek: number;
  rentalPricePerMonth: number;
  securityDeposit: number;
  numberOfPages: number;
  availabilityStatus: string;
  images: BookImage[];
  publisher?: string;
  genre?: string;
  isbn?: string;
  publicationDate?: string | null;
}

export interface BookResponse {
  status: string;
  message: string;
  data: Book;
}

export interface BookInfoProps {
  book: Book;
}

export interface BookDescriptionProps {
  book: Book;
}

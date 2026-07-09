import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BookGallery from "../components/BookGallery";
import { Book } from "../types/book";

// Mock ThumbnailCarousel
vi.mock("../components/ThumbnailCarousel", () => ({
  default: ({
    images,
  }: {
    images: string[];
    selectedImage: string;
    onSelectImage: (image: string) => void;
  }) => <div>ThumbnailCarousel ({images.length})</div>,
}));

const mockBook: Book = {
  _id: "1",
  listingType: "Rent",
  status: "Available",
  condition: "New",
  purchasePrice: 500,
  availableForSale: true,
  availableForRent: true,
  name: "Harry Potter",
  description: "Fantasy novel",
  language: "English",
  author: "J.K. Rowling",
  edition: "1st Edition",
  coverImage: "cover.jpg",
  rentalPricePerDay: 20,
  rentalPricePerWeek: 100,
  rentalPricePerMonth: 300,
  securityDeposit: 500,
  numberOfPages: 350,
  availabilityStatus: "Available",
  images: [
    {
      _id: "1",
      url: "image1.jpg",
      altText: "Image 1",
    },
    {
      _id: "2",
      url: "image2.jpg",
      altText: "Image 2",
    },
  ],
};

describe("BookGallery Component", () => {
  it("renders main book image", () => {
    render(<BookGallery book={mockBook} />);

    const image = screen.getByAltText("Harry Potter");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "cover.jpg");
  });

  it("renders thumbnail carousel", () => {
    render(<BookGallery book={mockBook} />);

    expect(
      screen.getByText("ThumbnailCarousel (3)")
    ).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<BookGallery book={mockBook} />);

    expect(screen.getByAltText("Harry Potter")).toBeInTheDocument();
  });

  it("shows cover image initially", () => {
    render(<BookGallery book={mockBook} />);

    expect(screen.getByAltText("Harry Potter")).toHaveAttribute(
      "src",
      "cover.jpg"
    );
  });

  it("includes cover image and gallery images", () => {
    render(<BookGallery book={mockBook} />);

    expect(
      screen.getByText("ThumbnailCarousel (3)")
    ).toBeInTheDocument();
  });
});
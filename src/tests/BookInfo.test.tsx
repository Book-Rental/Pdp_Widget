import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BookInfo from "../components/BookInfo";
import { Book } from "../types/book";

// Mock BookPricing
vi.mock("../components/BookPricing", () => ({
  default: () => <div>Mock Book Pricing</div>,
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
  description: "A fantasy novel",
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
  images: [],
};

describe("BookInfo Component", () => {
  it("renders book title", () => {
    render(<BookInfo book={mockBook} />);

    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
  });

  it("renders author name", () => {
    render(<BookInfo book={mockBook} />);

    expect(screen.getByText("J.K. Rowling")).toBeInTheDocument();
  });

  it("renders edition", () => {
    render(<BookInfo book={mockBook} />);

    expect(screen.getByText("1st Edition")).toBeInTheDocument();
  });

  it("renders language", () => {
    render(<BookInfo book={mockBook} />);

    expect(screen.getByText("English")).toBeInTheDocument();
  });

  it("renders number of pages", () => {
    render(<BookInfo book={mockBook} />);

    expect(screen.getByText("350 Pages")).toBeInTheDocument();
  });

  it("renders rating text", () => {
    render(<BookInfo book={mockBook} />);

    expect(screen.getByText("5.0")).toBeInTheDocument();
  });

  it("renders BookPricing component", () => {
    render(<BookInfo book={mockBook} />);

    expect(screen.getByText("Mock Book Pricing")).toBeInTheDocument();
  });
});
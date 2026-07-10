import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BookPricing from "../components/BookPricing";
import { Book } from "../types/book";

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
  images: [],
};

describe("BookPricing", () => {
  it("renders Rent tab by default", () => {
    render(<BookPricing book={mockBook} />);

    expect(screen.getByText("Rental Price")).toBeInTheDocument();
    expect(screen.getByText("Security Deposit")).toBeInTheDocument();
    expect(screen.getByText("Select Rental Duration")).toBeInTheDocument();
  });

  it("switches to Buy mode", () => {
    render(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByText("Buy"));

    expect(screen.getByText("Purchase Price")).toBeInTheDocument();
    expect(screen.getByText("Condition")).toBeInTheDocument();
  });

  it("renders Add To Cart button", () => {
    render(<BookPricing book={mockBook} />);

    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("renders Add to Wishlist button", () => {
    render(<BookPricing book={mockBook} />);

    expect(
      screen.getByRole("button", { name: /add to wishlist/i })
    ).toBeInTheDocument();
  });

  it("changes rental duration", () => {
    render(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByText("30 Days"));

    expect(screen.getAllByText("₹300")).toHaveLength(2);
  });

  it("shows availability", () => {
    render(<BookPricing book={mockBook} />);

    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("shows purchase price in buy mode", () => {
    render(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByText("Buy"));

    expect(screen.getByText("₹500")).toBeInTheDocument();
  });
  it("renders only buy section when renting is unavailable", () => {
    render(
      <BookPricing
        book={{
          ...mockBook,
          availableForRent: false,
          availableForSale: true,
        }}
      />
    );

    expect(screen.getByText("Purchase Price")).toBeInTheDocument();
    expect(screen.queryByText("Rental Price")).not.toBeInTheDocument();
  });

  it("renders only rent section when sale is unavailable", () => {
    render(
      <BookPricing
        book={{
          ...mockBook,
          availableForRent: true,
          availableForSale: false,
        }}
      />
    );

    expect(screen.getByText("Rental Price")).toBeInTheDocument();
    expect(screen.queryByText("Purchase Price")).not.toBeInTheDocument();
  });
  it("switches back to rent mode", () => {
    render(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByText("Buy"));
    fireEvent.click(screen.getByText("Rent"));

    expect(screen.getByText("Rental Price")).toBeInTheDocument();
  });
});
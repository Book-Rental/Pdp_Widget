import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BookDescription from "../components/BookDescription";
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
    description: "A fantasy novel about a young wizard.",
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
    publisher: "Bloomsbury",
    genre: "Fantasy",
    isbn: "9780747532743",
    publicationDate: "1997",
};

describe("BookDescription Component", () => {
    it("renders About this Book heading", () => {
        render(<BookDescription book={mockBook} />);

        expect(screen.getByText("About this Book")).toBeInTheDocument();
    });

    it("renders book description", () => {
        render(<BookDescription book={mockBook} />);

        expect(
            screen.getByText("A fantasy novel about a young wizard.")
        ).toBeInTheDocument();
    });

    it("renders Book Details heading", () => {
        render(<BookDescription book={mockBook} />);

        expect(screen.getByText("Book Details")).toBeInTheDocument();
    });

    it("renders publisher", () => {
        render(<BookDescription book={mockBook} />);

        expect(screen.getByText("Bloomsbury")).toBeInTheDocument();
    });

    it("renders language", () => {
        render(<BookDescription book={mockBook} />);

        expect(screen.getByText("English")).toBeInTheDocument();
    });

    it("renders publication year", () => {
        render(<BookDescription book={mockBook} />);

        expect(screen.getByText("1997")).toBeInTheDocument();
    });

    it("renders pages", () => {
        render(<BookDescription book={mockBook} />);

        expect(screen.getByText("350")).toBeInTheDocument();
    });

    it("renders genre", () => {
        render(<BookDescription book={mockBook} />);

        expect(screen.getByText("Fantasy")).toBeInTheDocument();
    });

    it("renders author", () => {
        render(<BookDescription book={mockBook} />);

        expect(screen.getByText("J.K. Rowling")).toBeInTheDocument();
    });

    it("renders isbn", () => {
        render(<BookDescription book={mockBook} />);

        expect(screen.getByText("9780747532743")).toBeInTheDocument();
    });

    it("renders edition", () => {
        render(<BookDescription book={mockBook} />);

        expect(screen.getByText("1st Edition")).toBeInTheDocument();
    });

    it("renders N/A when optional fields are missing", () => {
        const bookWithoutOptionalFields: Book = {
            ...mockBook,
            publisher: undefined,
            genre: undefined,
            isbn: undefined,
            publicationDate: null,
        };

        render(<BookDescription book={bookWithoutOptionalFields} />);

        expect(screen.getAllByText("N/A")).toHaveLength(4);
    });
});
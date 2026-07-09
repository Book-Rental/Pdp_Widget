import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BookDetailsLayout from "../components/BookDetailsLayout";

// Mock useParams
vi.mock("react-router-dom", () => ({
    useParams: vi.fn(),
}));

// Mock useBook
vi.mock("../hook/useBook", () => ({
    useBook: vi.fn(),
}));

// Mock child components
vi.mock("../components/BookGallery", () => ({
    default: () => <div>BookGallery</div>,
}));

vi.mock("../components/BookInfo", () => ({
    default: () => <div>BookInfo</div>,
}));

vi.mock("../components/BookDescription", () => ({
    default: () => <div>BookDescription</div>,
}));

vi.mock("../components/BookReviews", () => ({
    default: () => <div>BookReviews</div>,
}));

import { useParams } from "react-router-dom";
import { useBook } from "../hook/useBook";

const mockBook = {
    _id: "1",
    listingType: "Rent",
    status: "Available",
    condition: "New",
    purchasePrice: 500,
    availableForSale: true,
    availableForRent: true,
    name: "Harry Potter",
    description: "Description",
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

describe("BookDetailsLayout", () => {
    it("shows Book ID not found", () => {
        vi.mocked(useParams).mockReturnValue({});

        vi.mocked(useBook).mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: false,
        } as never);

        render(<BookDetailsLayout />);

        expect(screen.getByText("Book ID not found.")).toBeInTheDocument();
    });

    it("shows loading state", () => {
        vi.mocked(useParams).mockReturnValue({ id: "1" });

        vi.mocked(useBook).mockReturnValue({
            data: undefined,
            isLoading: true,
            isError: false,
        } as never);

        render(<BookDetailsLayout />);

        expect(
            screen.getByText("Loading book details...")
        ).toBeInTheDocument();
    });

    it("shows error state", () => {
        vi.mocked(useParams).mockReturnValue({ id: "1" });

        vi.mocked(useBook).mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
        } as never);

        render(<BookDetailsLayout />);

        expect(screen.getByText("Unable to load book.")).toBeInTheDocument();
    });

    it("renders all child components", () => {
        vi.mocked(useParams).mockReturnValue({ id: "1" });

        vi.mocked(useBook).mockReturnValue({
            data: {
                data: mockBook,
            },
            isLoading: false,
            isError: false,
        } as never);

        render(<BookDetailsLayout />);

        expect(screen.getByText("BookGallery")).toBeInTheDocument();
        expect(screen.getByText("BookInfo")).toBeInTheDocument();
        expect(screen.getByText("BookDescription")).toBeInTheDocument();
        expect(screen.getByText("BookReviews")).toBeInTheDocument();
    });
});
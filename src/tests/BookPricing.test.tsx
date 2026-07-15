import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import BookPricing from "../components/BookPricing";
import { Book } from "../types/book";
import { useWishlistNames } from "../hook/useWishlistNames";

const { mockAddToCart, mockMutateAsync } = vi.hoisted(() => ({
  mockAddToCart: vi.fn(),
  mockMutateAsync: vi.fn(),
}));

vi.mock("../services/cartService", () => ({
  addToCart: mockAddToCart,
}));

vi.mock("../hook/useWishlistNames", () => ({
  useWishlistNames: vi.fn(),
}));

const mockedUseWishlistNames = vi.mocked(useWishlistNames);

vi.mock("../hook/useWishlistMutations", () => ({
  useWishlistMutations: vi.fn(() => ({
    removeBookMutation: {
      mutateAsync: mockMutateAsync,
    },
  })),
}));

vi.mock("../components/WishlistModal", () => ({
  default: ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) =>
    isOpen ? (
      <div>
        <div>Wishlist Modal</div>
        <button onClick={onClose}>Close Modal</button>
      </div>
    ) : null,
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
  images: [],
};

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

beforeEach(() => {
  vi.clearAllMocks();

  localStorage.setItem(
    "user",
    JSON.stringify({
      _id: "user1",
    })
  );

  mockedUseWishlistNames.mockReturnValue({
    data: {
      data: [],
    },
     // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } as any);
});

describe("BookPricing", () => {
  it("renders Rent tab by default", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(screen.getByText("Rental Price")).toBeInTheDocument();
    expect(screen.getByText("Security Deposit")).toBeInTheDocument();
    expect(screen.getByText("Select Rental Duration")).toBeInTheDocument();
  });

  it("renders Add To Cart button", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("renders Add to Wishlist button", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(
      screen.getByRole("button", { name: /add to wishlist/i })
    ).toBeInTheDocument();
  });

  it("changes rental duration", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByText("30 Days"));

    expect(screen.getAllByText("₹300")).toHaveLength(2);
  });

  it("shows availability", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("renders only rent section when sale is unavailable", () => {
    renderWithQueryClient(
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

  it("adds item to cart successfully", async () => {
    mockAddToCart.mockResolvedValue({});

    const toastSpy = vi.spyOn(window, "dispatchEvent");

    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      })
    );

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalled();
    });

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "app-toast-notification",
      })
    );
  });

  it("shows error toast when add to cart fails", async () => {
    mockAddToCart.mockRejectedValue(new Error("Failed"));

    const toastSpy = vi.spyOn(window, "dispatchEvent");

    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      })
    );

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalled();
    });

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "app-toast-notification",
      })
    );
  });

  it("shows remove from wishlist button when book is already wishlisted", async () => {
    mockedUseWishlistNames.mockReturnValue({
      data: {
        data: [
          {
            _id: "wishlist1",
            books: [{ bookId: "1" }],
          },
        ],
      },
       // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } as any);

    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(
      await screen.findByRole("button", {
        name: /remove from wishlist/i,
      })
    ).toBeInTheDocument();
  });

  it("removes book from wishlist successfully", async () => {
    mockedUseWishlistNames.mockReturnValue({
      data: {
        data: [
          {
            _id: "wishlist1",
            books: [{ bookId: "1" }],
          },
        ],
      },
       // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } as any);

    mockMutateAsync.mockResolvedValue({});

    const toastSpy = vi.spyOn(window, "dispatchEvent");

    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(
      await screen.findByRole("button", {
        name: /remove from wishlist/i,
      })
    );

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        wishlistId: "wishlist1",
        bookId: "1",
      });
    });

    expect(toastSpy).toHaveBeenCalled();
  });

  it("shows error toast when removing wishlist fails", async () => {
    mockedUseWishlistNames.mockReturnValue({
      data: {
        data: [
          {
            _id: "wishlist1",
            books: [{ bookId: "1" }],
          },
        ],
      },
       // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } as any);

    mockMutateAsync.mockRejectedValue(new Error("Failed"));

    const toastSpy = vi.spyOn(window, "dispatchEvent");

    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(
      await screen.findByRole("button", {
        name: /remove from wishlist/i,
      })
    );

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
    });

    expect(toastSpy).toHaveBeenCalled();
  });

  it("opens wishlist modal when book is not wishlisted", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /add to wishlist/i,
      })
    );
    expect(screen.getByText("Wishlist Modal")).toBeInTheDocument();
  });

  it("closes wishlist modal", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    // Open modal
    fireEvent.click(
      screen.getByRole("button", {
        name: /add to wishlist/i,
      })
    );

    expect(screen.getByText("Wishlist Modal")).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByText("Close Modal"));

    // Modal should disappear
    expect(screen.queryByText("Wishlist Modal")).not.toBeInTheDocument();
  });
});
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import BookPricing from "../components/BookPricing";
import { Book } from "../types/book";

const {
  mockAddToCart,
  mockMutateAsync,
  mockRemoveMutation,
} = vi.hoisted(() => ({
  mockAddToCart: vi.fn(),
  mockMutateAsync: vi.fn(),
  mockRemoveMutation: {
    mutateAsync: vi.fn(),
    isPending: false,
  },
}));

vi.mock("../services/cartService", () => ({
  addToCart: mockAddToCart,
}));

vi.mock("../hook/useWishlistMutations", () => ({
  useWishlistMutations: vi.fn(() => ({
    removeBookMutation: mockRemoveMutation,
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
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

const setHostState = (
  userInfo: { _id: string } | undefined = { _id: "user1" },
  wishlists: Record<string, string[]> = {}
) => {
  window.HOST_USER_INFO = userInfo;
  window.HOST_WISHLISTS = wishlists;
};

describe("BookPricing", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockRemoveMutation.mutateAsync = mockMutateAsync;
    mockRemoveMutation.isPending = false;

    setHostState({ _id: "user1" }, {});
  });

  afterEach(() => {
    window.HOST_USER_INFO = undefined;
    window.HOST_WISHLISTS = {};
  });

  it("renders rental pricing information", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(screen.getByText("Rental Price")).toBeInTheDocument();
    expect(screen.getByText("Security Deposit")).toBeInTheDocument();
    expect(screen.getByText("Select Rental Duration")).toBeInTheDocument();
  });

  it("renders Add to Cart button", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("renders Add to Wishlist button when book is not wishlisted", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(
      screen.getByRole("button", { name: /add to wishlist/i })
    ).toBeInTheDocument();
  });

  it("renders Remove from Wishlist button when book is already wishlisted", () => {
    setHostState({ _id: "user1" }, { wishlist1: ["1"] });

    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(
      screen.getByRole("button", { name: /remove from wishlist/i })
    ).toBeInTheDocument();
  });

  it("changes rental duration when a duration is selected", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByText("30 Days"));

    expect(screen.getAllByText("₹300")).toHaveLength(2);
  });

  it("displays book availability", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("does not render rental section when rent is unavailable", () => {
    renderWithQueryClient(
      <BookPricing book={{ ...mockBook, availableForRent: false }} />
    );

    expect(screen.queryByText("Rental Price")).not.toBeInTheDocument();
    expect(screen.queryByText("Select Rental Duration")).not.toBeInTheDocument();
  });

  it("adds book to cart successfully", async () => {
    mockAddToCart.mockResolvedValueOnce({});

    const dispatchEventSpy = vi.spyOn(window, "dispatchEvent");

    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith(
        expect.objectContaining({
          bookId: "1",
          quantity: 1,
          pricingMode: "rent",
        })
      );
    });

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: "app-toast-notification" })
    );
  });

  it("disables Add to Cart button while the request is in flight", async () => {
    let resolvePromise: () => void;
    mockAddToCart.mockReturnValue(
      new Promise<void>((resolve) => {
        resolvePromise = resolve;
      })
    );

    renderWithQueryClient(<BookPricing book={mockBook} />);

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    await waitFor(() => expect(button).toBeDisabled());

    resolvePromise!();

    await waitFor(() => expect(button).not.toBeDisabled());
  });

  it("shows error toast when adding book to cart fails", async () => {
    mockAddToCart.mockRejectedValueOnce(new Error("Failed to add item"));

    const dispatchEventSpy = vi.spyOn(window, "dispatchEvent");

    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalled();
    });

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: "app-toast-notification" })
    );
  });

  it("opens wishlist modal when Add to Wishlist is clicked", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByRole("button", { name: /add to wishlist/i }));

    expect(screen.getByText("Wishlist Modal")).toBeInTheDocument();
  });

  it("closes wishlist modal", () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByRole("button", { name: /add to wishlist/i }));
    expect(screen.getByText("Wishlist Modal")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    expect(screen.queryByText("Wishlist Modal")).not.toBeInTheDocument();
  });

  it("removes book from wishlist successfully", async () => {
    setHostState({ _id: "user1" }, { wishlist1: ["1"] });

    mockMutateAsync.mockResolvedValueOnce({});

    const dispatchEventSpy = vi.spyOn(window, "dispatchEvent");

    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByRole("button", { name: /remove from wishlist/i }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        wishlistId: "wishlist1",
        bookId: "1",
      });
    });

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: "app-toast-notification" })
    );
  });

  it("shows error toast when removing book from wishlist fails", async () => {
    setHostState({ _id: "user1" }, { wishlist1: ["1"] });

    mockMutateAsync.mockRejectedValueOnce(new Error("Failed to remove from wishlist"));

    const dispatchEventSpy = vi.spyOn(window, "dispatchEvent");

    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByRole("button", { name: /remove from wishlist/i }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
    });

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: "app-toast-notification" })
    );
  });

  it("disables wishlist button while removal is pending", () => {
    mockRemoveMutation.isPending = true;
    setHostState({ _id: "user1" }, { wishlist1: ["1"] });

    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(
      screen.getByRole("button", { name: /remove from wishlist/i })
    ).toBeDisabled();
  });

  it("updates wishlist button when wishlist-state-changed event is dispatched", async () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(
      screen.getByRole("button", { name: /add to wishlist/i })
    ).toBeInTheDocument();

    fireEvent(
      window,
      new CustomEvent("wishlist-state-changed", {
        detail: { wishlist1: ["1"] },
      })
    );

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /remove from wishlist/i })
      ).toBeInTheDocument();
    });
  });

  it("does not crash when wishlist-state-changed fires without a detail payload", async () => {
    renderWithQueryClient(<BookPricing book={mockBook} />);

    // No detail at all — this used to crash with
    // "Cannot convert undefined or null to object" before the `?? {}` guard.
    fireEvent(window, new CustomEvent("wishlist-state-changed"));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /add to wishlist/i })
      ).toBeInTheDocument();
    });
  });

  it("updates user info after a host state event", async () => {
    setHostState(undefined, {});

    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(
      screen.getByRole("button", { name: /add to wishlist/i })
    ).toBeInTheDocument();

    window.HOST_USER_INFO = { _id: "user2" };

    fireEvent(
      window,
      new CustomEvent("wishlist-state-changed", {
        detail: { wishlist2: ["1"] },
      })
    );

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /remove from wishlist/i })
      ).toBeInTheDocument();
    });
  });

  it("does not mark the book as wishlisted when other wishlists exist without this book", () => {
    setHostState({ _id: "user1" }, { wishlist1: ["999"] });

    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(
        screen.getByRole("button", { name: /add to wishlist/i })
    ).toBeInTheDocument();
    expect(
        screen.queryByRole("button", { name: /remove from wishlist/i })
    ).not.toBeInTheDocument();
  });

  it("falls back to an empty wishlist map when HOST_WISHLISTS is undefined", () => {
    window.HOST_USER_INFO = { _id: "user1" };
    window.HOST_WISHLISTS = undefined as unknown as Record<string, string[]>;

    renderWithQueryClient(<BookPricing book={mockBook} />);

    expect(
        screen.getByRole("button", { name: /add to wishlist/i })
    ).toBeInTheDocument();
  });

  it("shows fallback error message when add to cart fails with a non-Error value", async () => {
    mockAddToCart.mockRejectedValueOnce("network down");

    const dispatchEventSpy = vi.spyOn(window, "dispatchEvent");

    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    await waitFor(() => {
        expect(dispatchEventSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "app-toast-notification",
                detail: expect.objectContaining({ message: "Failed to add item" }),
            })
        );
    });
  });

  it("shows fallback error message when removing from wishlist fails with a non-Error value", async () => {
    setHostState({ _id: "user1" }, { wishlist1: ["1"] });
    mockMutateAsync.mockRejectedValueOnce("network down");

    const dispatchEventSpy = vi.spyOn(window, "dispatchEvent");

    renderWithQueryClient(<BookPricing book={mockBook} />);

    fireEvent.click(screen.getByRole("button", { name: /remove from wishlist/i }));

    await waitFor(() => {
        expect(dispatchEventSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "app-toast-notification",
                detail: expect.objectContaining({
                    message: "Failed to remove from wishlist",
                }),
            })
        );
    });
  });

});
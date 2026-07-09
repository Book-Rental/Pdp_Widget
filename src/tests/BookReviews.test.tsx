import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BookReviews from "../components/BookReviews";

describe("BookReviews Component", () => {
  it("renders ratings and reviews heading", () => {
    render(<BookReviews />);

    expect(
      screen.getByText("Ratings & Reviews")
    ).toBeInTheDocument();
  });

  it("renders Write a Review button", () => {
    render(<BookReviews />);

    expect(
      screen.getByRole("button", { name: /write a review/i })
    ).toBeInTheDocument();
  });

  it("renders overall rating", () => {
    render(<BookReviews />);

    expect(screen.getByText("4.7")).toBeInTheDocument();
  });

  it("renders total reviews", () => {
    render(<BookReviews />);

    expect(screen.getByText("300 reviews")).toBeInTheDocument();
  });

  it("renders reviewer name", () => {
    render(<BookReviews />);

    expect(screen.getByText("Rahul Sharma")).toBeInTheDocument();
  });

  it("renders review date", () => {
    render(<BookReviews />);

    expect(screen.getByText("12 May 2024")).toBeInTheDocument();
  });

  it("renders review comment", () => {
    render(<BookReviews />);

    expect(
      screen.getByText("Amazing book with a beautiful life lesson!")
    ).toBeInTheDocument();
  });

  it("renders reviewer image", () => {
    render(<BookReviews />);

    expect(screen.getByAltText("Reviewer")).toBeInTheDocument();
  });

  it("renders all rating distribution values", () => {
    render(<BookReviews />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
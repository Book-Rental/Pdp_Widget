import axios from "axios";
import { BookResponse } from "../types/book";

const BASE_URL = "https://be-book-rental.onrender.com/api";

export const getBook = async (
  id: string
): Promise<BookResponse> => {
  const response = await axios.get<BookResponse>(
    `${BASE_URL}/book/${id}`
  );

  return response.data;
};
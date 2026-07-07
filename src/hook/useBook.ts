import { useQuery } from "@tanstack/react-query";
import { getBook } from "../services/book.service";

export const useBook = (id: string) => {
    return useQuery({
        queryKey: ["book", id],
        queryFn: () => getBook(id),
        enabled: Boolean(id),
    });
};
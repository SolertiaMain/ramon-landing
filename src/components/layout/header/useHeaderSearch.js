"use client";

import { useEffect, useMemo, useState } from "react";
import { SEARCH_INDEX } from "@/content/searchIndex";

const normalize = (s) =>
    (s ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

export function useHeaderSearch(searchOpen) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // Memo so SEARCH_INDEX isn't re-evaluated every render
    const index = useMemo(() => SEARCH_INDEX, []);

    const runSearch = (rawQ) => {
        const q = normalize(rawQ);

        if (!q) {
            setResults([]);
            return;
        }

        const filtered = index
            .filter((item) => normalize(item.title).includes(q))
            .slice(0, 8);

        setResults(filtered);
    };

    // Live suggestions (debounced)
    useEffect(() => {
        if (!searchOpen) return;

        const t = setTimeout(() => runSearch(query), 180);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, searchOpen]);

    const reset = () => {
        setQuery("");
        setResults([]);
    };

    return {
        query,
        setQuery,
        results,
        runSearch,
        reset,
    };
}

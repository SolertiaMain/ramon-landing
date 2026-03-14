"use client";

import { useEffect, useMemo, useState } from "react";
import { SEARCH_INDEX } from "@/content/searchIndex";

function normalize(value) {
    return String(value ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\p{L}\p{N}\s/-]/gu, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function tokenize(value) {
    return normalize(value).split(" ").filter(Boolean);
}

function scoreItem(item, tokens) {
    const title = normalize(item.title);
    const subtitle = normalize(item.subtitle);
    const description = normalize(item.description);
    const keywords = normalize((item.keywords || []).join(" "));
    const bodyText = normalize(item.bodyText);
    const searchableText = normalize(item.searchableText);

    let score = 0;

    for (const token of tokens) {
        if (!searchableText.includes(token)) {
            return -1;
        }

        if (title === token) score += 120;
        else if (title.startsWith(token)) score += 80;
        else if (title.includes(token)) score += 55;

        if (keywords.includes(token)) score += 35;
        if (subtitle.includes(token)) score += 20;
        if (description.includes(token)) score += 14;
        if (bodyText.includes(token)) score += 8;
        if (item.type && normalize(item.type).includes(token)) score += 10;
    }

    if (tokens.length > 1) {
        const joined = tokens.join(" ");
        if (title.includes(joined)) score += 40;
        if (searchableText.includes(joined)) score += 20;
    }

    return score;
}

export function useHeaderSearch(searchOpen) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const index = useMemo(() => SEARCH_INDEX, []);

    const runSearch = (rawQuery) => {
        const normalizedQuery = normalize(rawQuery);

        if (!normalizedQuery) {
            setResults([]);
            return;
        }

        const tokens = tokenize(normalizedQuery);

        if (tokens.length === 0) {
            setResults([]);
            return;
        }

        const ranked = index
            .map((item) => ({
                ...item,
                _score: scoreItem(item, tokens),
            }))
            .filter((item) => item._score >= 0)
            .sort((a, b) => {
                if (b._score !== a._score) return b._score - a._score;
                return a.title.localeCompare(b.title, "es");
            })
            .slice(0, 8)
            .map(({ _score, ...item }) => item);

        setResults(ranked);
    };

    useEffect(() => {
        if (!searchOpen) return;

        const timer = setTimeout(() => {
            runSearch(query);
        }, 180);

        return () => clearTimeout(timer);
    }, [query, searchOpen]);

    const clearResults = () => {
        setResults([]);
    };

    const clearSearch = () => {
        setQuery("");
        setResults([]);
    };

    return {
        query,
        setQuery,
        results,
        runSearch,
        clearResults,
        clearSearch,
    };
}
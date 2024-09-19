import { IArticle } from "@interfaces/article";
import { getArticles } from "@services/endpoints";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";

interface FilterContextType {
  loading: boolean;
  results: any[];
  filters: { [key: string]: any };
  error: string | null;
  setFilters: (filters: { [key: string]: any }) => void;
  fetchResults: (filters: { [key: string]: any }) => Promise<void>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<IArticle[]>([]);
  const [filters, setFiltersState] = useState<{ [key: string]: any }>({});
  const [error, setError] = useState<string | null>(null);

  // Function to set filters
  const setFilters = (newFilters: { [key: string]: any }) => {
    setFiltersState(newFilters);
  };

  const fetchResults = async (filter?: { [key: string]: any }) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate loading an API call here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const fetchedResults = await getArticles(filter);
      setResults(fetchedResults);
    } catch (err) {
      setError("Error fetching results");
    } finally {
      setLoading(false);
    }
  };

  // fetch on first load
  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <FilterContext.Provider
      value={{ loading, results, filters, error, setFilters, fetchResults }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to access the FilterContext
export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};

/// HOOKS
import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useFetch } from "../utils/hooks/useFetch";
/// INTERFACES - TYPES
import {
  ActionsContextTypes,
  RequestBase,
  RequestExtense,
  Stock,
} from "../utils/Types";

const ActionsContext = createContext<ActionsContextTypes>(
  {} as ActionsContextTypes
);
export function useActions() {
  const context = useContext(ActionsContext);
  if (!context)
    throw new Error("useActions must be used within a Actions provider");
  return context;
}

export const ProviderActions = ({ children }: PropsWithChildren) => {
  // declared states
  const [favorites, setFavorites] = useState<Stock[]>([]);

  // manage favorites
  const manageFavorites = (typeAction: "add" | "remove", data: Stock) => {
    if (typeAction === "add") {
      setFavorites((prev) => [...prev, data]);
    } else {
      setFavorites((prev) =>
        prev?.filter(
          (stock) =>
            stock?.exchange !== data?.exchange || stock?.symbol !== data?.symbol
        )
      );
    }
  };

  // Retrieve stocks
  const retrieveStocks = async (params: RequestBase) => {
    try {
      const response = await useFetch({
        entity: "stocks",
        sizeList: params?.sizeList,
        symbol: params?.symbol,
        exchange: params?.exchange,
      });
      return response;
    } catch (error) {
      console.log("Error in retrieve stocks ", error);
    }
  };

  // Retrieve time series
  const retrieveTimeSeries = async (params: RequestExtense) => {
    try {
      const response = await useFetch({
        entity: "time_series",
        sizeList: params?.sizeList,
        symbol: params?.symbol,
        exchange: params?.exchange,
        start_date: params?.start_date,
        end_date: params?.end_date,
        interval: params?.interval,
      });
      if (response?.ok) {
        return response;
      }
    } catch (error) {
      console.log("Error in retrieve stocks ", error);
    }
  };

  // declared side effects
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites?.length]);

  const getFavorites = localStorage?.getItem("favorites");
  useEffect(() => {
    if (getFavorites) {
      setFavorites(JSON.parse(getFavorites));
    }
  }, []);

  return (
    <ActionsContext.Provider
      value={{
        retrieveStocks,
        retrieveTimeSeries,
        manageFavorites,
        favorites,
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
};

export default ActionsContext;

interface useFetchProps {
  entity: "stocks" | "time_series";
  symbol?: string;
  interval?: string;
  start_date?: string;
  end_date?: string;
  sizeList?: string;
  exchange?: string;
}
export const useFetch = async ({
  entity,
  symbol,
  interval,
  start_date,
  end_date,
  sizeList,
  exchange,
}: useFetchProps): Promise<Response> => {
  const apiKey = import.meta.env.VITE_ACCESS_TOKEN;
  const baseUrl = `https://api.twelvedata.com/${entity}?source=docs${
    symbol ? `&symbol=${symbol}` : ""
  }${interval ? `&interval=${interval}` : ""}${
    start_date ? `&start_date=${start_date}` : ""
  }${end_date ? `&end_date=${end_date}` : ""}${
    sizeList ? `&outputsize=${sizeList}` : ""
  }${exchange ? `&exchange=${exchange}` : ""}`;

  try {
    const response = await fetch(`${baseUrl}`, {
      headers: {
        Authorization: `apikey ${apiKey}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error(`Error in retrieve data by ${entity}`);
  }
};

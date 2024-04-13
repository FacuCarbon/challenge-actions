import { Stock } from "./Types";

export const validateFavorite = (data: Stock, favorites: Stock[]) => {
  const isFavorite = favorites?.some(
    (element) =>
      element?.symbol === data?.symbol && element?.exchange === data?.exchange
  );
  return isFavorite;
};

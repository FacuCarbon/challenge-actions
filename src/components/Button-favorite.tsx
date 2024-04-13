/// HOOKS

import { useActions } from "../providers/ActionsProvider";
import { Stock } from "../utils/Types";
import { validateFavorite } from "../utils/ValidateFavorites";

/// ICONS
import { IoIosStarOutline, IoMdStar } from "react-icons/io";
/// INTERFACES

interface ButtonFavoriteProps {
  stock: Stock;
}

const ButtonFavorite = ({ stock }: ButtonFavoriteProps) => {
  const { favorites, manageFavorites } = useActions();
  const handleFavorites = (data: Stock) => {
    if (!validateFavorite(data, favorites)) {
      manageFavorites("add", data);
    } else {
      manageFavorites("remove", data);
    }
  };
  return (
    <button
      aria-label="Add or remove favorite"
      onClick={(e) => {
        e.stopPropagation();
        handleFavorites(stock!);
      }}
      className="custom__button"
    >
      {validateFavorite(stock!, favorites) ? (
        <IoMdStar className="custom__star active" />
      ) : (
        <IoIosStarOutline className="custom__star" />
      )}
    </button>
  );
};

export default ButtonFavorite;

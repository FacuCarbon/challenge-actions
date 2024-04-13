/// HOOKS
import EmptyData from "../components/Empty-data";
import { useActions } from "../providers/ActionsProvider";

import { useNavigate } from "react-router-dom";
/// COMPONENTS

/// ICONS
import { MdDelete } from "react-icons/md";
/// INTERFACES
import { Stock } from "../utils/Types";
interface ItemFlexProps {
  firstText: string;
  secondText: string;
}
const ItemFlex = ({ firstText, secondText }: ItemFlexProps) => (
  <div className="favorites__containerItems__item__flex">
    <p className="favorites__containerItems__item__text">{firstText}</p>
    <p className="favorites__containerItems__item__text">{secondText}</p>
  </div>
);

const Favorites = () => {
  const { favorites, manageFavorites } = useActions();
  const navigate = useNavigate();
  console.log("favorites ", favorites);
  return (
    <div className="favorites">
      {favorites?.length > 0 ? (
        <div className="favorites__containerItems customScrollbar">
          {favorites?.map((favorite: Stock, i: number) => (
            <div
              className="favorites__containerItems__item"
              key={i}
              role="button"
              aria-label={`Click to go to the detail of ${favorite?.name}`}
              onClick={() => {
                navigate(`/details/${favorite?.symbol}/${favorite?.exchange}`);
              }}
            >
              <div className="favorites__containerItems__item__containerRemove">
                <button
                  className="favorites__containerItems__item__containerRemove__button"
                  aria-label="Remove favorite"
                  onClick={(e) => {
                    e.stopPropagation();
                    manageFavorites("remove", favorite);
                  }}
                >
                  <MdDelete className="favorites__containerItems__item__containerRemove__icon" />
                </button>
              </div>
              <p className="favorites__containerItems__item__title">
                {favorite?.name}
              </p>
              <ItemFlex
                firstText={favorite?.symbol}
                secondText={favorite?.exchange}
              />
              <ItemFlex
                firstText={favorite?.country!}
                secondText={favorite?.currency}
              />
              <ItemFlex
                firstText={favorite?.mic_code}
                secondText={favorite?.type}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyData
          title="No favorites"
          text="You currently have no favorites added. Add one and come back."
          textButton="Back to home"
          redirectUrl="/"
        />
      )}
    </div>
  );
};

export default Favorites;

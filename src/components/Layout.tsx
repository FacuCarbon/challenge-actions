/// HOOKS
import { ReactNode } from "react";
import { useActions } from "../providers/ActionsProvider";
/// COMPONENTS
import ButtonCustom from "./Button-custom";
/// STYLE
import "../assets/styles/custom.modules.scss";
import "../assets/styles/index.modules.scss";
/// INTERFACES
interface HeaderProps {
  children: ReactNode;
}
const Layout = ({ children }: HeaderProps) => {
  const { favorites } = useActions();
  return (
    <div className="main">
      <div className="main__header">
        <div className="main__header__containerLogo">
          <a href="/">
            <p className="main__header__containerLogo__logo">
              Challenge Actions
            </p>
          </a>
        </div>

        <div className="main__header__containerOptions">
          <ButtonCustom
            text={`Favorites ${
              favorites?.length > 0 ? `(${favorites?.length})` : ""
            }`}
            ariaLabel="view favorites"
            redirectUrl="/favorites"
          />
        </div>
      </div>

      <div className="main__children">{children}</div>
    </div>
  );
};

export default Layout;

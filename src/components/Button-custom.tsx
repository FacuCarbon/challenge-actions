import { useNavigate } from "react-router-dom";
import * as CSS from "csstype";
interface ButtonCustomProps {
  text: string;
  ariaLabel: string;
  action?: () => void;
  redirectUrl?: string;
  stylesButton?: CSS.Properties;
  classButton?: string;
  disable?: boolean;
}
const ButtonCustom = ({
  text,
  ariaLabel,
  action,
  redirectUrl,
  stylesButton,
  classButton,
  disable,
}: ButtonCustomProps) => {
  const navigator = useNavigate();

  const handleAction = () => {
    if (action) {
      action();
    } else {
      navigator(`${redirectUrl}`);
    }
  };
  return (
    <button
      onClick={handleAction}
      aria-label={ariaLabel}
      className={`custom__button ${classButton ?? ""} ${
        disable ? "disabledButton" : ""
      }`}
      style={stylesButton}
      disabled={disable}
    >
      {text}
    </button>
  );
};

export default ButtonCustom;

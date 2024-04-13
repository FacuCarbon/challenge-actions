import ButtonCustom from "./Button-custom";

interface EmptyDataProps {
  title: string;
  text?: string;
  textButton: string;
  redirectUrl: string;
}
const EmptyData = ({
  title,
  redirectUrl,
  text,
  textButton,
}: EmptyDataProps) => {
  return (
    <div className="page404">
      <h1 className="page404__title">{title}</h1>
      {text && (
        <p className="details__containerBody__containerMessages__message">
          {text}
        </p>
      )}
      <ButtonCustom
        text={textButton}
        ariaLabel={textButton}
        redirectUrl={redirectUrl}
      />
    </div>
  );
};

export default EmptyData;

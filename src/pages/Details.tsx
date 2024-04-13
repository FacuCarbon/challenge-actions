/// HOOKS
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { useMs } from "../utils/hooks/useMs";
import { useActions } from "../providers/ActionsProvider";
import { useParams } from "react-router-dom";
import moment from "moment";

/// COMPONENTS
import Graphic from "../components/Graphic";
import ButtonCustom from "../components/Button-custom";

import ButtonFavorite from "../components/Button-favorite";
/// INTERFACES
import {
  Interval,
  RequestExtense,
  ResponseStock,
  ResponseTimeSerie,
  Stock,
} from "../utils/Types";
type Range = "real_time" | "historical";
interface ItemInputProps {
  id: Range;
  typeRange: Range;
  setTypeRange: Dispatch<SetStateAction<Range>>;
  labelText: "Real time" | "Historical";
}
const ItemInput = ({
  labelText,
  id,
  typeRange,
  setTypeRange,
}: ItemInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRange = event?.target?.value as Range;
    setTypeRange(newRange);
  };
  return (
    <div className="details__containerBody__containerOptions__option">
      <input
        type="radio"
        name="type_range"
        id={id}
        className="details__containerBody__containerOptions__option__input"
        value={id}
        checked={typeRange === id}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className="details__containerBody__containerOptions__option__label"
      >
        {labelText}
      </label>
    </div>
  );
};
const Details = () => {
  // Declared hooks
  const { retrieveStocks, retrieveTimeSeries } = useActions();
  const { symbol, exchange } = useParams();
  // Declared states
  const [currentStock, setCurrentStock] = useState<Stock>();
  const [series, setSeries] = useState<ResponseTimeSerie>();
  const [intervalData, setIntervalData] = useState<Interval>("1min");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [typeRange, setTypeRange] = useState<Range>("real_time");
  const [errorRequest, setErrorRequest] = useState<string | null>(null);
  const [counterInterval, setCounterInterval] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(true);
  // Decared functions

  const retrieveSeries = async () => {
    let dataRequest: RequestExtense = {
      symbol: symbol,
      exchange: exchange,
      interval: intervalData,
    };
    if (typeRange === "historical") {
      dataRequest["start_date"] = startDate?.replace("T", " ");
      dataRequest["end_date"] = endDate?.replace("T", " ");
    } else {
      const currentDate = moment();

      dataRequest["start_date"] = currentDate
        ?.startOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
      dataRequest["end_date"] = currentDate
        ?.endOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
    }

    setLoading(true);
    try {
      const response = await retrieveTimeSeries(dataRequest);
      const data = await response?.json();
      if (data?.status === "ok") {
        setSeries(data);
        await useMs(500);
        setLoading(false);
      } else {
        setLoading(false);
        setErrorRequest(
          "We do not currently have the information you require."
        );
      }
    } catch (error) {
      setLoading(false);
      setErrorRequest("An error occurred while searching the data.");
    }
  };

  const retrieveCurrentStock = async () => {
    try {
      const response = await retrieveStocks({
        symbol: symbol,
        exchange: exchange,
      });
      if (response?.status === 200) {
        const data: ResponseStock = await response?.json();
        if (data?.data?.length > 0) {
          setCurrentStock(data?.data[0]);
        }
      }
    } catch (error) {
      console.log("Error in retrieve current stock ", error);
    }
  };

  //

  const handleGenerate = () => {
    if (typeRange === "real_time") {
      const intervalInMilliseconds =
        Number(intervalData?.replace("min", "")) * 60 * 1000;
      setCounterInterval(intervalInMilliseconds);
    } else {
      setCounterInterval(null);
    }
    retrieveSeries();
  };

  // Declared side effects

  useEffect(() => {
    if (symbol && exchange) {
      retrieveCurrentStock();
    }
  }, [symbol, exchange]);

  useEffect(() => {
    if (counterInterval) {
      const intervalId = setInterval(() => {
        retrieveSeries();
      }, counterInterval);

      return () => clearInterval(intervalId);
    }
  }, [counterInterval]);

  useEffect(() => {
    return () => {
      if (counterInterval) {
        clearInterval(counterInterval);
      }
    };
  }, []);

  useEffect(() => {
    if (typeRange === "historical" && !startDate && !endDate) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [typeRange, startDate, endDate]);

  return (
    <div className="details">
      <div className="details__containerHeader">
        <h1 className="details__containerHeader__title">
          {currentStock?.name} - {currentStock?.currency}
        </h1>
        <p className="details__containerHeader__exchange">
          {currentStock?.exchange}
        </p>
      </div>
      <div className="details__containerButtonFav">
        <ButtonFavorite stock={currentStock!} />
      </div>
      <div className="details__containerBody">
        <div className="details__containerBody__containerOptions">
          <ItemInput
            labelText="Real time"
            id="real_time"
            typeRange={typeRange}
            setTypeRange={setTypeRange}
          />
          <div className="details__containerBody__containerOptions__containerHistorical">
            <ItemInput
              labelText="Historical"
              id="historical"
              typeRange={typeRange}
              setTypeRange={setTypeRange}
            />
            <div className="details__containerBody__containerOptions__containerHistorical__containerInputs">
              <input
                type="datetime-local"
                className="details__containerBody__containerOptions__input"
                defaultValue={startDate ?? ""}
                onChange={(e) => setStartDate(`${e.target.value}:00`)}
                disabled={typeRange !== "historical"}
              />
              <input
                type="datetime-local"
                className="details__containerBody__containerOptions__input"
                defaultValue={endDate ?? ""}
                onChange={(e) => setEndDate(`${e.target.value}:00`)}
                disabled={typeRange !== "historical"}
              />
            </div>
          </div>

          <div className="details__containerBody__containerOptions__containerInterval">
            <select
              name="select_interval"
              id="select_interval"
              className="details__containerBody__containerOptions__input"
              onChange={(e) => setIntervalData(e.target.value as Interval)}
            >
              <option value="1min">1 min</option>
              <option value="5min">5 min</option>
              <option value="15min">15 min</option>
            </select>
            <label
              htmlFor="select_interval"
              className="details__containerBody__containerOptions__option__label"
            >
              Interval
            </label>
          </div>
        </div>

        <div className="details__containerBody__containerButtonGraph">
          <ButtonCustom
            text="Generate graph"
            ariaLabel="generate new graph"
            classButton="details__containerBody__containerButtonGraph__button"
            action={() => handleGenerate()}
            disable={disableButton}
          />
        </div>

        {!loading ? (
          <>
            {!errorRequest && series && series?.values?.length > 0 ? (
              <div className="details__containerBody__containerGraphic">
                <Graphic data={series} />
              </div>
            ) : (
              <div className="details__containerBody__containerMessages">
                <p className="details__containerBody__containerMessages__message">
                  {errorRequest
                    ? errorRequest
                    : "Fill in the requested fields to generate a graph."}
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="details__containerBody__containerMessages__message">
            Search data...
          </p>
        )}
      </div>
    </div>
  );
};

export default Details;

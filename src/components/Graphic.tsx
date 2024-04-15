import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment"; // Importamos Moment.js
import { ResponseTimeSerie, ValueTimeSerie } from "../utils/Types";

interface GraphicProps {
  data: ResponseTimeSerie;
}

const Graphic = ({ data }: GraphicProps) => {
  const seriesDataSorted = data?.values
    ?.sort((a: ValueTimeSerie, b: ValueTimeSerie) => {
      return moment(a.datetime).valueOf() - moment(b.datetime).valueOf(); // Utilizamos Moment.js para obtener el valor de la fecha y hora en milisegundos
    })
    .map((item: ValueTimeSerie) => ({
      x: moment(item.datetime).valueOf(), // Convertimos la fecha y hora a milisegundos utilizando Moment.js
      y: parseFloat(item.close),
    }));

  const options: Highcharts.Options = {
    chart: {
      type: "line",
      zooming: {
        type: "x",
        resetButton: {
          theme: {
            fill: "#00bcd4",
            style: {
              color: "#ffff",
              border: "none",
            },
          },
        },
      },
    },
    title: {
      text: data?.meta?.symbol,
    },
    xAxis: {
      type: "datetime",

      labels: {
        formatter: function () {
          return moment(this.value).format("HH:mm");
        },
      },
    },
    yAxis: {
      title: {
        text: "Quote",
      },
    },
    tooltip: {
      formatter: function () {
        return `<b>${moment(this.x).format(
          "DD-MM-YY HH:mm"
        )}</b><br/>$${this?.y?.toFixed(2)}`;
      },
    },

    series: [
      {
        name: "Interval",
        data: seriesDataSorted,
        type: "line",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Graphic;

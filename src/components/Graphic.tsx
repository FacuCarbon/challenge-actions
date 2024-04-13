import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ResponseTimeSerie, ValueTimeSerie } from "../utils/Types";

interface GraphicProps {
  data: ResponseTimeSerie;
}

const Graphic = ({ data }: GraphicProps) => {
  const seriesDataSorted = data?.values
    ?.sort((a: ValueTimeSerie, b: ValueTimeSerie) => {
      return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
    })
    .map((item: ValueTimeSerie) => ({
      x: new Date(item.datetime).getTime(),
      y: parseFloat(item.close),
    }));

  const options: Highcharts.Options = {
    chart: {
      type: "line",
    },
    title: {
      text: data?.meta?.symbol,
    },
    xAxis: {
      type: "datetime",
    },

    yAxis: {
      title: {
        text: "Cotización",
      },
    },
    tooltip: {
      formatter: function () {
        return `<b>${Highcharts.dateFormat(
          "%d-%m-%y %H:%M",
          this.x as number
        )}</b><br/>$${this?.y?.toFixed(2)}`;
      },
    },
    series: [
      {
        name: "Intervalo",
        data: seriesDataSorted,
        type: "line",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Graphic;

import { useLayoutEffect, useRef } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

interface Props {
    timeRange: [Date, Date]
};

const MessagesGraph = (props: Props) => {
    const chartDiv = useRef<HTMLDivElement>(null);
    const chart = useRef<am4charts.XYChart | null>(null);

    useLayoutEffect(() => {
        let x = am4core.create(chartDiv.current!, am4charts.XYChart);

        x.zoomOutButton.disabled = true;

        let dateAxis = x.xAxes.push(new am4charts.DateAxis());
        x.yAxes.push(new am4charts.ValueAxis());

        // preview series
        var series = x.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        
        // @ts-ignore
        window.onzoom = (start: Date, end: Date) => {
            dateAxis.zoomToDates(start, end, true, true);
        }

        chart.current = x;
        return x.dispose;
    }, []);

    useLayoutEffect(() => {
        let x = chart.current!;
        let data = [];
        let visits = 10000;
        for (let i = 1; i < 366; i++) {
            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }
        x.data = data;
    }, []);

    return <div ref={chartDiv} style={{ width: "100%", height: "500px" }}></div>;
};

export default MessagesGraph;

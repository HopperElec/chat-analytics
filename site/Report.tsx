import "./assets/report.less";
import ReactDOM from 'react-dom';

import { Compressed, decompress } from "compress-json";

import ReportPage from "./components/ReportPage";
import { initDataProvider } from "./DataProvider";

declare global {
    interface Window {
        __REPORT_DATA__: Compressed | undefined
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    if (window.__REPORT_DATA__ === undefined) {
        window.__REPORT_DATA__ = await require(/* webpackChunkName: "sample" */ "./report_sample_data.json");
    }

    if(window.__REPORT_DATA__ !== undefined) {
        const REPORT_DATA = decompress(window.__REPORT_DATA__);
        initDataProvider(REPORT_DATA);
        ReactDOM.render(
            <ReportPage/>,
            document.getElementById("app")
        );
    } else {
        alert("Missing report data");
        window.location.href = '/';
    }
});
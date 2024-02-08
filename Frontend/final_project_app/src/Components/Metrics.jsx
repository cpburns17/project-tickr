import React, {useState} from "react"
import {Chart as ChartJS, defaults} from "chart.js/auto"
import {Line} from "react-chartjs-2"
import { useOutletContext, useNavigate } from "react-router-dom"

import Button from 'react-bootstrap/Button';


defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 90;
defaults.plugins.title.color = "black"

function Metrics () {
    const {graph, stock} = useOutletContext();

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); 
    };


return (

<div style={{ width: "1200px", height: "600px" }}>
    <h1 className="metrics-title">Simple Moving Average (SMA)</h1>
    <h2 className="metrics-stock-name"> {stock?.name}</h2>
    <br></br>
    <Line
        data={{
            labels: graph?.dates,
            datasets: [
                {
                    label: "Stock Price",
                    data: graph?.values,
                    backgroundColor: 'rgb(97, 180, 215)',
                    borderColor: 'rgb(97, 180, 215)'
                },
            ],
        }}
        options= {{
            scales: {
                x: {
                    reverse: true
                },
            },
            plugins: {
                title: {
                    text: "Simple Moving Average (SMA)"
                },
            },
        }}
    />
    <br></br>
    {/* <Button onClick={handleGoBack}>Back</Button> */}

</div>

);

}

export default Metrics
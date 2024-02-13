// import React, {useState} from "react"
// import {Chart as ChartJS, defaults} from "chart.js/auto"
// import {Line} from "react-chartjs-2"
// import { useOutletContext, useNavigate } from "react-router-dom"

// import Button from 'react-bootstrap/Button';


// defaults.maintainAspectRatio = false;
// defaults.responsive = true;
// defaults.plugins.title.align = "start";
// defaults.plugins.title.font.size = 50;
// defaults.plugins.title.color = "white"

// function Metrics2 () {
//     const {graph2, stock} = useOutletContext();

//     const navigate = useNavigate();

//     const handleGoBack = () => {
//         navigate(-1); 
//     };


// return (

// <div style={{ width: "600px", height: "300px" }}>
//     <h1 className="metrics-title">30 Day</h1>
//     <Line
//         data={{
//             labels: graph2?.dates,
//             datasets: [
//                 {
//                     label: "Stock Price",
//                     data:  graph2?.values,
//                     backgroundColor: 'rgb(250, 250, 250)',
//                     borderColor: 'rgb(250, 250, 250)'
//                 },
//             ],
//         }}
//         options= {{
//             scales: {
//                 x: {
//                     reverse: true
//                 },
//             },
//             plugins: {
//                 title: {
//                     text: "Simple Moving Average (SMA)"
//                 },
//             },
//         }}
//     />

// </div>

// );

// }

// export default Metrics2
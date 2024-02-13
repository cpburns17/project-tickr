import React, {useState} from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

import  background from '../assets/slide4.jpg'

function Slides () {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    };

    function handleHome () {
        navigate('/')
    }

    function handleClick () {
        navigate('/')
    }


    const carouselArrowStyle = {
        fontSize: '3rem',  // Adjust the size of the arrows
        color: 'blue'       // Change the color of the arrows
    };


return (
<div> 
<Carousel activeIndex={index} interval={null} onSelect={handleSelect} className="slides-container" prevIcon={<span style={carouselArrowStyle}>&#9664;</span>} nextIcon={<span style={carouselArrowStyle}>&#9654;</span>}>

    <Carousel.Item className="slide1-container">
        <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

    <Carousel.Caption className="slide1">
        <h1 style={{fontWeight: "bold"}}>📈 Getting Started with Stocks: A Quick Overview</h1>
        <br></br>
        <h2> Congratulations on taking the first step towards financial empowerment! Whether you're a seasoned investor or a complete beginner, our user-friendly app is designed to demystify the stock market for you.
        </h2>
        <br></br>
        <h2> How to Play ➡️</h2>
    </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item className="slide2-container">
        <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

    <Carousel.Caption className="slide2">
        <h1 style={{fontWeight: "bold"}}>💸 Buying Stocks:</h1>
        <br></br>
        <h2 style={{fontWeight: "bold"}}>Research the company. </h2>
        <p>→  Will this stock increase in value? Why?</p>
        <p>→  What risk is associated with this stock?</p>
        <p>→  What does its trade history tell you? </p>
        <br></br>
        <h2 style={{fontWeight: "bold"}}>Place a buy order.</h2>
        <p>→  Select the # of shares you’d like to purchase.</p>
        {/* <img src={img2} style={{height: '50vh', width:'80vh'}}/>
        <br></br> */}
    </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item className="slide3-container">
        <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

    <Carousel.Caption className="slide3">
        <h1 style={{fontWeight: "bold"}}>💰 Selling Stocks:</h1>
        <br></br>
        <h2 style={{fontWeight: "bold"}}>Decide to sell when the stock reaches your profit target or if your investment goals change.</h2>
        <p>→  It’s always important to have a number in mind when it comes to selling.</p>
        <p>→ If the stock begins to dip, how low are you willing to let it drop? If its value is going up, how much longer will it rise?</p>
        <p>→ If its value is going up, how much longer will it rise?</p>
        <br></br>
        <h2 style={{fontWeight: "bold"}}>Place a sell order.</h2>
        <p>→  Select the # of shares you’d like to sell. </p>
    </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item className="slide4-container">
        <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

    <Carousel.Caption className="slide4">
        <h1 style={{fontWeight: "bold"}}>💼 Managing Your Portfolio:</h1>
        <br></br>
        <h2 style={{fontWeight: "bold"}}>Monitor your investments regularly to stay informed.</h2>
        <p>→  Pay attention to the news. Is the company projecting any changes internally? New product or services releasing? </p>
        <p>→ What kind of movement are you seeing within the industry? </p>
        <p>→ Stock performance benchmarking is a way for investors to understand the potential/current returns of a portfolio, the risks involved with each investment, and how best to allocate funds for the best balance of risk and return (S&P 500 index is a great benchmarking resource). </p>
        <br></br>
        <h2 style={{fontWeight: "bold"}}>Check your portfolio regularly.</h2>
        <p>→   See your balance, various investments, and transaction history.  </p>
    </Carousel.Caption>
    </Carousel.Item>


    <Carousel.Item className="slide5-container">
        <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

    <Carousel.Caption className="slide5">
        <h1 style={{fontWeight: "bold"}}> 📊 Best Practices for Evaluating Stocks:</h1>
        <br></br>
        <h2 style={{fontWeight: "bold"}}>Monitor your investments regularly to stay informed.</h2>
        <p> <strong>*Research:</strong> Understand the company's business model, financial health, and future prospects.</p>
        <p> <strong>*Diversification: </strong> Spread your investments across different industries to reduce risk (see Terminology Cheat Sheet).</p>
        <p> <strong>*Long-Term Vision: </strong> Consider a buy-and-hold strategy for potential long-term gains.</p>
        <p> <strong>*Risk Management: </strong> Set realistic goals and use tools like stop-loss orders to mitigate risk.</p>
        <br></br>
    </Carousel.Caption>
    </Carousel.Item>


    <Carousel.Item className="slide6-container">
        <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

    <Carousel.Caption className="slide6">
        <h1 style={{fontWeight: "bold"}}>📚 Basic Terminology:</h1>
        <br></br>
        <p> <strong>Ticker: </strong> Also known as a stock symbol, is a unique series of letters (and sometimes numbers) assigned to a particular publicly traded company's stock. </p>
        <p> <strong>Portfolio: </strong>Collection of investments owned by an individual or entity.</p>
        <p> <strong>Equity: </strong> The value of an investor's stake in a company, represented by the value of shares an investor owns. </p>
        <p> <strong>Capital Gains: </strong> Profits from selling investments for a higher price than bought, subject to capital gains tax.</p>
        <p> <strong>Dividend: </strong> A portion of a company's profit paid to individual shareholders (typically on a quarterly or annual basis).</p>
        {/* <p> <strong>Dividend Yield: </strong> Dividend yield is the annual dividend payment divided by the stock price, expressed as a percentage. It measures the return on investment from dividends. </p> */}
        <p> <strong>Market Capitalization </strong>(Market Cap): Total value of a company's outstanding shares.</p>
        <p> <strong>Bull Market: </strong> Period of rising stock prices.</p>
        <p> <strong>Bear Market: </strong>Period of falling stock prices. </p>
        <br></br>
    </Carousel.Caption>
    </Carousel.Item>


    <Carousel.Item className="slide7-container">
        <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

    <Carousel.Caption className="slide7">
        <h1 style={{fontWeight: "bold"}}>📈 Stock Performance Metrics:</h1>
        <br></br>
        <p> <strong>Open:</strong> The price of a stock at the beginning of a trading session (day). </p>
        <p> <strong>High: </strong>The highest price a stock reached during a specific period.</p>
        <p> <strong>Low: </strong> The lowest price a stock reached during a specific period. </p>
        <p> <strong>Previous Close: </strong> The stock's closing price from the last trading session (day).</p>
        <p> <strong>Price-per-share (PPS): </strong> PPS is the cost of one share of a particular stock or security. It represents the market value of that share at a specific point in time.</p>
        <p> <strong>Earnings Per Share (EPS): </strong> EPS measures a company's profitability by dividing its net income by the number of outstanding shares. It reflects the amount of profit allocated to each share of common stock. Higher EPS generally indicates better profitability.</p>
        <br></br>
    </Carousel.Caption>
    </Carousel.Item>



    <Carousel.Item className="last-slide-container">
        <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

    <Carousel.Caption className="last-slide">
        <h1 style={{fontWeight: "bold"}}>🚀 Ready to Dive In?</h1>
        <br></br>

        <p>Explore the fascinating world of stock trading with Tickr! Whether you're looking to grow your wealth, or simply want to get a feel for buying & selling stocks, we're here to guide you every step of the way.</p>
        <br></br>
        <h2 style={{fontWeight: "bold"}}>Happy Trading! 🎉</h2>
        <button onClick={handleHome} className="slides-button"> START </button>
    </Carousel.Caption>
    
    </Carousel.Item>



</Carousel>
<br></br>
<Button onClick={handleClick}> Skip </Button>

</div>

);

};

export default Slides
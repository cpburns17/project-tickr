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
            <h2> How to Play:</h2>
        </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="slide2-container">
            <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

        <Carousel.Caption className="slide2">
            <h1 style={{fontWeight: "bold"}}>💸 Buying Stocks:</h1>
            <br></br>
            <h2 style={{fontWeight: "bold"}}>Research the company. </h2>
            <br></br>
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
            <br></br>
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
            <br></br>
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
            <br></br>
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


        <Carousel.Item className="slide7-container">
            <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

        <Carousel.Caption className="slide7">
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



        <Carousel.Item className="slide10-container">
            <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

        <Carousel.Caption className="slide10">
            <h1 style={{fontWeight: "bold"}}> 📖 Advanced Terminology: </h1>
            <br></br>
            <h3> <strong> Position: </strong></h3>
            <p> In stock trading, an "open position" refers to a situation where an investor has entered into a trade by either buying (going long) or selling (going short) a financial instrument such as a stock, option, or futures contract, and the trade has not yet been closed with an opposing trade. Here's a breakdown:</p>
            <p> <strong>Long Position (Buy):</strong> If an investor buys a stock with the expectation that its price will rise, they are said to have taken a long position. The open position remains until the investor sells the stock to close the position.</p>
            <p> <strong> Short Position (Sell): </strong> If an investor sells a stock with the expectation that its price will fall, they are said to have taken a short position. The open position remains until the investor buys back the stock to close the position.</p>
            <p> *The concept of open positions is essential for tracking and managing active trades. Investors may monitor open positions to assess profits or losses, set stop-loss orders to limit potential losses, or decide when to take profits by closing the position. The open position is considered "closed" when the investor executes an opposing trade (selling after buying or buying after selling) to exit the market and realize the gains or losses associated with the position. </p>
        
        </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item className="slide11-container">
            <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

        <Carousel.Caption className="slide11">
            <h3> <strong> Volume: </strong></h3>
            <br></br>
            <p> <strong>Definition:</strong>  Volume in the stock market refers to the total number of shares traded for a particular security during a specific period, typically a day.</p>
            <p> <strong>Significance:  </strong>High trading volume often indicates increased market interest and liquidity, suggesting a stronger trend. Low volume may indicate less interest or a potential lack of conviction in the current trend.</p>
            <p> <strong>Use in Analysis:  </strong> Traders and analysts use volume to confirm the strength of a price move. For example, a price increase accompanied by high volume is considered more significant than the same increase on low volume. </p>
            <br></br>
            <h3><strong> Price-Earnings Ratio (P/E Ratio):</strong></h3>
            <br></br>
            <p> <strong>Definition: </strong> The price-earnings ratio is a valuation metric calculated by dividing the current market price per share of a stock by its earnings per share (EPS) over the past 12 months.</p>
            <p> <strong>Significance: </strong> The P/E ratio provides insights into how much investors are willing to pay for a company's earnings. It reflects market expectations regarding a company's future growth and profitability.</p>
            <p> <strong>Interpretation:  </strong>A higher P/E ratio may indicate that investors expect strong future growth, while a lower P/E ratio may suggest lower growth expectations. However, it's essential to compare P/E ratios within the same industry or sector for a meaningful analysis.</p>
            <br></br>
            <p>*Understanding volume and the price-earnings ratio can enhance your ability to assess a stock's performance and make more informed investment decisions.</p>
        </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item className="slide12-container">
            <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

        <Carousel.Caption className="slide12">
            <h1 style={{fontWeight: "bold"}}> Top Trades: Change & Change %</h1>
            <br></br>
            <p> <strong>Change:</strong> For a stock or bond quote, change is the difference between the current price and the last trade of the previous day. </p>
            <p> Example: Current Price: $19.30. Previous day: $11.50. Current - Previous = +$7.80 change. </p>
            <p> <strong>Change %: </strong> The difference between current price and last trade of previous day, displayed as a percentage. </p>
            <p> <strong>Why is this important? </strong>  A significant change (if positive) in stock price means the stock is hot! This doesn’t mean it will stay hot, but for day traders this is a good opportunity for quick buys/sells to make a profit. </p>
            <br></br>
        </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item className="slide8-container">
            <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

        <Carousel.Caption className="slide8">
            <h1 style={{fontWeight: "bold"}}> ⚠️ Understanding Risk: </h1>
            <br></br>
            <p> Investing in different industries involves varying levels of risk, and the perception of risk can be influenced by economic conditions, market trends, and other factors. </p>
            <br></br>
            <h3> <strong>High Risk, High Reward, right?</strong></h3>
            <br></br>
            <p>  High-risk investments may offer the chance of higher returns than other investments might produce, but they put your money at higher risk. It's important to note that risk tolerance varies among investors, and diversification across multiple industries can help manage overall portfolio risk. Additionally, thorough research and staying informed about economic conditions and industry trends are crucial for making well-informed investment decisions. </p>
            <br></br>
            <p>Here's a general categorization of industries into low-risk and high-risk: </p>
        
        </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item className="slide9-container">
            <div style={{ height: '80vh', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />

        <Carousel.Caption className="slide9">
            <h2><strong>Low-Risk Industries: </strong></h2>
            <br></br>
            <p> <strong>Utilities: </strong> Companies in the utility sector, such as electric and water utilities, often provide essential services. They tend to have stable cash flows and relatively predictable earnings.</p>
            <p> <strong>Consumer Staples: </strong> Industries producing essential goods like food, beverages, and household items. Demand for these products tends to remain consistent even during economic downturns.</p>
            <p> <strong>Healthcare: </strong> Companies in the healthcare sector, particularly pharmaceuticals and healthcare services, are often considered more stable due to the constant demand for medical services and products.</p>
            <p> <strong>Telecommunications: </strong> Telecommunication companies providing essential communication services may have relatively stable revenue streams.</p>
            <p> <strong>Information Technology (Large Cap): </strong>Established technology companies with strong balance sheets may be considered lower risk. However, smaller, high-growth tech companies can be riskier. </p>
            <p> (scroll down)</p>
        
            <h2><strong>High-Risk Industries: </strong></h2>
            <br></br>
            <p> <strong>Technology (Small Cap): </strong> Smaller, innovative tech companies can be high-risk due to factors like market competition, rapid technological changes, and potential for significant price volatility.</p>
            <p> <strong>Biotechnology: </strong> Companies in the biotech sector often face high research and development costs, regulatory hurdles, and the uncertainty of successfully bringing a product to market.</p>
            <p> <strong>Hospitality and Travel: </strong> Sensitive to economic cycles, events, and travel trends, this sector can experience significant volatility during economic downturns or crises.</p>
            <p> <strong>Financial Services (Specifically, Small Banks or Emerging Markets): </strong>  Smaller financial institutions or those operating in emerging markets may carry higher risk due to factors like economic instability and regulatory changes.</p>
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
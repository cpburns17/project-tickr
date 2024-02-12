import React, {useState} from "react"
import { useOutletContext } from "react-router-dom"
import { NavLink } from "react-router-dom";
import Metrics from './Metrics'
import News from './News'


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';



function StockBack ({flipCard}) {
    const {quote, stock, logo} = useOutletContext()

    const parseHigh = parseFloat(quote?.high);
    const parseLow = parseFloat(quote?.low);
    const parseOpen = parseFloat(quote?.open);
    const parseClose = parseFloat(quote?.previous_close);
    const parsePrice = parseFloat(quote?.price);

    const [openMetrics, setOpenMetrics] = useState(false); // State for Metrics Modal
    const handleOpenMetrics = () => setOpenMetrics(true);
    const handleCloseMetrics = () => setOpenMetrics(false);

    const [openNews, setOpenNews] = useState(false); // State for News Modal
    const handleOpenNews = () => setOpenNews(true);
    const handleCloseNews = () => setOpenNews(false);

    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', // Adjust the width as needed
        maxWidth: '1200px', // Set max width if necessary
        maxHeight: '80%', // Set max height if necessary
        overflowY: 'auto', // Enable vertical scrolling if content overflows
        bgcolor: 'background.paper',
        border: '10px solid #000',
        boxShadow: 24,
        p:'60px 60px',
    };

    const newsStyle = {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', // Adjust the width as needed
        maxWidth: '800px', // Set max width if necessary
        maxHeight: '80%', // Set max height if necessary
        overflowY: 'auto', // Enable vertical scrolling if content overflows,
        bgcolor: 'rgb(0, 0, 0, .9)',
        border: '10px solid #000',
        boxShadow: 24,
        p:'110px 110px',
    };


    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'space-evenly',
    };

return (
<Card className="stock-back" data-bs-theme="dark">
<Card.Img variant="top" src={logo?.logo} />
    <Card.Body> 
        <h2> {stock?.name} </h2>
        {/* <p>Price: ${parsePrice.toFixed(2)}</p> */}
        <ListGroup className="card-back-list" >
        <ListGroup.Item >Open: ${parseOpen.toFixed(2)}</ListGroup.Item>
        <ListGroup.Item>Previous Close: ${parseClose.toFixed(2)}</ListGroup.Item>
        <ListGroup.Item>52 Week High: ${stock?.fiftytwo_high}</ListGroup.Item>
        <ListGroup.Item>52 Week Low: ${stock?.fiftytwo_low}</ListGroup.Item>
        <ListGroup.Item>P/E Ratio: ${stock?.pe_ratio}</ListGroup.Item>
        </ListGroup>
    </Card.Body>
    <Card.Body>
<div style={buttonContainerStyle}>
<Button onClick={handleOpenMetrics}>Graph Data</Button>
<Button onClick={handleOpenNews}>Market News</Button>
</div>

    <Modal
    open={openMetrics}
    onClose={handleCloseMetrics}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Metrics />
        </Box>
    </Modal>



    <Modal
    open={openNews}
    onClose={handleCloseNews}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
        <Box sx={newsStyle}>
            <News />
        </Box>
    </Modal>



            <br></br>
            <br></br>
            <Button onClick={flipCard} className="flip-card-back"> Flip Card </Button>
    </Card.Body>

    

</Card>

);

}

export default StockBack


// <div>
// <h1> Stock Back</h1>
// {/* <p>Price: ${parsePrice.toFixed(2)}</p> */}
// <p>Open: ${parseOpen.toFixed(2)}</p>
// <p>Previous Close: ${parseClose.toFixed(2)}</p>
// <p>52 Week High: ${stock?.fiftytwo_high}</p>
// <p>52 Week Low: ${stock?.fiftytwo_low}</p>
// <p>P/E Ratio: ${stock?.pe_ratio}</p>
// {/* <p>High: ${parseHigh.toFixed(2)}</p>
// <p>Low: ${parseLow.toFixed(2)}</p> */}
// {/* <p>Volume: {quote?.volume}</p> */}

// <div>
//     <NavLink to="/metrics" className='nav-metrics'>
//         See Metrics
//     </NavLink>
// <br></br>
//     <NavLink to="/news" className='nav-news'>
//         Market News
//     </NavLink>
// </div>
// </div>


            {/* <NavLink  to="/metrics" className='nav-metrics'>
                See Metrics
            </NavLink>
            <NavLink to="/news" className='nav-news'>
                Market News
            </NavLink> */}
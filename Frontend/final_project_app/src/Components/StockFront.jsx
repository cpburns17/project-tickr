import React, {useState, useEffect} from "react"
import { NavLink } from "react-router-dom";
import {useOutletContext} from "react-router-dom"
import Invest from './Invest'


// Bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';

// MUI library
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Skeleton from '@mui/material/Skeleton';
// import Button from '@mui/material/Button';





function StockFront ({flipCard}) {
    const { stock, intraday, logo, isLoading} = useOutletContext();
    const closeValue = parseFloat(intraday?.close);

// MODAL for buy
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', 
        maxWidth: '700px', 
        maxHeight: '80%', 
        overflowY: 'auto',
        bgcolor: 'background.paper',
        border: '10px solid #000',
        boxShadow: 24,
        p:'60px 60px',
    };



return (
<>
    <Card className="stock-front" data-bs-theme="dark">
        <Card.Img variant="top" src={logo?.logo} />
        <Card.Body>
            <h2>
                {stock?.name}
            </h2>
            <h3> {stock?.symbol} </h3>
            <h1>
                ${isNaN(closeValue) ? "N/A" : closeValue.toFixed(2)} USD
            </h1>
            <p> Exchange: {stock?.exchange}</p>
            <p> Industry: {stock?.industry}</p>
            <Card.Text> Description: {stock?.description}</Card.Text>
        </Card.Body>
        <Card.Body> 
        <div>
            <Button onClick={handleOpen}>Buy Stock</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Invest />
                </Box>
            </Modal>
        </div>
        <br></br>
        <Button onClick={flipCard} className="flip-card-front"> Flip Card </Button>
        </Card.Body>
    </Card>
</>

);

};

export default StockFront

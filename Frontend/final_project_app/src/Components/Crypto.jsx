import React, {useState, useEffect} from "react"
import {useOutletContext} from "react-router-dom"


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'


function Crypto() {
    const {cryptoIntraday, crypto, handleRandomCrypto} = useOutletContext()

    const cryptoName = cryptoIntraday?.currency_name
    const cryptoCode = cryptoIntraday?.currency_code
    const cryptoClose = parseFloat(cryptoIntraday?.close)
    const cryptoOpen = parseFloat(cryptoIntraday?.open)
    const cryptoVolume = parseFloat(cryptoIntraday?.volume)




return (

<div>
        TESTING

    <Card className="crypto-card" data-bs-theme="dark">
        <Card.Body>
            <h1>
                {cryptoName}
            </h1>
            <h2> 
                {cryptoCode} 
            </h2>
            <h3>
                ${isNaN(cryptoClose) ? "N/A" : cryptoClose.toFixed(2)} USD
            </h3>
            <h3>
                ${isNaN(cryptoOpen) ? "N/A" : cryptoOpen.toFixed(2)} USD
            </h3>
            <h3> Volume: {cryptoVolume}</h3>
            <p> Time Zone: UTC</p>
        </Card.Body>
        <Card.Body> 
        <div>
            {/* <Button onClick={handleOpen}>Buy Stock</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Invest />
                </Box>
            </Modal> */}
        </div>
        <br></br>
        </Card.Body>
        <Button onClick={handleRandomCrypto} variant='success'> Random Crypto</Button>
    </Card>

</div>

);

};

export default Crypto
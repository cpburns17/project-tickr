import React, {useState} from "react"
import { useOutletContext, useNavigate } from "react-router-dom"


import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function News () {
    const {news, stock} = useOutletContext()
    const navigate = useNavigate();


    function handleGoBack() {
        navigate(-1);
    }

    const formatPublishedDate = (dateString) => {
        // Assuming dateString is in the format YYYYMMDD
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
    
        return `${month}/${day}/${year}`;
    };

    const marketNews = news?.map((n, index) => (
    <Card style={{width: '30rem'}} className="news-card">
        <Card.Img variant='top' src={n.image} />
        <Card.Body > 
            <Card.Title > {n.title}</Card.Title>
            <Card.Text> "{n.summary}"</Card.Text>
        </Card.Body>
        <ListGroup  key = {index}>
            <ListGroup.Item>Authors: {n.authors}</ListGroup.Item>
            <ListGroup.Item>Published: {formatPublishedDate(n.published)}</ListGroup.Item>
            <ListGroup.Item>{n.source_domain}</ListGroup.Item>
            {/* <p>{n.url}</p> */}
        </ListGroup>
        <Card.Body>
            <Card.Link style= {{display: 'flex', justifyContent:'center', alignItems:'center'}} href={n.url}> Read More </Card.Link>
        </Card.Body>

        
    </Card>
    ))

    console.log(marketNews)

return (
    <div className='news-page'>

        <h1 className='news-title'>Market News: {stock?.name} </h1>

        <br></br>
        {marketNews}
    </div>

);

}

export default News

//(n.published.slice(0, 8))
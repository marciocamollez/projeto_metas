import React, {useState} from 'react';

import Menu from '../components/Menu';

import { Jumbotron, Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';


function Home({data}) {
    return (
        <div>
            <Menu />
            <Jumbotron fluid className="list">
                <style>
                    {`.list{
                        background-color: #171941;
                        padding-top: 30px;
                        padding-bottom: 150px;
                        margin-bottom: 0rem !important;
                    }
                    .title-top{
                        color: #bf38ac;
                    }
                    .list-meta{
                        border-color: #4a0242;
                        background-color: #0d345d;
                        color: #FFF;
                    }
                    `}
                </style>
                <Container>
                <h1 className="display-4 text-center title-top">Painel de Metas</h1>

                    <ListGroup>
                    {data.metas.map(meta => (
                        <div key={meta._id}>
                            <ListGroupItem className="list-meta">
                                <ListGroupItemHeading>{meta.name}</ListGroupItemHeading>
                                <ListGroupItemText>{meta.description}</ListGroupItemText>
                                <ListGroupItemText>{meta.status}</ListGroupItemText>
                            </ListGroupItem>
                        </div>
                    ))}
                    </ListGroup>
                </Container>
            </Jumbotron>
        </div>
    )
}


export async function getServerSideProps() {
    const response = await fetch(`http://localhost:8080/metas`)
    const data = await response.json();
    //console.log(data);
    return { props: {data} };
}


export default Home;
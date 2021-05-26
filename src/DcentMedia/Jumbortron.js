import React, { Component } from 'react'
import {Jumbotron,Button,Row,Col} from 'react-bootstrap'
import backg from "./backg.jpg";
export default class Jumbortron extends Component {
    render() {
        return (
            <div >
                      <Jumbotron
                      style={{
                            backgroundImage: `url(${backg})`,
                            backgroundSize: "cover",
                            // color: "#f5f5f5"
                        }}
                        >
                      <Row>
                          <Col md={8}>
                            <h1>Hello, world!</h1>
                                <p>
                                Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or cheat the system. A blockchain is essentially a digital ledger of transactions that is duplicated and distributed across the entire network of computer systems on the blockchain.
                                </p>
                                <p> 
                                <div className="container">
                                    <div className="row"> 
                                        <div className="col col-md-2">
                                           <a href = 'https://en.wikipedia.org/wiki/Blockchain'><Button variant="outline-dark">Know more</Button></a><br /><br />
                                        </div>
                                        <div className="col col-md-2">
                                           <a href = 'http://localhost:3000/image'><Button variant="outline-dark">Decentragram</Button></a>
                                        </div>
                                        <div className="col col-md-2">
                                           <a href = 'http://localhost:3000/video'><Button variant="outline-dark">DcentVideo</Button></a>
                                        </div>
                                        </div>
                                    </div>         
                                </p>
                          </Col>

                          <Col md={4}>
                                <h2>Share File</h2>
                                <form onSubmit={(event) => {
                                    event.preventDefault()
                                    const description = this.fileDescription.value
                                    this.props.uploadFile(description)
                                }} >
                                <input type="file" onChange={this.props.captureFile}/><br /><br />
                                    <div className="form-group">
                                        
                                        <input
                                            id="fileDescription"
                                            type="text"
                                            ref={(input) => { this.fileDescription = input }}
                                            className="form-control"
                                            placeholder="file description..."
                                            required />
                                    </div>

                                    
                                    <Button type="submit" variant="outline-dark">Upload</Button>
                                </form>
                          
                          </Col>
                      </Row>

                    </Jumbotron>
            </div>
        )
    }
}

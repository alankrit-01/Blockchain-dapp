import React, { Component } from 'react';
import backg from "./backg.jpg";
import {Jumbotron,Button,Row,Col} from 'react-bootstrap';
class Main extends Component {

  render() {
    return (<>
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
            <a href = 'http://localhost:3000/'><Button variant="outline-dark">Dropbox</Button></a>
            </div>
            <div className="col col-md-2">
            <a href = 'http://localhost:3000/image'><Button variant="outline-dark">Decentragram</Button></a>
            </div>
            </div>
          </div>
           
           

        </p>

        </Col>
        <Col md={4}>
        
        <h2>Share Video</h2>

            <form onSubmit={(event) => {
              event.preventDefault()
              const title = this.videoTitle.value
              this.props.uploadVideo(title)
            }} >
              
              <input type='file' accept=".mp4, .mkv .ogg .wmv" onChange={this.props.captureFile}  />
                <div className="form-group mr-sm-2">
                <br></br>
                  <input
                    id="videoTitle"
                    type="text"
                    ref={(input) => { this.videoTitle = input }}
                    className="form-control"
                    placeholder="Video Title..."
                    required />
                </div>

                <Button type="submit" variant="outline-dark">Upload</Button>
            </form>

        </Col>
      </Row>

      

    </Jumbotron>
      <div className="container-fluid text-monospace">
          <br></br>
          &nbsp;
          <br></br>
          <div className="row">
            <div className="col-md-10">
            <h3><b><i>{this.props.currentTitle}</i></b></h3>
              <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px'}}>
                <video
                  src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                  controls
                >
                </video>
              </div>
            
          </div>
          <div className="col-md-2 overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '175px' }}>

            { this.props.videos.map((video, key) => {
              return(
                <div className="card mb-4 text-center  mx-auto" style={{ width: '190px'}} key={key} >
                  <div className="card-title bg-dark">
                    <small className="text-white"><b>{video.title}</b></small>
                  </div>
                  <div>
                    <p onClick={() => this.props.changeVideo(video.hash, video.title)}>
                      <video
                        src={`https://ipfs.infura.io/ipfs/${video.hash}`}
                        style={{ width: '150px' }}
                      />
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default Main;
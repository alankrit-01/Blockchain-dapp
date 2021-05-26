import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Decentragram from '../abis/Decentragram.json'
import Navbar from './Navbar'
import Main from './Main'


//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


class App extends Component {
  async componentDidMount(){
    await this.loadweb3()
    await this.loadBlockChainData()
  }
  async loadweb3(){
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try { 
         window.ethereum.enable().then(function() {
             // User has allowed account access to DApp...
         });
      } catch(e) {
         // User has denied account access to DApp...
      }
   }
   // Legacy DApp Browsers
   else if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
   }
   // Non-DApp Browsers
   else {
       alert('You have to install MetaMask !');
   }
  }
  async loadBlockChainData(){
    const web3 = new Web3(window.web3.currentProvider);
    // const web3=window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account:accounts[0]})
    const jsonInterface=Decentragram.abi
    const networkID=await web3.eth.net.getId()
    const  newtorkData=Decentragram.networks[networkID]
    if (newtorkData){
      const address=newtorkData.address

      const decentragram= new web3.eth.Contract(jsonInterface,address)
      this.setState({decentragram:decentragram})
      // console.log(this.state.decentragram)

      const count = await decentragram.methods.imageCount().call()
      this.setState({imageCount:count})
      
      for (var i = 1; i <= count; i++) {
        const image = await decentragram.methods.images(i).call()
        this.setState({
          images: [...this.state.images, image]
        })
      }
      // Sort images. Show highest tipped images first
      this.setState({
        images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      })
      
      this.setState({loading:false})


    }else{
      window.alert('Decentragram contract not deployed to the connected network')
    }

  }

  constructor(props) {
    super(props)
    this.state = {
      loading:true,
      account: '',
      decentragram:null,
      images:[],
      imageCount:null,
      buffer:null,
    }
    this.uploadImage = this.uploadImage.bind(this)
    // this.tipImageOwner = this.tipImageOwner.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }
  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }
  uploadImage = description => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.decentragram.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }
  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.decentragram.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  render() {
  
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? 
          <div className='text-center'>
            <div className="spinner-grow mt-5" role="status"><span className="sr-only">Loading...</span></div>
          </div>

          : <Main
            images={this.state.images}
            captureFile={this.captureFile}
            uploadImage={this.uploadImage}
            tipImageOwner={this.tipImageOwner}
            />
          }

      </div>
    );
  }
}

export default App;
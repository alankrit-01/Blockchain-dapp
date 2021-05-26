pragma solidity ^0.5.0;
// SPDX-License-Identifier: <SPDX-License>
// SPDX-License-Identifier: GPL-3.0
// pragma solidity >=0.7.0 <0.9.0;



contract Decentragram {
  string public name='Decentragram';
  string public symbol='DCent';
  uint public imageCount =0;
  mapping(uint=>Image) public images;
  

  struct Image{

     uint id;
     string hash;
     string description;
     uint tipAmount;
     address payable author;
  }
  event imageUploaded(uint id,string hash,string description,uint tipAmount,address payable author);
  event imageTipped(uint id,string hash,string description,uint tipAmount,address payable author);
  function uploadImage(string memory _hash, string memory _description) public{
    require(bytes(_hash).length>0);
    require(bytes(_description).length>0); 
    require(msg.sender != address(0x0)); 
    imageCount ++;
    images[imageCount]=Image(imageCount,_hash,_description,0,msg.sender);
    emit imageUploaded(imageCount, _hash, _description, 0, msg.sender);
  }
  function tipImageOwner(uint _id) public payable{

    require(_id>0 && _id<=imageCount );
    
    Image memory _image=images[_id];
    address payable _author =_image.author;
    address(_author).transfer(msg.value);
    _image.tipAmount += msg.value;
    images[_id]=_image;
    emit imageTipped(_id, _image.hash, _image.description, _image.tipAmount, _author);

  }
  
}

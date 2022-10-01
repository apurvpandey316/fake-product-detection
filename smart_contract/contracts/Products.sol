// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Products {
    struct Product {
        string name;
        string id;
        string manufactuerId;
        uint256 timeStamp;
        uint256 price;
        string company;
        address from;
    }
    struct Manufactuer {
        string id;
        string name;
        uint256 contact;
    }
    Product[] products;
    string[] private manufactuers;
    uint256 totalManufactuers;
    uint256 totalProducts;
    //here uint is the id of the manufactuer in the first and id of the product in the second
    mapping(string => Product[])  particularProducts;
    mapping(string => Manufactuer)  manufactuerDetails;

    event ProductAdded(string name, string id, string manufactuer, uint price, string company);
    constructor(){
        totalManufactuers = 0;
        totalProducts = 0;
    }
    function addManufactuers(string memory _id, string memory _name, uint256 _contactNo) public payable {
        manufactuers.push(_id);
        manufactuerDetails[_id] = Manufactuer(_id, _name, _contactNo);
    }
    function checkIfManufactuerIsValid(string memory id) public view returns(bool){
        for(uint i=0;i<manufactuers.length;i++){
            if((keccak256(abi.encodePacked((manufactuers[i]))) == keccak256(abi.encodePacked((id))))) return true;
        }
        return false;
    }
    function additionToBlockChain(string memory _name, string memory  _id, string memory _manufactuerId,uint256 _price, string memory _company,address _from) public {
        Product memory product = Product(_name, _id, _manufactuerId,block.timestamp,_price, _company,_from) ;
        products.push(product);
        particularProducts[_manufactuerId].push(product);
        emit ProductAdded(_name, _id, _manufactuerId, _price, _company);
    } 
    function checkIfProductIsValid (string memory _id) public view returns(bool) {
        for(uint i=0;i<products.length;i++){
            // if(products[i].id == _id)   return true;
            if((keccak256(abi.encodePacked((products[i].id))) == keccak256(abi.encodePacked((_id))))) return true;
        }
        return false;
    }
    function productCount () public view returns(uint){
        return products.length;
    }
    function manufactuerCount () public view returns(uint){
        return manufactuers.length;
    }
    function getMyProducts (string memory _id) public view returns(Product[] memory){
        return particularProducts[_id]; 
    }
    function getMyProductsCount(string memory _id) public view returns(uint){
        return particularProducts[_id].length;
    }
    function getManufactuerDetails(string memory _id) public view returns(Manufactuer memory){
        return manufactuerDetails[_id];
    }
 }
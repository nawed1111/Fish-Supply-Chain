// SPDX-License-Identifier: TFT-1.0.0

pragma solidity ^0.5.0;

import "../TunaHelper/FishermanRole.sol";
import "../TunaHelper/RegulatorRole.sol";
import "../TunaHelper/RestaurantRole.sol";

contract Tracking is FishermanRole, RegulatorRole, RestaurantRole{
    // define owner
    address supplyChainOwner;
    // Universal Produc Code
    uint upc;
    // Stock Keeping Unit
    uint sku;

    enum State{
        Caught,
        Recorded,
        Audited,
        Bought
    }

    State constant defaultState = State.Caught;

    struct TunaFish{
        uint upc;
        address payable ownerID; // address of the current owner as the product moves through different statges
        address originFishermanID;
        string originCoastLocation;
        string tunaNotes;
        uint tunaPrice;
        State tunaState;
        address regulatorID;
        string auditStatus;
        address payable restaurantID;
    }

    // a public mapping that maps the UPC to a Tuna Fish
    mapping(uint => TunaFish) tunaFish;
    // a public mapping that maps the UPC to an array of TxHash
    // that tracks its journey through the supply chain
    mapping(uint => string[]) tunaHistory;

    event Caught(uint upc);
    event Recorded(uint upc);
    event Audited(uint upc);
    event Bought(uint upc);

    // Verifies the caller
    modifier verifyCaller(address _address){
        require(msg.sender == _address, 'Caller verification failed!');
        _;
    }

    // Verifies the paid amount is sufficient to cover the price
    modifier paidEnough(uint _price){
        require(msg.value >= _price, 'Insufficient ammount for the quoted price!');
        _;
    }

    // Checks the price and refunds the remaining
    modifier checkValue(uint _upc){
        uint _price = tunaFish[_upc].tunaPrice;
        uint amountToReturn = msg.value - _price;
        tunaFish[_upc].restaurantID.transfer(amountToReturn);
        _;
    }

    // Checks if a tuna state of a upc is Caught
    modifier caught(uint _upc){
        require(tunaFish[_upc].tunaState == State.Caught, 'Tuna state is still not Caught');
        _;
    }

    // Checks id a tuna state is Recorded
    modifier recorded(uint _upc){
        require(tunaFish[_upc].tunaState == State.Recorded, 'Tuna state is still not Recorded');
        _;
    }

    // Checks id a tuna state is audited
    modifier audited(uint _upc){
        require(tunaFish[_upc].tunaState == State.Audited, 'Tuna state is still not Audited');
        _;
    }

    // Checks id a tuna state is bought
    modifier bought(uint _upc){
        require(tunaFish[_upc].tunaState == State.Bought, 'Tuna state is still not Bought');
        _;
    }

    constructor() public payable{
        supplyChainOwner = msg.sender;
        upc = 1;
    }

    // allows fisherman to mark an item 'Caught'
    function catchTuna(uint _upc, address _originFishermanID, string memory _originCoastLocation) public onlyFisherman{
        tunaFish[_upc] = TunaFish({
            upc : _upc,
            ownerID: msg.sender,
            originFishermanID: _originFishermanID,
            originCoastLocation: _originCoastLocation,
            tunaNotes: "",
            tunaPrice: 0,
            tunaState: defaultState,
            regulatorID: address(0),
            auditStatus: "",
            restaurantID: address(0)
        });

        upc = upc + 1;
        emit Caught(_upc);
    }

    // allows a fisherman to mark an item 'Recorded'
    function recordTuna(uint _upc, uint _price, string memory _tunaNotes) public
    caught(_upc)
    onlyFisherman
    verifyCaller(tunaFish[_upc].ownerID)
    {
        tunaFish[_upc].tunaNotes = _tunaNotes;
        tunaFish[_upc].tunaPrice = _price;
        tunaFish[_upc].tunaState = State.Recorded;

        emit Recorded(_upc);
    }

    //allows to mark an item as 'Audited'
    function auditTuna(uint _upc, string memory _auditStatus) public
    recorded(_upc)
    onlyRegulator()
    {
        tunaFish[_upc].regulatorID = msg.sender;
        tunaFish[_upc].auditStatus = _auditStatus;
        tunaFish[_upc].tunaState = State.Audited;

        emit Audited(_upc);
    }

    //allows a restaurant to view the tuna details
    function queryTuna(uint _upc) public view
    returns(
        address ownerID,
        string memory originCoastLocation,
        string memory tunaNotes,
        uint tunaPrice,
        State tunaState,
        address regulatorID,
        string memory auditStatus
        )
    {
        TunaFish memory _tunaFish = tunaFish[_upc];
        return(
            _tunaFish.ownerID,
            _tunaFish.originCoastLocation,
            _tunaFish.tunaNotes,
            _tunaFish.tunaPrice,
            _tunaFish.tunaState,
            _tunaFish.regulatorID,
            _tunaFish.auditStatus
        );
    }

    //allows restaurant to mark the item 'Bought'
    function buyTuna(uint _upc, uint _price) public payable
    audited(_upc)
    onlyRestaurants()
    paidEnough(_price)
    checkValue(_upc)
    {
        tunaFish[_upc].ownerID.transfer(_price);

        tunaFish[_upc].restaurantID = msg.sender;
        tunaFish[_upc].ownerID = msg.sender;
        tunaFish[_upc].tunaState = State.Bought;

        emit Bought(_upc);
    }
}

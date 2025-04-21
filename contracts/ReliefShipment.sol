//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract ReliefShipment {

    struct Shipment {
        bytes32 shipmentId;
        uint256 totalSent;
        uint256 totalReceived;
        uint256 totalDistributed;
        bool isCompleted;
        uint256 timestamp;
    }

    mapping(bytes32 => Shipment) public shipments;
    uint256 public shipmentCount;

    event ShipmentRecorded(bytes32 shipmentId, uint256 totalSent);
    event ShipmentReceived(bytes32 shipmentId, uint256 totalReceived);
    event DistributionUpdated(bytes32 shipmentId, uint256 totalDistributed);
    event DiscrepancyDetected(bytes32 shipmentId, string message);

    // Store initial shipment details (DSWD)
    function recordShipment(string memory _shipmentId, uint256  _totalSent) external {
        bytes32 shipmentKey = keccak256(abi.encodePacked(_shipmentId));
        require(shipments[shipmentKey].shipmentId == "", "Shipment already exists");

        shipments[shipmentKey] = Shipment(shipmentKey, _totalSent, 0, 0, false, block.timestamp);
        shipmentCount++;

        emit ShipmentRecorded(shipmentKey, _totalSent);
    }

    // Confirm Receipt (BDRRM)
    function recordReceived(string memory _shipmentId, uint256 _totalReceived) external {
        bytes32 shipmentKey = keccak256(abi.encodePacked(_shipmentId));
        require(shipments[shipmentKey].shipmentId != "", "Shipment not found");

        shipments[shipmentKey].totalReceived = _totalReceived;

        emit ShipmentReceived(shipmentKey, _totalReceived);
    }

    // Distributions
     function recordDistribution(string memory _shipmentId, uint256 _totalDistributed) external {
        bytes32 shipmentKey = keccak256(abi.encodePacked(_shipmentId));
        require(shipments[shipmentKey].shipmentId != "", "Shipment not found");

        shipments[shipmentKey].totalDistributed = _totalDistributed;

        // Check if all counts match
        if (shipments[shipmentKey].totalSent == shipments[shipmentKey].totalReceived &&
            shipments[shipmentKey].totalReceived == shipments[shipmentKey].totalDistributed) {
            shipments[shipmentKey].isCompleted = true;
        } else {
            emit DiscrepancyDetected(shipmentKey, "Mismatch in shipment data");
        }

        emit DistributionUpdated(shipmentKey, _totalDistributed);
    }

    // Get shipment details
    function getShipment(string memory _shipmentId) external view returns (Shipment memory) {
        bytes32 shipmentKey = keccak256(abi.encodePacked(_shipmentId));
        require(shipments[shipmentKey].shipmentId != "", "Shipment not found");
        return shipments[shipmentKey];
    }

    // Get ID
    function getShipmentKey(string memory _shipmentId) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_shipmentId));
    }



}

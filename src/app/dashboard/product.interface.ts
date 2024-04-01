import { Dealer } from './dealer.interface'; // Import the Dealer interface

export interface Product {
  id: number;
  dealer_id: number;
  Deliverynumber: string;
  Quantity: string;
  Type: string;
  Trader: string;
  ReceivingDate: string;
  ShipmentDepartureDate: string;
  Shipmentlocation: string;
  paidamount: string;
  remainingaamount: string;
  Deliveryaddress: string;
  Recipient: string;
  created_at: string;
  updated_at: string;
  dealer: Dealer; // Reference to the Dealer interface
}
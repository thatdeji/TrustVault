export interface IDispute {
  name: string;
  dealerAddress: string;
  dealerMessage: string;
  counterpartyAddress: string;
  counterpartyMessage: string;
  status: boolean;
  deadline: number;
}

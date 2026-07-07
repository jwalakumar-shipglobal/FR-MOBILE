interface customerProps {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  document: string;
}

export default customerProps;

export interface ShipmentDetailsProps {
  getShiperRates: any;
  loading: boolean;
  setLoading: (data: boolean) => void;
}

export interface ShipperRatesProps {
  package_weight: number;
  bill_weight: number;
  volume_weight: number;
  rate: any[];
  notices: any[];
}

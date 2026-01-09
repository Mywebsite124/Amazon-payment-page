
export interface PaymentFormData {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

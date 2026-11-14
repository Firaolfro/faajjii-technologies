export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface StoreOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliverySubcity: string;
  paymentMethod: string;
  items: OrderItem[];
  totalAmount: number;
  status: "Pending" | "Processing" | "Out for Delivery" | "Delivered";
  createdAt: string;
}

export interface ServiceInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  budget: string;
  details: string;
  status: "New" | "Contacted" | "Proposal Sent" | "Closed";
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantName: string;
  email: string;
  phone: string;
  coverNote: string;
  status: "Under Review" | "Shortlisted" | "Interviewing" | "Rejected";
  createdAt: string;
}

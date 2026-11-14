import { StoreOrder, ServiceInquiry, JobApplication } from "./types";

const INITIAL_ORDERS: StoreOrder[] = [
  {
    id: "ord-1",
    orderNumber: "FJ-948211",
    customerName: "Dawit Haile",
    customerPhone: "+251 911 445 678",
    deliverySubcity: "Bole, Addis Ababa",
    paymentMethod: "Chapa (Telebirr)",
    items: [
      { id: "p1", name: "Dell Latitude 5440 (13th Gen)", price: 118000, quantity: 1 },
      { id: "p6", name: "Logitech MX Master 3S Mouse", price: 14800, quantity: 1 },
    ],
    totalAmount: 132800,
    status: "Processing",
    createdAt: "2026-11-14 10:30 AM",
  },
  {
    id: "ord-2",
    orderNumber: "FJ-812390",
    customerName: "Tigist Alemu",
    customerPhone: "+251 922 987 123",
    deliverySubcity: "Kirkos, Addis Ababa",
    paymentMethod: "Cash on Delivery",
    items: [
      { id: "p2", name: "HP LaserJet Pro MFP M428fdw", price: 74500, quantity: 1 },
    ],
    totalAmount: 74500,
    status: "Out for Delivery",
    createdAt: "2026-11-14 02:15 PM",
  },
  {
    id: "ord-3",
    orderNumber: "FJ-765421",
    customerName: "Samuel Kassa",
    customerPhone: "+251 930 112 334",
    deliverySubcity: "Yeka, Addis Ababa",
    paymentMethod: "Chapa (CBE Birr)",
    items: [
      { id: "p3", name: "Cisco Catalyst 24-Port Switch", price: 68000, quantity: 2 },
    ],
    totalAmount: 136000,
    status: "Delivered",
    createdAt: "2026-11-13 11:00 AM",
  },
];

const INITIAL_INQUIRIES: ServiceInquiry[] = [
  {
    id: "inq-1",
    name: "Abyssinia Logistics PLC",
    email: "contact@abyssinialogistics.et",
    phone: "+251 911 556 677",
    serviceType: "Business Management System (ERP)",
    budget: "150,000 - 400,000 ETB",
    details: "We require a centralized fleet, warehouse inventory and billing management system for our 3 depots in Addis Ababa and Adama.",
    status: "New",
    createdAt: "2026-11-14 09:12 AM",
  },
  {
    id: "inq-2",
    name: "Dr. Selamawit Tadesse (Hillside Academy)",
    email: "admin@hillsideacademy.edu.et",
    phone: "+251 912 334 455",
    serviceType: "School / Hotel Management",
    budget: "50,000 - 150,000 ETB",
    details: "Need a comprehensive student information system with attendance, gradebook, and parent SMS notification integration.",
    status: "Proposal Sent",
    createdAt: "2026-11-13 04:45 PM",
  },
  {
    id: "inq-3",
    name: "Kidus Fikre (E-Commerce Startup)",
    email: "kidus@fikreventures.com",
    phone: "+251 944 112 233",
    serviceType: "Custom Corporate Website",
    budget: "50,000 - 150,000 ETB",
    details: "Multi-vendor modern web store with Chapa and telebirr payment checkout.",
    status: "Contacted",
    createdAt: "2026-11-12 01:20 PM",
  },
];

const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: "app-1",
    jobId: "j1",
    jobTitle: "Junior React / Next.js Developer",
    company: "Faajji Technologies (Software Division)",
    applicantName: "Yonas Mengistu",
    email: "yonas.m@gmail.com",
    phone: "+251 911 234 567",
    coverNote: "AAiT Software Engineering graduate with strong React and TypeScript background. Completed multiple Next.js full-stack projects.",
    status: "Shortlisted",
    createdAt: "2026-11-14 11:40 AM",
  },
  {
    id: "app-2",
    jobId: "j2",
    jobTitle: "IT Support & Network Maintenance Intern",
    company: "Ethio-Fintech Solutions",
    applicantName: "Blen Assefa",
    email: "blen.assefa@outlook.com",
    phone: "+251 913 778 899",
    coverNote: "CCNA certified fresher eager to contribute to enterprise routing, switch setup, and system diagnostics.",
    status: "Interviewing",
    createdAt: "2026-11-13 03:10 PM",
  },
];

export const StorageService = {
  getOrders: (): StoreOrder[] => {
    if (typeof window === "undefined") return INITIAL_ORDERS;
    const stored = localStorage.getItem("faajji_orders");
    if (!stored) {
      localStorage.setItem("faajji_orders", JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(stored);
  },

  addOrder: (order: Omit<StoreOrder, "id" | "orderNumber" | "createdAt">): StoreOrder => {
    const orders = StorageService.getOrders();
    const newOrder: StoreOrder = {
      ...order,
      id: `ord-${Date.now()}`,
      orderNumber: `FJ-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updated = [newOrder, ...orders];
    if (typeof window !== "undefined") {
      localStorage.setItem("faajji_orders", JSON.stringify(updated));
    }
    return newOrder;
  },

  updateOrderStatus: (id: string, status: StoreOrder["status"]): void => {
    const orders = StorageService.getOrders();
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    if (typeof window !== "undefined") {
      localStorage.setItem("faajji_orders", JSON.stringify(updated));
    }
  },

  getInquiries: (): ServiceInquiry[] => {
    if (typeof window === "undefined") return INITIAL_INQUIRIES;
    const stored = localStorage.getItem("faajji_inquiries");
    if (!stored) {
      localStorage.setItem("faajji_inquiries", JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    return JSON.parse(stored);
  },

  addInquiry: (inquiry: Omit<ServiceInquiry, "id" | "createdAt" | "status">): ServiceInquiry => {
    const list = StorageService.getInquiries();
    const newInquiry: ServiceInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: "New",
      createdAt: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updated = [newInquiry, ...list];
    if (typeof window !== "undefined") {
      localStorage.setItem("faajji_inquiries", JSON.stringify(updated));
    }
    return newInquiry;
  },

  updateInquiryStatus: (id: string, status: ServiceInquiry["status"]): void => {
    const list = StorageService.getInquiries();
    const updated = list.map((i) => (i.id === id ? { ...i, status } : i));
    if (typeof window !== "undefined") {
      localStorage.setItem("faajji_inquiries", JSON.stringify(updated));
    }
  },

  getApplications: (): JobApplication[] => {
    if (typeof window === "undefined") return INITIAL_APPLICATIONS;
    const stored = localStorage.getItem("faajji_applications");
    if (!stored) {
      localStorage.setItem("faajji_applications", JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(stored);
  },

  addApplication: (app: Omit<JobApplication, "id" | "createdAt" | "status">): JobApplication => {
    const list = StorageService.getApplications();
    const newApp: JobApplication = {
      ...app,
      id: `app-${Date.now()}`,
      status: "Under Review",
      createdAt: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updated = [newApp, ...list];
    if (typeof window !== "undefined") {
      localStorage.setItem("faajji_applications", JSON.stringify(updated));
    }
    return newApp;
  },

  updateApplicationStatus: (id: string, status: JobApplication["status"]): void => {
    const list = StorageService.getApplications();
    const updated = list.map((a) => (a.id === id ? { ...a, status } : a));
    if (typeof window !== "undefined") {
      localStorage.setItem("faajji_applications", JSON.stringify(updated));
    }
  },
};

import Overview from './stocks-component/overview';
import ProductLog from './stocks-component/product-log';

// id, user_id, name, description, quantity, status, created_at, updated_at

const data = [
  {
    id: "7a62d52a-77fa-4c41-8d31-d9a1cda1272e",
    user_id: "f21a9b10-4e8b-4ff2-9ab6-9b89c4b77f5b",
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with adjustable DPI and 6 programmable buttons. Long battery life up to 18 months.",
    quantity: 45,
    price: 20.00,
    category: "Electronic",
    status: "active",
    created_at: "2024-12-01T10:00:00Z",
    updated_at: "2025-01-15T12:30:00Z",
  },
  {
    id: "f0e8d8c9-13a1-4d21-89a5-5b03258f9a41",
    user_id: "f21a9b10-4e8b-4ff2-9ab6-9b89c4b77f5b",
    name: "Office Chair",
    description:
      "Adjustable ergonomic office chair with lumbar support, mesh back, and 360-degree swivel.",
    quantity: 12,
    price: 100.00,
    category: "Furniture",
    status: "active",
    created_at: "2024-11-15T09:00:00Z",
    updated_at: "2025-01-14T16:45:00Z",
  },
  {
    id: "6bc3c17b-9b24-4b9a-86f7-8dbb33d5573b",
    user_id: "f21a9b10-4e8b-4ff2-9ab6-9b89c4b77f5b",
    name: "USB-C Cable",
    description: "6ft USB-C charging cable supporting fast charging up to 100W.",
    quantity: 3,
    price: 15.00,
    category: "Electronic",
    status: "active",
    created_at: "2024-12-10T14:20:00Z",
    updated_at: "2025-01-13T11:00:00Z",
  },
  {
    id: "e5d67c8e-4e34-4cb0-b518-61f2aaf36a11",
    user_id: "f21a9b10-4e8b-4ff2-9ab6-9b89c4b77f5b",
    name: "Mechanical Keyboard",
    description:
      "RGB mechanical keyboard with hot-swappable switches and customizable lighting profiles.",
    quantity: 28,
    price: 150.00,
    category: "Electronic",
    status: "inactive",
    created_at: "2024-12-20T08:45:00Z",
    updated_at: "2025-01-14T09:10:00Z",
  },
  {
    id: "ae32e4b9-5d31-4ad4-b2a5-b8f4a5e5c6e3",
    user_id: "f21a9b10-4e8b-4ff2-9ab6-9b89c4b77f5b",
    name: "Standing Desk",
    description:
      "Adjustable standing desk with electric height control and memory presets.",
    quantity: 7,
    price: 2000.00,
    category: "Furniture",
    status: "archived",
    created_at: "2024-11-10T10:10:00Z",
    updated_at: "2025-01-15T10:45:00Z",
  },
];


function Stocks() {
  return (
    <div className='stocks'>
      <Overview data={data}/>
      <ProductLog data={data}/>
    </div>
  );
}

export default Stocks;

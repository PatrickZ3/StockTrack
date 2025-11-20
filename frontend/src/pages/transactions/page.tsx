import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';

type TransactionItem = {
  id: string;
  product_id: string;
  product_name: string;
  quantity_deducted: number;
};

type Transaction = {
  id: string;
  user_id: string;
  note: string | null;
  created_at: string;
  items: TransactionItem[];
};


function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await fetch("http://localhost:4000/transactions");
        const data = await res.json();

        if (data.success) {
          setTransactions(data.data)
          console.log(data.data)
        }
      } catch (err) {
        console.error("Error fetching transaction", err);
      } finally {
        setLoading(false)
      }
    };
    fetchTransaction();
  }, []);

  if (loading) return <p>Loading Transactions...</p>;

  return (
    <div>
      <Navbar />

      <p>
        transactionsss
      </p>
      <ul>
        {transactions.map((t) => (
          <li key={t.id} style={{ marginBottom: "20px" }}>
            Transaction:{t.id}
            <br />
            Note:{t.note || "No note"}
            <br />
            Items:

            {t.items.length === 0 ? (
              <p>No items in this transaction.</p>
            ) : (
              <ul style={{ marginLeft: "20px" }}>
                {t.items.map((item) => (
                  <li key={item.id}>
                    {item.product_name} — {item.quantity_deducted}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>


    </div>
  );
}

export default Transactions;

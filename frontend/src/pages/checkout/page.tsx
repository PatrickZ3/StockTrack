import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "react-bootstrap";

function CheckOut() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems.map((i) =>
      i.id === id
        ? { ...i, quantity: Math.min(Math.max(1, i.quantity + delta), i.stock) }
        : i
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div>
      <Navbar />

      <div className="checkoutContainer">
        <h2 className="checkoutHeading">Checkout</h2>

        {cartItems.length === 0 && <p>Your cart is empty.</p>}

        {cartItems.map((item) => (
          <div key={item.id} className="checkoutItem">
            {/* MIDDLE — NAME + PRICE + CONTROLS */}
            <div className="itemDetails">
              <h3 className="itemName">{item.name}</h3>
              <div className="itemPrice">${item.price} per unit</div>

              <div className="quantityController" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="qtyButton"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Minus size={18} />
                </button>
                <span className="qtyText">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="qtyButton"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Plus size={18} />
                </button>
                <span className="maxText">Max: {item.stock}</span>
              </div>
            </div>

            {/* RIGHT — DELETE + TOTAL */}
            <div className="itemActions">
              <button
                onClick={() => handleDelete(item.id)}
                className="deleteButton"
              >
                <Trash2 size={24} />
              </button>
              <p className="totalPrice">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        {cartItems.length > 0 && (
          <div className="checkoutFooter">

            <div className="checkoutFooterRow">
              <div className="checkOutFooterTitle">Total Items:</div>
              <div className="checkOutFooterTitle">
                {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
              </div>
            </div>

            <div className="checkoutFooterRow">
              <div className="checkOutFooterTitle" style={{fontWeight:"800"}}>Grand Total:</div>
              <div className="checkOutFooterTitle" style={{fontWeight:"800"}}>
                ${cartItems
                  .reduce((sum, i) => sum + i.price * i.quantity, 0)
                  .toFixed(2)}
              </div>
            </div>
            <Button
              variant="primary"
              className='checkoutButton'
            >
              Checkout
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}

export default CheckOut;

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  calculateTotalPrice: () => void;
  totalPrice: number;
  confirmPurchase: () => void;
  isPurchaseConfirmed: boolean;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
}

function Cart({
  cartItems,
  removeFromCart,
  calculateTotalPrice,
  totalPrice,
  confirmPurchase,
  isPurchaseConfirmed,
  incrementQuantity,
  decrementQuantity
}: CartProps) {

  return (
    <div className="container">
      <h2>Carrito de Compras</h2>

      {isPurchaseConfirmed && <p className="alert alert-success">¡Su compra ha sido exitosa!</p>}

      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div className="card mb-3" style={{ maxWidth: '540px' }} key={item.id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={item.image} className="img-fluid rounded-start" alt={item.title} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                        $ {item.price.toFixed(1)} <br />
                        Cantidad: {item.quantity}
                      </p>
                      <button className="btn btn-secondary" onClick={() => incrementQuantity(item.id)}>+</button>
                      <button className="btn btn-secondary" onClick={() => decrementQuantity(item.id)}>-</button>
                      <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-primary me-2" onClick={calculateTotalPrice}>
              Comprar (Total: $ {totalPrice.toFixed(1)})
            </button>
            <button className="btn btn-success" onClick={confirmPurchase}>
              Confirmar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

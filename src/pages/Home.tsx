import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface HomeProps {
  addToCart: (product: Product) => void;
}

function Home({ addToCart }: HomeProps) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/");
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError("Erróneo: No se pudo obtener la información de los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <img src="/3.png" alt="Cargando" className="loading-image" />
        <h2>Cargando...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center">Tienda online</h1> {/* Título agregado */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {data.map((product) => (
          <div
            className="card"
            style={{ maxWidth: "301px", margin: "1cm" }}
            key={product.id}
          >
            <div className="row g-0 flex-grow-1">
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <img
                  src={product.image}
                  className="img-fluid rounded-start"
                  alt={product.title}
                />
              </div>
              <div className="col-md-8 d-flex flex-column justify-content-between">
                <div className="card-body d-flex flex-column flex-grow-1">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Descripción</p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      $ {product.price}
                    </small>
                  </p>
                </div>
                <div className="d-flex justify-content-center mb-3">
                  <button
                    className="cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Agregar a Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

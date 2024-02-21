import React from "react";
import "../Styles/ProductCard.css";
import { isValidUrl } from "../utils/Helper";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

interface Props {
  product: Product;
  openModal: (value: boolean, item: any) => void;
}

const ProductCard = ({ product, openModal }: Props) => {
  const { title, price, description, images } = product;
  const handleVisibility = (product: any) => {
    openModal(true, product);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <div style={{ display: "flex" }}>
          {images.length > 0 && (
            <div style={{ marginRight: "1rem" }}>
              <img
                src={
                  isValidUrl(images[0])
                    ? images[0]
                    : "https://www.freeiconspng.com/uploads/no-image-icon-23.jpg"
                }
                alt={title}
                style={{
                  height: "auto",
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="product-details">
        <h2 className="product-title">{title}</h2>
        <p className="product-price">Price : ${price}</p>
        <p className="product-description">{description}</p>
        <button
          className="view-detail-button"
          onClick={() => handleVisibility(product)}
        >
          View Detail
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);

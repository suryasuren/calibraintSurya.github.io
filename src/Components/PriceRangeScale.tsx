import React, { useState } from "react";

interface PriceRangeProps {
  onEmit: (data: any) => void;
}
const PriceRangeScale = ({ onEmit }: PriceRangeProps) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= maxPrice) {
      setMinPrice(value);

      onEmit({
        max: maxPrice,
        min: value,
      });
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= minPrice) {
      setMaxPrice(value);

      onEmit({
        max: value,
        min: minPrice,
      });
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <div>
        <p>Min Price: {minPrice}</p>
        <p>Max Price: {maxPrice}</p>
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={2000}
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          type="range"
          min={minPrice}
          max={2000}
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};

export default PriceRangeScale;

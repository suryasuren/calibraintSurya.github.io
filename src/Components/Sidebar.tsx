import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/Helper";
import PriceRangeScale from "./PriceRangeScale";

interface Category {
  id: number;
  name: string;
}

interface SidebarProps {
  categories: Category[];
  onFilterChange: (selectedCategories: number[], datas: any) => void;
}

const Sidebar = ({ categories, onFilterChange }: SidebarProps) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState<any>([]);
  const [priceData, setPriceData] = useState({
    max: 2000,
    min: 0,
  });

  const handleCategoryChange = (categoryId: number) => {
    const updatedSelection = [...selectedCategories];
    const index = updatedSelection.indexOf(categoryId);
    if (index === -1) {
      updatedSelection.push(categoryId);
    } else {
      updatedSelection.splice(index, 1);
    }

    setSelectedCategories(updatedSelection);
  };

  const handleClickFilter = () => {
    onFilterChange(selectedCategories, priceData);

    let filteredCategory = categories.filter((val) =>
      selectedCategories.includes(val.id)
    );

    setSelectedCategoryItem(filteredCategory);
  };

  const handlePriceEmit = (datas: any) => {
    console.log("on emit", datas);
    setPriceData(datas);
  };

  return (
    <>
      <div className="sidebar" style={{ width: "250px" }}>
        <h2>Filter by Category</h2>
        <ul
          style={{
            textAlign: "left",
            float: "left",
            textDecoration: "none",
            listStyle: "none",
          }}
        >
          {categories.map((category) => (
            <li key={category.id} style={{ margin: "5px 0" }}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                />
                {capitalizeFirstLetter(category.name)}
              </label>
            </li>
          ))}

          <h4>Filter by Price (In $)</h4>

          <PriceRangeScale onEmit={handlePriceEmit} />

          <button
            style={{
              margin: 10,
              padding: 10,
              width: 100,
              backgroundColor: "#007bff",
              color: "white",
              fontWeight: "bold",
              borderRadius: 10,
              border: "none",
            }}
            onClick={handleClickFilter}
          >
            Filter
          </button>

          <div>
            <h4>Applied Filter</h4>
          </div>

          <div>
            <ul
              style={{
                textAlign: "left",
                float: "left",
                textDecoration: "none",
                listStyle: "none",
              }}
            >
              {selectedCategoryItem.map((res, i) => (
                <li key={res.id} style={{ margin: "5px 0" }}>
                  <label>{res.name}</label>
                </li>
              ))}
            </ul>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import fetchProductData from "./store/actions/productMiddleware";
import ProductCard from "./Components/ProductCard";
import { useSelector } from "react-redux";
import Sidebar from "./Components/Sidebar";
import SearchBar from "./Components/SearchBar";
import Pagination from "./Components/Pagination";
import { productRemove, productView } from "./store/reducers/productReducer";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {children}
        <button
          className="closs"
          style={{
            backgroundColor: "#007bff",
            padding: 10,
            borderRadius: 10,
            fontWeight: "bold",
            border: "none",
            color: "white",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const [originalData, setOriginalData] = useState([]);
  const [copiedData, setCopiedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const { data } = useSelector((state) => state.productData);
  const { dataVal } = useSelector((state) => state.individialProduct);

  useEffect(() => {
    dispatch(fetchProductData());
  }, []);

  useEffect(() => {
    setOriginalData(data.data.length > 0 ? data.data : []);
  }, [data]);

  useEffect(() => {
    setCopiedData(originalData.slice(0, itemsPerPage));
  }, [originalData]);

  const handlePageChange = (pageNumber) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCopiedData(originalData.slice(startIndex, endIndex));
  };

  const handleFilterChange = (selectedCategories, priceData) => {
    console.log(priceData, "priceData");
    const { max, min } = priceData;
    if (selectedCategories.length === 0) {
      let updatedData = data.data.filter(
        (value) => value.price >= min && value.price <= max
      );

      setCopiedData(updatedData);
      setOriginalData(updatedData);
    } else {
      let updatedData = data.data.filter(
        (value) =>
          selectedCategories.includes(value.category.id) &&
          value.price >= min &&
          value.price <= max
      );

      setCopiedData(updatedData);
      setOriginalData(updatedData);
    }
  };

  const handleSearch = (value) => {
    console.log("Searching for:", value);
    if (value === "") {
      setOriginalData(data.data);
    } else {
      let filters = originalData.filter((obj) => {
        if (
          obj &&
          obj.title &&
          obj.title.toLowerCase().includes(value.toLowerCase())
        ) {
          return obj;
        }
      });
      setOriginalData(filters);
    }
  };

  const handleModal = (val, item) => {
    console.log(val);
    setIsModalOpen(!isModalOpen);
    dispatch(productView(item));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(productRemove(null));
  };

  return (
    <div className="App">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {dataVal && (
          <div className="product">
            <div className="product-image">
              {dataVal?.images && dataVal?.images[0] && (
                <img
                  src={dataVal.images[0] ?? dataVal.images[1]}
                  alt={dataVal.title}
                  style={{ height: 200, width: 200 }}
                />
              )}
            </div>
            <div className="product-details">
              <h2 className="product-title">{dataVal?.title || ""}</h2>
              <p className="product-price">Price : $ {dataVal?.price || ""}</p>
              <p className="product-price">
                Category : {dataVal?.category?.name || ""}
              </p>

              <p className="product-description">
                {dataVal?.description || ""}
              </p>
            </div>

            <div>
              <p className="product-price">Product Images</p>
              <div
                style={{
                  justifyContent: "flex-start",
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                {dataVal.images.length > 0 &&
                  dataVal.images.map((imageUrl, index) => {
                    console.log(imageUrl, "imageUrl");
                    return (
                      <div key={index} style={{ borderRadius: 10 }}>
                        <img
                          src={imageUrl}
                          alt={`Product Image ${index + 1}`}
                          style={{ height: 150, width: 150, borderRadius: 10 }}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0 5%",
        }}
      >
        <h1>Calibraint</h1>

        <SearchBar onSearch={handleSearch} />
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <Sidebar
            categories={data.category}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="parent-div">
          {copiedData.map((resp) => {
            return (
              <ProductCard
                key={resp.id}
                product={resp}
                openModal={handleModal}
              />
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <Pagination
          totalItems={originalData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;

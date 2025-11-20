import React, { useState } from 'react';
import { Sparkles, ShoppingCart, TrendingUp } from 'lucide-react';
import MyItems from './helper/MyItems.jsx';
import Cartitems from './helper/Cartitems.jsx';
import ItemProVider from './store/ItemList-store.jsx';
import AddItem from './mod/AddItem.jsx';
import Navbar from './helper/Navbar.jsx';
import CartProvider from './store/CartList-store.jsx';

const MainCompo = () => {
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('products');
  const [openModal, setOpenModal] = useState(false);

  const products = [
    { id: 1, name: "Premium Leather Shoe", type: "Footwear", price: 999, badge: "Bestseller" },
    { id: 2, name: "Designer Luxury Bag", type: "Bag", price: 1499, badge: "New" },
    { id: 3, name: "Smart Watch Pro", type: "Electronics", price: 2999, badge: "Hot" },
    { id: 4, name: "Polarized Sunglasses", type: "Accessories", price: 599, badge: "Sale" },
    { id: 5, name: "Wireless Earbuds Max", type: "Electronics", price: 1299, badge: "Trending" }
  ];

  const save = () => {
    localStorage.setItem("ITEM", JSON.stringify(products));
    alert("Products saved successfully!");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getBadgeColor = (badge) => {
    const colors = {
      'Bestseller': 'badge-warning',
      'New': 'badge-success',
      'Hot': 'badge-error',
      'Sale': 'badge-secondary',
      'Trending': 'badge-info'
    };
    return colors[badge] || 'badge-primary';
  };

  return (
    <CartProvider>
      <ItemProVider>
        <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">

          {/* Navbar */}
          <div className="navbar bg-base-100/80 backdrop-blur-lg border-b border-base-300 shadow-lg sticky top-0 z-50">
            <div className="flex-1 gap-1.5">
              <button
                onClick={() => setCurrentPage('products')}
                className="btn btn-ghost text-xl mr-3 font-bold gap-2"
              >
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ShopNow
                </span>
              </button>
              <button
                onClick={save}
                className="btn btn-ghost text-xl mr-3 font-bold gap-2"
              >
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AddLocal
                </span>
              </button>

              {/* ADD ITEM BUTTON → opens modal */}
              <button
                onClick={() => setOpenModal(true)}
                className="btn btn-ghost text-xl font-bold gap-2"
              >
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-white">
                  Add Item 🛍️
                </span>
              </button>
            </div>

            <Navbar setCurrentPage={setCurrentPage} />
          </div>

          {/* MAIN CONTENT */}
          <div className="container mx-auto p-6 max-w-7xl">
            {currentPage === 'products' ? (
              <MyItems getBadgeColor={getBadgeColor} />

            ) : (
              <Cartitems setCurrentPage={setCurrentPage} />
            )}
          </div>

          {openModal && (
            <AddItem setOpenModal={setOpenModal} />
          )}
        </div>
      </ItemProVider>
    </CartProvider>
  );
};

export default MainCompo;

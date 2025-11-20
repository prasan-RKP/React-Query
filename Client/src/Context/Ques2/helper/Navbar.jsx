import { ShoppingCart, TrendingUp } from 'lucide-react'
import React, { useContext } from 'react'
import { CartListCONTXT } from '../store/CartList-store';

const Navbar = ({ setCurrentPage }) => {

    const { cartItems } = useContext(CartListCONTXT);

    //const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalItems = cartItems.length;
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-5 py-2.5 rounded-full text-white font-bold shadow-lg">
                    <TrendingUp className="w-4 h-4" />

                    <span>₹{totalPrice.toLocaleString()}</span>
                </div>

                <button
                    onClick={() => setCurrentPage('cart')}
                    className="btn btn-ghost btn-circle indicator hover:bg-primary/10"
                >
                    <ShoppingCart className="w-6 h-6" />
                    {totalItems > 0 && (
                        <span className="badge badge-primary badge-sm indicator-item animate-pulse">
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>
        </div>
    )
}

export default Navbar

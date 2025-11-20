import { Package, ShoppingCart, Trash2 } from 'lucide-react'
import React, { useContext } from 'react'
import CartItem from '../mod/CartItem'
import { CartListCONTXT } from '../store/CartList-store'

const Cartitems = ({ setCurrentPage }) => {

    const { cartItems } = useContext(CartListCONTXT);

    //const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalItems = cartItems.length;
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div>
            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Your Cart
                    </h1>
                    <p className="text-base-content/60">{totalItems} items in your bag</p>
                </div>

                {cartItems?.length === 0 ? (
                    <div className="card bg-base-100 shadow-xl border border-base-300">
                        <div className="card-body items-center text-center py-16">
                            <ShoppingCart className="w-20 h-20 text-base-content/20 mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Your cart is empty</h3>
                            <p className="text-base-content/60 mb-6">Start adding products to see them here</p>

                            <button
                                onClick={() => setCurrentPage('products')}
                                className="btn btn-primary"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map(item => (
                                <CartItem key={item?.id} item={item} />
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-2xl sticky top-24">
                                <div className="card-body">
                                    <h3 className="card-title text-2xl mb-4">Order Summary</h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-primary-content/80">Subtotal</span>
                                            <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-primary-content/80">Shipping</span>
                                            <span className="font-semibold">Free</span>
                                        </div>
                                        <div className="divider my-2"></div>
                                        <div className="flex justify-between text-xl">
                                            <span className="font-bold">Total</span>
                                            <span className="font-bold">₹{totalPrice.toLocaleString()}</span>
                                        </div>
                                        <p className="text-xs text-primary-content/70">
                                            Total items: {totalItems}
                                        </p>
                                    </div>

                                    <button className="btn btn-neutral w-full gap-2 shadow-lg">
                                        <ShoppingCart className="w-5 h-5" />
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cartitems

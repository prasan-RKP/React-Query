import { Package, Trash2 } from 'lucide-react'
import React, { useContext } from 'react'
import { CartListCONTXT } from '../store/CartList-store'

const CartItem = ({item}) => {
    // name, type, price, quantity

    console.log(item);

    const {removeToCart, incQuantity, decQuantity} = useContext(CartListCONTXT);

    return (
        <div>
            <div
                key={item.id}
                className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-shadow"
            >
                <div className="card-body">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                            <Package className="w-10 h-10 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg truncate">{item?.name}</h3>
                            <p className="text-sm text-base-content/60">{item?.type}</p>
                            <p className="text-primary font-semibold mt-1">
                                ₹{item?.price.toLocaleString()} each
                            </p>
                        </div>

                        <div className="flex flex-col  items-end gap-3">
                            <div className="join">
                                <button
                                    className="join-item btn btn-sm"
                                    onClick={() => decQuantity(item.id)}
                                >
                                    -
                                </button>
                                <button className="join-item btn btn-sm pointer-events-none">
                                    {item.quantity}
                                </button>
                                <button
                                    className="join-item btn btn-sm"
                                    onClick={() => incQuantity(item.id)}
                                >
                                    +
                                </button>
                            </div>

                            <p className="text-xl font-bold">
                                ₹{(item.price * item.quantity).toLocaleString()}
                            </p>

                            <button
                                onClick={() => removeToCart(item?.name)}
                                className="btn btn-error btn-sm btn-outline gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem

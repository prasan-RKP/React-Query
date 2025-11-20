import { ShoppingCart, Sparkles, Trash2 } from 'lucide-react'
import React, { useContext } from 'react'
import { ItemListCONTXT } from '../store/ItemList-store'
import { CartListCONTXT } from '../store/CartList-store';

const Item = ({ product, getBadgeColor }) => {

    const { deleteItem, initialItems } = useContext(ItemListCONTXT);
    const { addToCart } = useContext(CartListCONTXT);


    const itemAddToCart = (id) => {
        let item = initialItems.find(pr => pr?.id === id);

        //// name, type, price, quantity
        let cartItem = { name: item?.name, type: item?.type, price: item?.price, quantity: 1 }

        addToCart(cartItem);
    }

    return (
        <div>
            <div
                key={product?.id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-300"
            >
                <div className="card-body">
                    <div className="flex items-start justify-between mb-3">
                        <div className={`badge ${getBadgeColor(product.badge)} gap-1`}>
                            <Sparkles className="w-3 h-3" />
                            {product.badge}
                        </div>
                        <div onClick={() => deleteItem(product?.id)} className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center hover:cursor-pointer">
                            <Trash2 className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <h2 className="card-title text-xl">{product?.name}</h2>
                    <p className="text-sm text-base-content/60 mb-2">{product?.type}</p>

                    <div className="divider my-2"></div>

                    <div className="flex items-center gap-2 justify-between">
                        <div>
                            <p className="text-xs text-base-content/50">Price</p>
                            <p className="text-3xl font-bold text-primary">
                                ₹{product.price.toLocaleString()}
                            </p>
                        </div>
                        <button
                            onClick={() => itemAddToCart(product?.id)}
                            className="btn btn-primary gap-2 shadow-lg hover:shadow-xl"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item

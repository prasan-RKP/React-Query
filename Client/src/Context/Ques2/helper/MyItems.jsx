
import React, { useContext } from 'react'
import Item from '../mod/Item'
import { ItemListCONTXT } from '../store/ItemList-store';
import CartProvider from '../store/CartList-store';


const MyItems = ({ getBadgeColor, addToCart }) => {

    const { initialItems } = useContext(ItemListCONTXT);

    return (
        // <CartProvider>
            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Discover Products
                    </h1>
                    <p className="text-base-content/60">Explore our curated collection</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialItems?.map(product => (
                        <Item key={product.id} product={product} addToCart={addToCart} getBadgeColor={getBadgeColor} />
                    ))}
                </div>
            </div>
        // </CartProvider>

    )
}

export default MyItems

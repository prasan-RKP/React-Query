import { useEffect, useReducer, createContext } from "react";

// step-1
export const CartListCONTXT = createContext({
    cartItems: [],
    addToCart: () => { },
    removeToCart: () => { },
    incQuantity: () => { },
    decQuantity: () => { },
})

//step-2
const cartReducer = (currCart, action) => {
    switch (action.type) {
        case "ADD_CART":
            return [action.payload.cartItem, ...currCart]


        case 'REMOVE_CART':
            return currCart.filter(item => item.name !== action.payload.name)

        case "INC_Q":
            return currCart.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

        case "DEC_Q":
            return currCart.map(item =>
                item.id === action.payload.id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );

        case "IN_CART":
            return action.payload.carts;

        default:
            return currCart;
    }
}

// step -> 3
const CartProvider = ({ children }) => {
    const [cartItems, dispatchCart] = useReducer(cartReducer, []);

    // ------- User Actions ---------
    const addToCart = (cartItem) => {
        dispatchCart({
            type: "ADD_CART",
            payload: {
                cartItem: cartItem
            }
        })
    }

    const removeToCart = (name) => {
        dispatchCart({
            type: "REMOVE_CART",
            payload: {
                name: name
            }
        })
    }

    const incQuantity = (id) => {
        dispatchCart({
            type: "INC_Q",
            payload: {
                id: id
            }
        })
    }

    const decQuantity = (id) => {
        dispatchCart({
            type: "DEC_Q",
            payload: {
                id: id
            }
        })
    }



    // For fetch initial 'cartItem' & admin datas
    useEffect(() => {
        const inCarts = localStorage.getItem("CART");

        if (inCarts) {
            try {
                let carts = JSON.parse(inCarts);
                dispatchCart({
                    type: "IN_CART",
                    payload: { carts: carts }
                })
            } catch (error) {
                console.log('The error inside "IN_CART" ', error);
            }
        }
    }, [])

    // ------ Save cartItems to localStorage
    useEffect(() => {
        localStorage.setItem("CART", JSON.stringify(cartItems));
    }, [cartItems]);


    return (
        <CartListCONTXT.Provider value={
            {
                cartItems,
                addToCart,
                removeToCart,
                incQuantity,
                decQuantity
            }
        }>
            {children}
        </CartListCONTXT.Provider>
    )
}

export default CartProvider;
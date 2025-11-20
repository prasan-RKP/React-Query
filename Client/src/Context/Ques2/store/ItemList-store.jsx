import { createContext, useReducer, useEffect } from "react";
import { toast } from 'sonner';

export const ItemListCONTXT = createContext({
    initialItems: [],
    createItem: () => { },
    deleteItem: () => { },
})

const itemReducer = (currItem, action) => {

    switch (action.type) {
        case "IN_ITEM":
            return action.payload.items;

        case "CREATE_ITEM":
            return [action.payload.item, ...currItem];

        case "DEL_ITEM":
            return currItem.filter(item =>
                item?.id !== action.payload.id
            )

        default:
            return currItem;
    }
}


const ItemProVider = ({ children }) => {
    const [initialItems, dispatchItem] = useReducer(itemReducer, []);


    const createItem = (item) => {

        const isDuplicate = initialItems.some(exist => exist?.id === item?.id);
        if (isDuplicate) {
            toast.error(`Item with ID "${item.id}" already exists!`);
            return;
        }

        dispatchItem({
            type: "CREATE_ITEM",
            payload: {
                item
            }
        })
    }

    const deleteItem = (id) => {
        dispatchItem({
            type: "DEL_ITEM",
            payload: {
                id
            }
        })
    }


    useEffect(() => {
        let myItems = localStorage.getItem("ITEM");
        if (myItems) {
            try {
                let reItems = JSON.parse(myItems);
                dispatchItem({
                    type: "IN_ITEM",
                    payload: {
                        items: reItems
                    }
                })
            } catch (error) {
                console.log("Error inside 'IN_ITEM'", error);
            }
        }
    }, [])


    useEffect(() => {
        localStorage.setItem("ITEM", JSON.stringify(initialItems));
    }, [initialItems]);

    return (
        <ItemListCONTXT.Provider value={{ initialItems, createItem, deleteItem }}>
            {children}
        </ItemListCONTXT.Provider>
    )
}

export default ItemProVider;
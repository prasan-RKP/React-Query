import React, { useContext, useRef } from 'react'
import { ItemListCONTXT } from '../store/ItemList-store'

const AddItem = ({ setOpenModal }) => {

    const { createItem } = useContext(ItemListCONTXT);

    let itemIdElem = useRef("");
    let itemNameElem = useRef("");
    let itemTypeElem = useRef("");
    let itemPriceElem = useRef("");
    let itemBadgeElem = useRef("");


    const onFormSubmit = (e) => {
        e.preventDefault();

        let itemId = Number(itemIdElem.current.value);
        let itemName = itemNameElem.current.value;
        let itemType = itemTypeElem.current.value;
        let itemPrice = Number(itemPriceElem.current.value);
        let itemBadge = itemBadgeElem.current.value;

        let item = {
            id: itemId, name: itemName, type: itemType,
            price: itemPrice, badge: itemBadge
        }

        console.log("Form submitted", item);
        createItem(item);

        itemIdElem.current.value = "";
        itemNameElem.current.value = "";
        itemTypeElem.current.value = "";
        itemPriceElem.current.value = "";
        itemBadgeElem.current.value = "";
        setOpenModal(false);
    }



    return (
        <div>
            <dialog className="modal modal-open">
                <div className="modal-box w-full max-w-lg bg-base-100 border border-base-300 shadow-xl">

                    <h3 className="font-bold text-2xl mb-4 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Add New Product
                    </h3>

                    <form onSubmit={(e)=> onFormSubmit(e)} className="grid grid-cols-1 gap-4">

                        <input ref={itemIdElem} type="number" placeholder="Enter ID"
                            className="input input-bordered w-full" />

                        <input ref={itemNameElem} type="text" placeholder="Enter Name"
                            className="input input-bordered w-full" />

                        <input ref={itemTypeElem} type="text" placeholder="Product Type (Ex: Bag, Shoes)"
                            className="input input-bordered w-full" />

                        <input ref={itemPriceElem} type="number" placeholder="Enter Price"
                            className="input input-bordered w-full" />

                        <input ref={itemBadgeElem} type="text" placeholder="#trendy, #new, #launched  etc."
                            className="input input-bordered w-full" />



                        <div className="modal-action">
                            <button type="submit" className="btn btn-success text-white">Save</button>
                            <button className="btn"
                                onClick={() => setOpenModal(false)}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default AddItem

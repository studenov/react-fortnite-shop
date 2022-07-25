import { BasketItem } from "./BasketItem";
import { useContext } from "react";
import { ShopContext } from "../context";

function BasketList(props) {
    const { order, handleCartShow } = useContext(ShopContext);

    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price * el.quantity;
    }, 0);

    return (
        <ul className="collection basket-list">
            <li className="collection-item active">Cart</li>
            {order.length ? (
                order.map((item) => <BasketItem key={item.id} {...item} />)
            ) : (
                <li className="collection-item">Cart is empty</li>
            )}
            <li className="collection-item active">
                Total cost: {totalPrice} $.
            </li>
            <li className="collection-item">
                <button className="btn btn-small" onClick={handleCartShow}>
                    Confirm
                </button>
            </li>
            <i className="material-icons basket-close" onClick={handleCartShow}>
                close
            </i>
        </ul>
    );
}

export { BasketList };

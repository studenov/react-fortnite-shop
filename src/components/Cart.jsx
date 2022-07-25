import { useContext } from "react";
import { ShopContext } from "../context";

function Cart(props) {
    const { quantity, handleCartShow } = useContext(ShopContext);
    return (
        <div className="cart blue darken-4 white-text" onClick={handleCartShow}>
            <i className="material-icons">shopping_cart</i>
            {quantity ? (
                <span className="cart-quantity">{quantity}</span>
            ) : null}
        </div>
    );
}

export { Cart };

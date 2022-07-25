import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";

import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import { BasketList } from "./BasketList";
import { Alert } from "./Alert";

function Main() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isCartShow, setCartShow] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [alertName, setAlertName] = useState("");

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.featured && setGoods(data.featured);
                setLoading(false);
            });
    }, []);

    const addToCart = (item) => {
        const itemIndex = order.findIndex(
            (orderItem) => orderItem.id === item.id
        );

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };
            setOrder([...order, newItem]);
            setQuantity(quantity + 1);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                } else {
                    return orderItem;
                }
            });
            setOrder(newOrder);
            countQuantity(newOrder);
        }

        setAlertName(item.name);
    };

    const removeFromCart = (itemId) => {
        const newOrder = order.filter((el) => el.id !== itemId);
        setOrder(newOrder);
        countQuantity(newOrder);
    };

    const handleCartShow = () => {
        setCartShow(!isCartShow);
    };

    const incQuantity = (itemId) => {
        const newOrder = order.map((orderItem) => {
            if (orderItem.id === itemId) {
                return {
                    ...orderItem,
                    quantity: orderItem.quantity + 1,
                };
            } else {
                return orderItem;
            }
        });
        setOrder(newOrder);
        countQuantity(newOrder);
    };

    const decQuantity = (itemId) => {
        const newOrder = order.map((orderItem) => {
            if (orderItem.id === itemId) {
                const newQuantity = orderItem.quantity - 1;
                return {
                    ...orderItem,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                };
            } else {
                return orderItem;
            }
        });
        setOrder(newOrder);
        countQuantity(newOrder);
    };

    const countQuantity = (order) => {
        const newQuantity = order
            .map((item) => item.quantity)
            .reduce((partialSum, a) => partialSum + a, 0);
        setQuantity(newQuantity);
    };

    const closeAlert = () => {
        setAlertName("");
    };

    return (
        <main className="container content">
            <Cart quantity={quantity} handleCartShow={handleCartShow} />
            {loading ? (
                <Preloader />
            ) : (
                <GoodsList goods={goods} addToCart={addToCart} />
            )}
            {isCartShow && (
                <BasketList
                    order={order}
                    handleCartShow={handleCartShow}
                    removeFromCart={removeFromCart}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                />
            )}
            {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
        </main>
    );
}

export { Main };

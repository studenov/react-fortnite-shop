export function reducer(state, { type, payload }) {
    const CLOSE_ALERT = "CLOSE_ALERT";
    const REMOVE_FROM_CART = "REMOVE_FROM_CART";
    const HANDLE_CART_SHOW = "HANDLE_CART_SHOW";
    const INC_QUANTITY = "INC_QUANTITY";
    const DEC_QUANTITY = "DEC_QUANTITY";
    const ADD_TO_CART = "ADD_TO_CART";
    const SET_GOODS = "SET_GOODS";

    switch (type) {
        case ADD_TO_CART: {
            const itemIndex = state.order.findIndex(
                (orderItem) => orderItem.id === payload.id
            );

            let newOrder = null;
            let newQuantity = 0;
            if (itemIndex < 0) {
                const newItem = {
                    ...payload,
                    quantity: 1,
                };
                newOrder = [...state.order, newItem];
                newQuantity = state.quantity + 1;
            } else {
                newOrder = state.order.map((orderItem, index) => {
                    if (index === itemIndex) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1,
                        };
                    } else {
                        return orderItem;
                    }
                });
                newQuantity = state.order
                    .map((item) => item.quantity)
                    .reduce((partialSum, a) => partialSum + a, 0);
            }

            return {
                ...state,
                order: newOrder,
                quantity: newQuantity,
                alertName: payload.name,
            };
        }

        case CLOSE_ALERT:
            return {
                ...state,
                alertName: "",
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                order: state.order.filter((el) => el.id !== payload.id),
            };

        case HANDLE_CART_SHOW:
            return {
                ...state,
                isCartShow: !state.isCartShow,
            };

        case INC_QUANTITY: {
            const newOrder = state.order.map((orderItem) => {
                if (orderItem.id === payload.id) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                } else {
                    return orderItem;
                }
            });
            const newQuantity = newOrder
                .map((item) => item.quantity)
                .reduce((partialSum, a) => partialSum + a, 0);
            return {
                ...state,
                order: newOrder,
                quantity: newQuantity,
            };
        }

        case DEC_QUANTITY: {
            const newOrder = state.order.map((orderItem) => {
                if (orderItem.id === payload.id) {
                    const newQuantity = orderItem.quantity - 1;
                    return {
                        ...orderItem,
                        quantity: newQuantity >= 0 ? newQuantity : 0,
                    };
                } else {
                    return orderItem;
                }
            });
            const newQuantity = newOrder
                .map((item) => item.quantity)
                .reduce((partialSum, a) => partialSum + a, 0);
            return {
                ...state,
                order: newOrder,
                quantity: newQuantity,
            };
        }

        case SET_GOODS:
            return {
                ...state,
                goods: payload || [],
                loading: false,
            };

        default:
            return state;
    }
}

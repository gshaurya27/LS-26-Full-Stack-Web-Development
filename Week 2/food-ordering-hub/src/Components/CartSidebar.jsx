function CartSidebar({
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    clearCart
})  {
    return (
        <div className="cart-popup">
            <h3>
                Your Cart
            </h3>

            {
                cartItems.length === 0 ?
                (
                    <p>
                        Cart is Empty
                    </p>
                ):(
                    cartItems.map((item,index)=>(
                        <div key={index} className="cart-item">

                            <p>
                                {item.name}
                            </p>

                            <div className="cart-controls">
                                <button onClick={() => decreaseQuantity(item.id)}>
                                    -
                                </button>
                                <span>
                                    {item.quantity}
                                </span>

                                <button onClick={() => increaseQuantity(item.id)}>
                                    +
                                </button>
                                
                            </div>

                            <p>
                                ₹{item.price*item.quantity}
                            </p>

                            </div>
                    ))
                )
            }
            <h3>
            Total: ₹
            {cartItems.reduce((total,item)=> total + item.price * item.quantity,0)}    
            </h3>    
            
            <button className="clear-button" onClick={clearCart}>
                Clear Cart
            </button>

        </div>
    );
}
export default CartSidebar;
import { useState } from "react";
import MenuGrid from "./components/MenuGrid";
import CartSidebar from "./components/CartSidebar";
import foodData from "./assets/foodData";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [showCart, setShowCart] = useState(false);

    const addToCart = (food) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === food.id);

            if (existingItem) {
                return prev.map(item => item.id === food.id ?
                    {   ...item,
                        quantity: item.quantity + 1
                    }
                    :
                    item
                );
            }
            return[
                ...prev,
                {   ...food,
                    quantity: 1
                }   
            ];


        });

        setMessage(`✓ ${food.name} added to cart`);
        setTimeout(() => {
            setMessage("");
        }, 2000);
    };

    const increaseQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item => item.id === id ?
                {   ...item,
                    quantity: item.quantity + 1

                }:

                item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item => item.id === id ?
                {   ...item,
                    quantity: item.quantity - 1

                }:

                item
            )
            .filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const filteredFoods = foodData.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase())
    );

    return(
        <>
        <nav className="navbar">
            <h1>
                🍔 FoodieHub
            </h1>
            
            <input 
                type="text" 
                placeholder="Seacrh food..."
                className="search-box"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />

            <div className="cart-container">
                <button className="cart-button" onClick={() => setShowCart(!showCart)}>
                    🛒 {cartItems.reduce((total,item)=>total+item.quantity,0)}
                </button>
                
                {
                    showCart && (
                        <CartSidebar
                            cartItems={cartItems}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            clearCart={clearCart}
                        />

                    )
                }

            </div>

        </nav>

        {
            message && (
                <div className="notification">
                    {message}
                </div>
            )
        }

        <MenuGrid foods={filteredFoods} addToCart={addToCart}/>
        
        </>
    );
}
export default App;
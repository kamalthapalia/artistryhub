import React, {useEffect, useState} from 'react';
import {IoPricetags} from 'react-icons/io5';
import {LiaPaintBrushSolid} from 'react-icons/lia';
import {FaRegUser} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import CartCard from './CartCard';
import {toast} from "react-toastify";
import {type} from "@testing-library/user-event/dist/type";
import route from "../utils/help";

function Cart({user}) {
    const [cartItems, setCartItems] = useState([]);
    const [grossTotal, setGrossTotal] = useState(0);
    const [netTotal, setNetTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");


    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    useEffect(() => {
        document.title = 'Cart';
        // Calculate gross total
        const total = cartItems.reduce((acc, item) => acc + item.price, 0);
        setGrossTotal(total);

        // Calculate net total
        setNetTotal(total);
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const removeFromCart = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    function isValidPhoneNumber(phone) {
        const phoneRegex = /^\d{10,}$/; // Match 10 or more digits
        return phoneRegex.test(phone);
    }

    function isValidAddress(address) {
        return address.trim() !== '';
    }

    async function handleCheckout() {
        if (!isValidAddress(address)) {
            toast('Please provide a valid address.');
            return;
        }

        if (!isValidPhoneNumber(phone)) {
            toast('Please provide a valid phone number.');
            return;
        }
        try {
            const res = await fetch(`${route}/orders/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    address: address,
                    phone: phone,
                    total: netTotal
                })
            });

            if (!res.ok) {
                throw new Error('Failed to add order');
            }

            const orderData = await res.json();

            if (orderData?.id > 1) {
                await Promise.all(cartItems.map(async (item) => {
                    const itemRes = await fetch(`${route}/orderItems/add`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            order_id: orderData.id,
                            artwork_id: item.id
                        })
                    });

                    if (!itemRes.ok) {
                        throw new Error('Failed to add order item');
                    }

                    return itemRes.json();
                }));
            }

            toast(`Order Placed Successfully.`);
            localStorage.removeItem('cartItems');
            window.location.href = '/me';
        } catch (error) {
            console.error('Error handling checkout:', error.message);
            // Handle error silently or display an error message to the user
        }
    }

    return (
        <div className={`min-h-[750px]`}>
            {!cartItems.length > 0 && <div className={`h-[700px] text-2xl flex justify-center items-center`}>
                Cart Empty.
            </div>}
            {cartItems.length > 0 && <>
                <p className="text-2xl font-semibold py-3">Cart</p>
                <div className="grid md:grid-cols-2">
                    <div className="flex flex-col gap-4">
                        {cartItems.map((item, index) => (
                            <CartCard item={item} key={index} removeFromCart={removeFromCart}/>
                        ))}
                    </div>
                    <div className="md:text-right py-8 flex flex-col max-h-[750px] min-h-[130px]">
                        <p>
                            Gross Total: <span className="font-semibold">Rs.{grossTotal}</span>
                        </p>
                        <p className="mt-auto text-xl font-semibold">Net total: Rs.{netTotal}</p>

                    </div>
                </div>
                <div className={`md:my-10 my-5 flex flex-col gap-4`}>
                    <p className={`font-semibold`}>Customer: {user?.username}</p>
                    <div className={`flex flex-col gap-4`}>
                        <div className="flex flex-col">
                            <label htmlFor="address" className="font-semibold">
                                Address
                            </label>
                            <input
                                onChange={(e) => setAddress(e.target.value)}
                                className="outline-none border-b border-gray-400 w-full"
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Enter your address"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone" className="font-semibold">
                                Phone
                            </label>
                            <input
                                onChange={(e) => setPhone(e.target.value)}
                                className="outline-none border-b border-gray-400 w-full"
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleCheckout}
                    className={`border-2 w-full  border-rose-500 py-1.5 rounded-2xl font-bold text-rose-500 hover:bg-rose-100 transition`}>Checkout
                </button>
            </>}
        </div>
    );
}

export default Cart;

import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import Ordercard from "./Ordercard";
import route from "../utils/help";

function Orderpage({user}) {
    const [orders, setOrders] = React.useState([{}]);
    const {id} = useParams();

    //fetch my orders
    async function getOrders() {
        try {
            //fetch with header token
            const res = await fetch(`${route}/orders/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            const data = await res.json();
            setOrders(data)
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    async function cancelorder() {
        try {
            //fetch with header token
            const res = await fetch(`${route}/orders/cancel/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (res.ok) {
                window.location.href = '/me';
            }

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    useEffect(() => {
        // Fetch my orders
        getOrders();
    }, []);

    useEffect(() => {
        if (orders && orders.order_items?.length < 1) {
            cancelorder();
        }
    }, [orders]);


    return (
        <div className={`py-8`}>
            <p className={`text-2xl font-medium my-5`}>Order details</p>
            <p className={`font-medium`}>Customer: {user?.username}</p>
            <p className={`font-medium`}>Ordered
                in: {orders?.order_date ? orders.order_date.split('T')[0] : 'No date available'}</p>
            <p className={`font-medium`}>Total: Rs.{orders?.total}</p>
            <div className={`grid md:grid-cols-3 sm:grid-cols-2 gap-10 my-10`}>
                {orders?.order_items?.map((order) => (
                    <Ordercard key={order.id} order={order}/>
                ))}
            </div>
            <button
                className={`border-2 w-full border-rose-500 mt-12 py-1.5 rounded-2xl font-bold text-rose-500 hover:bg-rose-100 transition`}
                onClick={cancelorder}>Cancel Order
            </button>
        </div>
    );
}

export default Orderpage;
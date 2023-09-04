import "./Product.css";
import { useState } from "react";
import axios from "axios";
import img from "../../assets/img.jpg"
import {initMercadoPago, Wallet} from '@mercadopago/sdk-react'

export const Product = () => {
    const  [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago("You_PUBLIC_KEY");
    const createPreference = async ()=>{
    try{
    
        const responce = await axios.post("http://localhost:8080/create_preference",{
            description: "Bananita contenta",
            price: 100,
            quantity: 1,
        });
        const {id} = responce.data;
        return id;
    } catch (error) {
        console.log(error);
    }
    };
    const handleBuy = async()=>{
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
    };

    return (
        <div className="card-product-container">
            <div className="card-product">
                <div className="card">
                    <img src={img} alt="product Image" />
                    <h2>Bananita contenta</h2>
                    <p className="price">100$</p>
                    <button onClick={handleBuy}>
                        Buy
                    </button>
                    {preferenceId && <Wallet initMercadoPago={{preferenceId
                    :"<PREFERENCE_ID>"}}/> }

                </div>
            </div>
        </div>
    )
}




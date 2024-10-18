import { useState } from "react"
import axios from "axios";
export default function Publish(){
    const [product, setProduct] = useState({});
    const publishProduct = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/products", product)
        setProduct({
            name: "",
            price: "",
            imageUrl: "",
            description: ""
        });
    }

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold p-5">Publish your product</h1>
            <form className="flex flex-col w-96" onSubmit={publishProduct}>
                <input 
                    type="text"
                    value={product.name}
                    placeholder="Product Name" 
                    className="border-2 border-gray-300 rounded-md p-2 my-2"
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
                <input 
                    type="text"
                    value={product.price}
                    placeholder="Product Price" 
                    className="border-2 border-gray-300 rounded-md p-2 my-2"
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                />
                <input 
                    type="text" 
                    value={product.imageUrl}
                    placeholder="Product Image URL" 
                    className="border-2 border-gray-300 rounded-md p-2 my-2"
                    onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
                />
                <textarea 
                    type="text" 
                    value={product.description}
                    placeholder="Product Description" 
                    className="border-2 border-gray-300 rounded-md p-2 my-2"
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded-md my-2">Publish</button>
            </form>
        </div>
    )
}
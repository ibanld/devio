import React, { useState, useEffect } from 'react'
import API from '../../utils/axiosUrl'
import ProductSearch from './ProductSearch'
import { Button } from 'semantic-ui-react'

export default function AddProduct({ order }) {
    const [showProducts, setShowProducts] = useState(false)
    const [products, setProducts] = useState([])

    const loadProducts = async () => {
        try {
            const getProducts = await API.get('/products')
            if (getProducts){
                setProducts(getProducts.data.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        loadProducts()        
    }, [])

    return (
        <>
            {showProducts &&
                <ProductSearch products={products} order={order} />
            }
            <Button 
                type="button"
                fluid
                positive
                icon="add circle"
                content="Fazer Pedido"
                onClick={ ()=> setShowProducts(!showProducts) }
                attached="bottom"
            />
        </>
    )
}

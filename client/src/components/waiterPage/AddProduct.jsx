import React, { useState, useEffect } from 'react'
import API from '../../utils/axiosUrl'
import requestRefresh from '../../utils/socketUpdate'
import ProductSearch from './ProductSearch'
import MostSoldList from './MostSoldList'
import { Divider } from 'semantic-ui-react'

export default function AddProduct({ order }) {
    const [products, setProducts] = useState([])

    // Load products from API products endpoint
    const loadProducts = async () => {
        try {
            const getProducts = await API.get('/products')
            if (getProducts){
                requestRefresh()
                setProducts(getProducts.data.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    // Call function to load products on component mount
    useEffect(() => {
        loadProducts()        
    }, [])

    return (
        <>
            <ProductSearch products={products} order={order} />
            <Divider />
            <MostSoldList products={products} order={order} />
        </>
    )
}

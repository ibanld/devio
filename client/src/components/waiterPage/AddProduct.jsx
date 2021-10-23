import React, { useState, useEffect } from 'react'
import API from '../../utils/axiosUrl'
import requestUpdate from '../../utils/socketUpdate'
import ProductSearch from './ProductSearch'
import MostSoldList from './MostSoldList'
import { Divider } from 'semantic-ui-react'

export default function AddProduct({ order }) {
    const [products, setProducts] = useState([])

    const loadProducts = async () => {
        try {
            const getProducts = await API.get('/products')
            if (getProducts){
                requestUpdate()
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
            <ProductSearch products={products} order={order} />
            <Divider />
            <MostSoldList products={products} />
        </>
    )
}

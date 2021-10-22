import React, { useState } from 'react'
import API from '../../utils/axiosUrl'
import { Input, Label } from 'semantic-ui-react'
import ProductConfirmModal from './ProductConfirmModal'
import getColor from '../../utils/getColor'

export default function ProductSearch({ products, order }) {
    const [selectedProduct, setSelectedProduct] = useState({})
    const [searchedProducts, setSearchedProducts] = useState([])
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [open, setOpen] = useState(false)

    const handleSearch = e => {
        setLoadingSearch(true)
        if (e.target.value.length >= 3) {
            const findProducts = products.filter( product => product.item.includes(e.target.value) || product.ref.toLowerCase().includes(e.target.value.toLowerCase()))
            if (findProducts.length > 0) {
                setSearchedProducts(findProducts)
            }
        } else if(e.target.value.length < 1) {
            setSearchedProducts([])
            setLoadingSearch(false)
        }
    }

    const handleOpenModal = product => {
        setSelectedProduct(product)
        setOpen(true)
    }

    const handleAddProduct = async () => {
        try {
            const putIntoOrder = {
                type: 'ADD_PRODUCT',
                product: {...selectedProduct, ready: false}
            }
            if (selectedProduct.qty > 0){
                const putOrder = await API.put(`/orders/${order._id}`, putIntoOrder)
                if (putOrder) {
                    setSelectedProduct({})
                }
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
        <div>
            <Input 
                fluid
                min="1"
                icon="search"
                placeholder="Digite o código ou nome"
                iconPosition="left"
                loading={loadingSearch}
                type="search"
                onChange={e => handleSearch(e)}
            />
            {searchedProducts.length < 0 && searchedProducts.map( product => 
                <Label 
                    style={{cursor: 'pointer'}}
                    key={product._id}
                    onClick={ ()=> handleOpenModal(product)}
                    icon="add"
                    content={product.item}
                    detail={`R$ ${product.price}`}
                    color={getColor(product.family)}
                />
                )
            }
        </div>
        <ProductConfirmModal 
            open={open} 
            setOpen={setOpen} 
            selectedProduct={selectedProduct} 
            setSelectedProduct={setSelectedProduct} 
            handleAddProduct={handleAddProduct} 
        />
        </>
    )
}

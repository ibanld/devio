import React, { useState, useEffect } from 'react'
import API from '../utils/axiosUrl'
import { Container, Divider, Header, Menu, Button, Input, Table, Form } from 'semantic-ui-react'
import { useDispatchAlert } from '../context/alertsContenxt'

const ProductsList = ({ products, setReload }) => {
    const [addProduct, setAddProduct] = useState(false)
    const [productForm, setProductForm] = useState({
        ref: '',
        family: '',
        item: '',
        price: 0,
        sold: 0
    })
    const dispatchAlert = useDispatchAlert()

    const handleChange = e => {
        setProductForm({
            ...productForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const newProduct = await API.post('/products/', productForm)
            if (newProduct) {
                setReload(true)
                dispatchAlert({
                    type: 'SHOW_ALERT',
                    payload: {
                        icon:'thumbs up',
                        header: 'Produto Adicionado',
                        content: `${productForm.item} foi adicionado ao cardapio`,
                        positive: true
                    }
                })
                setTimeout( ()=> dispatchAlert({type:'HIDE_ALERT'}) , 3000)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelProduct = async id => {
        try {
            const delProd = await API.delete(`/products/${id}`)
            if (delProd) {
                setReload(true)
                dispatchAlert({
                    type: 'SHOW_ALERT',
                    payload: {
                        icon:'trash',
                        header: 'Produto Excluido',
                        content: `O produto foi exlcuido do cardapio`,
                        positive: false
                    }
                })
                setTimeout( ()=> dispatchAlert({type:'HIDE_ALERT'}) , 3000)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Button compact fluid icon="add" color="teal" content="Adicionar Produto no Cardápio" onClick={()=> setAddProduct(!addProduct)} />
            {addProduct ? 
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group>
                        <Form.Input 
                            type="text"
                            label="Referencia" 
                            placeholder="Digite referencia do produto" 
                            value={productForm.ref}
                            name="ref"
                            onChange={ e => handleChange(e)}
                            required
                        />
                        <Form.Input 
                            type="text"
                            label="Produto" 
                            placeholder="Digite nome do produto" 
                            value={productForm.item}
                            name="item"
                            onChange={ e => handleChange(e)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <select required name="family" value={productForm.family} onChange={ e => setProductForm({...productForm, family: e.target.value})}>
                            <option disabled>Selecione Familia do produto</option>
                            <option value="pizzas">Pizzas</option>
                            <option value="massas">Massas</option>
                            <option value="sobremesas">Sobremesas</option>
                            <option value="bebidas">Bebidass</option>
                        </select>
                        <Input 
                            type="number"
                            label="R$"
                            placeholder="Digite o preço"
                            value={productForm.price}
                            name="price"
                            onChange={ e => handleChange(e)}
                            required
                        />
                    </Form.Group>
                    <Form.Button type="submit" icon="add" content="Adicionar Produto" positive compact fluid />
                </Form> : <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Referencia</Table.HeaderCell>
                            <Table.HeaderCell>Produto</Table.HeaderCell>
                            <Table.HeaderCell>Familia</Table.HeaderCell>
                            <Table.HeaderCell>Preço</Table.HeaderCell>
                            <Table.HeaderCell>Vendidos</Table.HeaderCell>
                            <Table.HeaderCell>Excluir</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                        <Table.Body>
                            {products.length > 0 &&
                                products.map( product => 
                                    <Table.Row key={product._id}>
                                        <Table.Cell>{product.ref}</Table.Cell>
                                        <Table.Cell>{product.item}</Table.Cell>
                                        <Table.Cell>{product.family}</Table.Cell>
                                        <Table.Cell>{product.price}</Table.Cell>
                                        <Table.Cell>{product.sold}</Table.Cell>
                                        <Table.Cell>
                                            <Button negative circular compact icon="trash" onClick={ ()=> handleDelProduct(product._id)} />
                                        </Table.Cell>
                                    </Table.Row>
                                    )
                            }
                        </Table.Body>
                </Table>
            }
        </>
    )
}

const UsersList = () => {
    return (
        <>
        </>
    )
}

function AdminPage({ setTables }) {
    const [activeItem, setActiveItem] = useState('menu')
    const [thisTables, setThisTables] = useState(0)
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)
    const dispatchAlert = useDispatchAlert()

    const handleSaveTables = () => {
        setTables(thisTables)
        dispatchAlert({
            type: 'SHOW_ALERT',
            payload: {
                icon:'info circle',
                header: 'Mesas Atualizadas',
                content: `Mesas disponivels para hoje ${thisTables}`,
                positive: true
            }
        })
        setTimeout( ()=> dispatchAlert({type:'HIDE_ALERT'}) , 3000)
    }

    const loadUsers = async () => {
        try {
            const getUsers = await API.get('/users')
            if (getUsers) {
                setUsers(getUsers.data.data)
            }
        } catch (err) {
            console.error(err)
        }
    }
    
    const loadProducts = async () => {
        try {
            const getProducts = await API.get('/products')
            if (getProducts) {
                setProducts(getProducts.data.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect( ()=> loadUsers() ,[users, reload])
    useEffect( ()=> loadProducts() ,[products, reload])

    return (
        <Container fluid>
            <Header as="h5">Menu de administração</Header>
            <Divider />
            <div>
                <Menu attached="top" tabular>
                    <Menu.Item 
                        name='Cardápio'
                        active={activeItem === 'menu'}
                        onClick={ ()=> setActiveItem('menu')}
                    />
                    <Menu.Item 
                        name='Empleados'
                        active={activeItem === 'employees'}
                        onClick={ ()=> setActiveItem('employees')}
                    />
                    <Menu.Item 
                        name='Mesas'
                        active={activeItem === 'tables'}
                        onClick={ ()=> setActiveItem('tables')}
                    />
                </Menu>
            </div>
            {activeItem === 'menu' && <ProductsList products={products} setReload={setReload} />}
            {activeItem === 'employees' && <UsersList users={users} />}
            {activeItem === 'tables' && 
                <>
                    <Input 
                        type="number"
                        name="Tables"
                        label="Mesas"
                        value={thisTables}
                        placeholder="Digite numero de mesas"
                        fluid
                        onChange={ (e)=> setThisTables(e.target.value)}
                    />
                    <Button
                    positive
                    fluid
                    icon=""
                    content="Salvar quantidade de mesas"
                    onClick={handleSaveTables}
                    />
                </>
            }
        </Container>
    )
}

export default AdminPage

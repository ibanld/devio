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
                setProductForm({
                    ref: '',
                    family: '',
                    item: '',
                    price: 0,
                    sold: 0
                })
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
            <Button compact fluid icon="add circle" color="teal" content="Adicionar Produto no Cardápio" onClick={()=> setAddProduct(!addProduct)} />
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

const UsersList = ({ users, setReload }) => {
    const [addUser, setAddUser] = useState(false)
    const [edit, setEdit] = useState(false)
    const [userForm, setUserForm] = useState({
        user: '',
        password: '',
        fullName: '',
        role: ''
    })

    const getRole = role => {
        switch (role) {
            case 'room':
                return 'Sala'
            case 'kitchen':
                return 'Cozinha'
            case 'admin':
                return 'Gerencia'
            default:
                return ''
        }
    }

    const dispatchAlert = useDispatchAlert()

    const handleChange = e => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = user => {
        setEdit(true)
        setUserForm(user)
        setAddUser(true)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (edit) {
                const updateUser = await API.put(`/users/${userForm._id}`, userForm)
                if (updateUser) {
                    setReload(true)
                    setEdit(false)
                    setUserForm({
                        user: '',
                        password: '',
                        fullName: '',
                        role: ''
                    })
                    dispatchAlert({
                        type: 'SHOW_ALERT',
                        payload: {
                            icon:'thumbs up',
                            header: 'Usuario Atualizado',
                            content: `${userForm.fullName} foi atualizado no Sistema`,
                            positive: true
                        }
                    })
                    setTimeout( ()=> dispatchAlert({type:'HIDE_ALERT'}) , 3000)
                }
            } else {
                const saveUser = await API.post('/users', userForm)
                if (saveUser) {
                    setReload(true)
                    setUserForm({
                        user: '',
                        password: '',
                        fullName: '',
                        role: ''
                    })
                    dispatchAlert({
                        type: 'SHOW_ALERT',
                        payload: {
                            icon:'thumbs up',
                            header: 'Usuario Adicionado',
                            content: `${userForm.fullName} foi adicionado ao Sistema`,
                            positive: true
                        }
                    })
                    setTimeout( ()=> dispatchAlert({type:'HIDE_ALERT'}) , 3000)
                }
            }
        } catch (err) {
            console.error(err)
        }
    }
    const handleDelUser = async id => {
        try {
            const delUser = await API.delete(`/users/${id}`)
            if (delUser) {
                setReload(true)
                dispatchAlert({
                    type: 'SHOW_ALERT',
                    payload: {
                        icon:'trash',
                        header: 'Usuário Excluido',
                        content: `O usuário foi exlcuido do sistema`,
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
        <Button color="teal" fluid icon="add circle" compact type="button" content="Adicionar Usuario" onClick={ ()=> setAddUser(!addUser) } />
            {addUser ? 
            <Form onSubmit={ e => handleSubmit(e)}>
                <Form.Group>
                    <Form.Input label="Usuario" placeholder="Digite o usuário" value={userForm.user} name="user" required onChange={e => handleChange(e) } />
                    <Form.Input label="Nome" placeholder="Digite o nome completo" value={userForm.fullName} name="fullName" required onChange={e => handleChange(e) } />
                </Form.Group>
                <Form.Group>
                    {!edit && 
                        <Form.Input label="Senha" placeholder="Digite a senha para novo Usuàrio" value={userForm.password} name="password" required onChange={e => handleChange(e) } />
                    }
                    <select required name="family" value={userForm.role} onChange={ e => setUserForm({...userForm, role: e.target.value})}>
                        <option value="room">Sala</option>
                        <option value="kitchen">Cozinha</option>
                        <option value="admin">Gerencia</option>
                    </select>
                </Form.Group>
                <Form.Button type="submit" positive fluid icon={edit ? 'redo' : 'send'} content={edit ? 'Atualizar Usuario' : 'Adicionar Usuario'} />
            </Form>
            : 
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Usuário</Table.HeaderCell>
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                        <Table.HeaderCell>Emprego</Table.HeaderCell>
                        <Table.HeaderCell>Açoes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.length > 0 && 
                    users.map( user => 
                        <Table.Row key={user._id}>
                            <Table.Cell>{user.user}</Table.Cell>
                            <Table.Cell>{user.fullName}</Table.Cell>
                            <Table.Cell>{getRole(user.role)}</Table.Cell>
                            <Table.Cell>
                                <Button circular color="blue" icon="edit" compact onClick={ ()=> handleEdit(user)}/>
                                <Button circular color="red" icon="trash" compact onClick={ ()=> handleDelUser(user._id)}/>
                            </Table.Cell>
                        </Table.Row>        
                    )}
                </Table.Body>
            </Table>
            }
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
            {activeItem === 'employees' && <UsersList users={users} setReload={setReload} />}
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

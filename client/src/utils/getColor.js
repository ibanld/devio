const getColor = (family) => {
    switch (family) {
        case 'pizzas':
            return 'green'    
        case 'bebidas':
            return 'teal'
        case 'massas':
            return 'orange'
        case 'sobremesas':
            return 'purple'
        default:
            return 'brown'
    }
}

export default getColor
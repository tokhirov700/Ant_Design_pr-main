import { useState, useEffect } from 'react'
import { ProductTable } from '../../components'
import { products } from '../../service'

const Index = () => {
    const [productData, setProductData] = useState([])

    const createProduct = async () => {
        const res = await products.read()
        if (res.status === 200) {
            setProductData(res.data.data.products)
        }
    }

    useEffect(() => {
        createProduct()
    }, [])

    return (
        <div>
            <ProductTable productData={productData} />
        </div>
    )
}

export default Index

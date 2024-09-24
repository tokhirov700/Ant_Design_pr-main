import https from "./config";

const products={
    create: (data)=> https.post('/product/create', data),
    read: (data)=> https.get('/product/search', data),
    update: (id, data)=> https.patch(`/product/update/${id}`, data),
    delete: (id)=> https.delete(`/product/delete/${id}`)
}

export default products
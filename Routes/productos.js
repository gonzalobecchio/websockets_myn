import express from 'express'
import { faker } from '@faker-js/faker';

const { Router }  = express

const productos = Router()
const dirFiles = 'Uploads'


productos.post('/productos', (req, res) => {
    const { body } = req
    // console.log(body.length)
    res.render('listadoProductos', {
        productos: body,
        message: body.length !== 0 ? null : 'Sin Datos',
    })
})

productos.post('/chat', (req, res) => {
    const { body} = req
    console.log(body)
    res.render('listadoChat',{
        messages: body
    })
})

productos.get('/productos-test', (req, res) => {
    const qty = 5
    let dates  = []
    for (let i = 0; i < qty; i++) {
        const producto = {
            name: faker.commerce.productName(), 
            price: faker.commerce.price(),
            picture: faker.image.technics(),
        }
        dates.push(producto)
    }
    res.status(200).send(dates)
})

export { productos }
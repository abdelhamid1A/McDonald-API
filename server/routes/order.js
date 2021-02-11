var express = require('express');
var router = express.Router();
require('express-async-errors');
const Order = require('../model/Order')
const Client = require('../model/Client')
const Product = require('../model/Product')
const mongoose = require('mongoose');
const PDFDocument = require("pdfkit");
const fs = require("fs");

// import {hello} from '../model/Method.js';
const { getTime, exportPdf, randomCode, getPoints, tableReserved } = require('../model/Method');
const { find } = require('../model/Order');

router.post('/addClient', (req, res) => {
    const client = new Client({
        code: req.body.code,
        points: req.body.points
    })
    client.save()
        .then(doc => {
            res.send(doc)
        })
        .catch(err => {
            console.log(err)
        })
})

// get points by client
router.get('/getPoints/:code', (req, res) => {
    Client.findOne({ code: req.params.code })
        .then(doc => {
            res.send(doc)
        })
        .catch(err => {
            console.log(err)
        })
})

// add order 
router.get('/getPrice/:id', (req, res) => {
    Product.findById({ _id: req.params.id })
        .select('productPrice')
        .then(doc => {
            var price = doc.productPrice
            // var total = price *req.body.
            res.status(200).json({ price: price })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/setOrder', (req, res) => {
    console.log(req.body);
    Product.findById({ _id: req.body.id })
        // .select('productPrice')
        .then(async doc => {

            var price = doc.productPrice;
            var usePoints = req.body.usePoints;
            let qte = req.body.qte
            var total = (price * qte);
            var lastPrice = total - usePoints
            console.log(total);
            var pts = getPoints(total) - usePoints
            // var restPoints = pts-usePoints
            console.log(pts);
            // console.log(restPoints);
            const order = new Order({
                productName: doc.productName,
                productPrice: doc.productPrice,
                productQte: qte,
                tableNumber: req.body.tableSelect,

            })
            await order.save()

            // var code = req.body.code
            if (req.body.code) {
                var findClient = await Client.findOne({ code: req.body.code })

                if (findClient) {
                    Client.findOneAndUpdate({ code: req.body.code }, { $inc: { points: pts } }, { new: true })
                        .then(client => {
                            exportPdf(doc.productName, req.body.tableSelect, client.code, client.points, lastPrice)
                            tableReserved(req.body.tableSelect)
                            res.status(200).json({ client: client })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } else {
                    const cli = new Client({
                        code: randomCode(1, 9999),
                        points: getPoints(total)
                    })
                    cli.save()
                        .then(MyNewClient => {
                            tableReserved(req.body.tableSelect)
                            exportPdf(doc.productName, req.body.tableSelect, MyNewClient.code, MyNewClient.points, lastPrice)
                            res.status(200).json({
                                message: "file exported",
                            });
                            // res.status(200).json({ MyNewClient: MyNewClient })
                        }).catch(err => {
                            console.log(err)
                        })
                }
                

            } else {
                const cli = new Client({
                    code: randomCode(1, 9999),
                    points: getPoints(total)
                })
                cli.save()
                    .then(MyNewClient => {
                        tableReserved(req.body.tableSelect)
                        exportPdf(doc.productName, req.body.tableSelect, MyNewClient.code, MyNewClient.points, lastPrice)
                        res.status(200).json({
                            message: "file exported",
                        });
                        // res.status(200).json({ MyNewClient: MyNewClient })
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })


        .catch(err => {
            console.log(err)
        })
})

// console.log(randomCode(1, 9999));


module.exports = router
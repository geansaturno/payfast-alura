let express = require('../config/express.js')();
let supertest = require('supertest')(express);
let testhelpers = require('./helpers');
let pagamento = require('../files/pagamentoCartao.json');

describe('Pagamento com Cartao', () => {

    describe("#Add Pagamento", () => {

        it('#Add', done => {

            supertest.post('/pagamento')
                .send(pagamento)
                .expect('Content-type', /json/)
                .expect(201)
                .end((erro, res) => {
                    if (erro) {
                        done(erro);
                    } else {
                        console.log(res.body);
                        
                        pagamento.location = res.header.location;
                        testhelpers.verifySuccessReturn(res);

                        testhelpers.hasField(res.body.data, 'pagamento', "Não há o campo pagamento na resposta do servidor")
                        testhelpers.hasField(res.body.data, 'cartao', "Não há o campo cartao na resposta do servidor", done)
                    }
                });
        })

        it.skip('#Add incorreto', done => {

            pagamento.pagamento.valor = '30o';

            supertest.post('/pagamento')
                .send(pagamento)
                .expect('Content-type', /json/)
                .expect(res => {
                    testhelpers.hasField(res.body, 'pagamento.valor', 'Não há erro no retorno');
                })
                .expect(400, done);
        })

        it('#Add cartão incorreto', done => {
            let pagamentoErrado = pagamento;

            pagamentoErrado.cartao.numero = '5555';
            pagamentoErrado.cartao.cvv = '5555';

            supertest.post('/pagamento')
                .send(pagamentoErrado)
                .expect('Content-type', /json/)
                .expect(400)
                .expect(res => {
                    testhelpers.hasField(res.body, 'cartao', "Não há erro no cartao")
                })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        testhelpers.verifyValidationReturn(res, done);
                    }
                });
        });

        it.skip('#Add sem forma de pagamento', done => {

            delete pagamento.pagamento.forma_de_pagamento;
            pagamento.pagamento.valor = '37.50';

            supertest.post('/pagamento')
                .send(pagamento)
                .expect('Content-type', /json/)
                .expect(400)
                .expect(res => {
                    testhelpers.hasField(res.body, 'pagamento.forma_de_pagamento', "Não há erro na forma de pagamento")
                })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        testhelpers.verifyValidationReturn(res, done);
                    }
                });
        });
    });

    describe("#Comfirm Pagamento", () => {

        it('#Comfirm pagamento', done => {

            supertest.put(`/${pagamento.location}`)
                .expect('Content-type', /json/)
                .expect(200)
                .end((err, res) => {
                    testhelpers.verifySuccessReturn(res, done);
                });

        });

        it('#Comfirm pagamento com id incorreto', done => {

            supertest.put('/pagamento/554PPP')
                .expect('Content-type', /json/)
                .expect(res => {
                    testhelpers.hasField(res.body, 'id', "Não há erro no id");
                })
                .expect(400, done);
        });
    });

    describe("#Cancelar pagamento", () => {

        it('#Cancelar pagamento', done => {

            supertest.delete(`/${pagamento.location}`)
                .expect('Content-type', /json/)
                .expect(200)
                .end((err, res) => {
                    testhelpers.verifySuccessReturn(res, done);
                });
        });

        it('#Cancelar pagamento com id incorreto', done => {

            supertest.delete('/pagamento/55ppp')
                .expect('Content-type', /json/)
                .expect(400)
                .end((err, res) => {
                    testhelpers.verifyValidationReturn(res, done);
                });
        });
    })
});
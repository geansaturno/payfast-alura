let express = require('../config/express.js')();
let supertest = require('supertest')(express);

let pagamento = require('../files/pagamento.json');
let pagamentoCartao = require('../files/pagamentoCartao.json');

console.log('Pagamento dinheiro\n' ,pagamento, true);
console.log('Pagamento cartão\n', pagamentoCartao);

describe("#Add Pagamento", () => {

    it('#Add', done => {

        supertest.post('/pagamento')
        .send(pagamento)
        .expect('Content-type', /json/)
        .expect(201)
        .end((erro, res) => {
            if(erro){
                done(erro);
            } else {
                pagamento.location = res.header.location;
                verifySuccessReturn(res, done);
            }
        });
    })

    it('#Add incorreto', done => {

        pagamento.valor = '30o';

        supertest.post('/pagamento')
        .send(pagamento)
        .expect('Content-type', /json/)
        .expect(400, done);
    })

    it('#Add sem forma de pagamento', done => {

        delete pagamento.forma_de_pagamento;

        supertest.post('/pagamento')
        .send(pagamento)
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
            verifyValidationReturn(res, done);
        });
    })

});


describe("#Comfirm Pagamento", () => {

    it('#Comfirm pagamento', done => {

        supertest.put(`/${pagamento.location}`)
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res)=> {
            verifySuccessReturn(res, done);
        });
    });

     it('#Comfirm pagamento com id incorreto', done => {

        supertest.put('/pagamento/554PPP')
        .expect('Content-type', /json/)
        .expect(400, done);
    });

});

describe("#Cancelar pagamento", () => {

    it('#Cancelar pagamento', done => {

        supertest.delete(`/${pagamento.location}`)
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
            verifySuccessReturn(res, done);  
        });
    });

     it('#Cancelar pagamento com id incorreto', done => {

        supertest.delete('/pagamento/55ppp')
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
            verifyValidationReturn(res, done);
        });
    });

});

function verifyValidationReturn(res, done){
    Object.keys(res.body)
    .every((campo) => res.body[campo].msg && res.body[campo].param) 
    ? done() : done("Retorno da validação incorreto");
}

function verifySuccessReturn(res, done){
    if(!res.body.msg && res.body.links && res.body.data) {
        done("Retorno de sucesso incorreto");
    } else {
        done();
    }
}

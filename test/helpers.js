module.exports = {
    hasField(body, field, errorMsg) {
        if (!(field in body)) throw new Error(errorMsg);
    },

    verifyValidationReturn(res, done) {
        Object.keys(res.body)
            .every((campo) => {
                if (!res.body[campo].msg) {
                    console.error(res.body);
                    done(new Error("Retorno com erro não possui mensagem\n params encontrados " + Object.keys(res.body).toString()));
                } else if (!res.body[campo].param) {
                    console.error(res.body);                    
                    done(new Error("Retorno com erro sem param\n params encontrados: " + Object.keys(res.body).toString()));
                } else {
                    done();
                }
            });
    },

    verifySuccessReturn(res, done) {
        if (!res.body.msg && res.body.links && res.body.data) {
            done("Retorno de sucesso incorreto");
        } else {
            done();
        }
    }
}
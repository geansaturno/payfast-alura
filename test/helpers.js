module.exports = app => {

    return class TestHelper {

        hasField(body, field, errorMsg, done = false) {
            let error = null;

            if (!(field in body)) {
                error = new Error(errorMsg);
                doneOrThrowError(done, error);
            }
        }

        verifyValidationReturn(res, done = false) {

            Object.keys(res.body)
                .every((campo) => {
                    let error = null;

                    if (!res.body[campo].msg) {
                        error = new Error("Retorno com erro não possui mensagem\n params encontrados " + Object.keys(res.body).toString());
                        doneOrThrowError(done, error);

                    } else if (!res.body[campo].param) {
                        error = new Error("Retorno com erro sem param\n params encontrados: " + Object.keys(res.body).toString());
                        doneOrThrowError(done, error);

                    } else {
                        if (done) {
                            done();
                        }
                    }
                });
        }

        verifySuccessReturn(res, done = false) {
            let error = null;

            if (!res.body.msg && res.body.links && res.body.data) {
                error = new Error("Retorno de sucesso incorreto");
                doneOrThrowError(done, error);

            } else {
                if (done) {
                    done();
                }
            }
        }

        doneOrThrowError(done, erro) {
            if (done) {
                done(erro);
            } else {
                throw erro;
            }
        }
    }
}
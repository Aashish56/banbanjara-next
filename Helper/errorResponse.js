
// helper function to response error

async function errorResponseHelper({ res, error, defaultMessage = "Error" }) {
    let err = { status: false, error: true, message: defaultMessage };
    if (error.error) err = error;

    let code = error.statusCode || 500;
    return res.status(code).send(err);
}

export default errorResponseHelper;
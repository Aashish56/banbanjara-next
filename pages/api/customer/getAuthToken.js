import { handler } from '../../../middlewares/parser';

 

async function getAuth(req, res) {
    try {
        res.send({ status: true, user: req.session.user });
    }
    catch (e) {
        console.log('getAuth err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Auth" });
    }
}

export default handler(getAuth);
import express from 'express';

const apiRouter = express.Router();
apiRouter.get('/', (req, res) => {
    return res.json('Work Centre server is listening for requests');
});

export default apiRouter;

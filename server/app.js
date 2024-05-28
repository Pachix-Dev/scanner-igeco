import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pkg from 'body-parser';
import {AttendanceModel} from './db.js';

const { json } = pkg
const app = express()
app.use(json())
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = ['http://localhost:5173', 'https://scanner.igeco.mx']

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
}))

const PORT = process.env.PORT || 3002

app.post('/user-check', async (req, res) => {
    const { uuid, action } = req.body;

    if (!uuid || !action) {
        return res.status(400).json({ status: false, message: 'Invalid request' });
      }

    try {        
        const existingAction = await AttendanceModel.getUserActionStatus({uuid, action});
                
        if(existingAction.status){
            return res.json({
                status: true,
                user: existingAction.result,
                message: 'Usuario encontrado'

            });
        }else{
            return res.json({
                status: false,
                message: 'Usuario no encontrado / codigo invalido'
            });
        }        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'Failed to perform user check-in/check-out'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
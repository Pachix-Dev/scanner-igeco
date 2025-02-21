import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pkg from 'body-parser';
import { AttendanceModel } from './db.js';

const { json } = pkg
const app = express()
app.use(json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS.split(',')

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
}))

const PORT = process.env.PORT

const ACTION_HANDLERS = {
  General: ({ uuid, action }) => AttendanceModel.save_acceso_general({ uuid, action }),
  EcoStage: ({ uuid, action }) => AttendanceModel.save_acceso_ecostage({ uuid, action }),
  EcoPitch: ({ uuid, action }) => AttendanceModel.save_acceso_ecopitch({ uuid, action }),
  EnlightenmentArea: ({ uuid, action }) => AttendanceModel.save_acceso_enlightenmentarea({ uuid, action }),
  InnovationArea: ({ uuid, action }) => AttendanceModel.save_acceso_innovationarea({ uuid, action }),
  VIP: ({ uuid, action }) => AttendanceModel.save_acceso_vip({ uuid, action }),
  energyNight: ({ uuid, action }) => AttendanceModel.save_acceso_energynight({ uuid, action }),

  defaultAction: () => Promise.reject(new Error('Acción no válida')),
};


app.post('/accesos-aforo', async (req, res) => {
  const { uuid, action, escenario } = req.body;

  if (!uuid || !action) {
    return res.status(400).json({ status: false, message: 'Invalid request' });
  }

  try {
    const actionFunction = ACTION_HANDLERS[escenario] || ACTION_HANDLERS.defaultAction;
    const response = await actionFunction({ uuid, action });
    console.log(response);

    if (response.status) {
      return res.json({
        status: true,
        user: response?.result,
        message: response.message

      });
    } else {
      return res.json({
        status: false,
        message: response.message
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Failed to perform user check-in/check-out'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
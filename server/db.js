import mysql from 'mysql2/promise';
import 'dotenv/config';

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

export class AttendanceModel {

    static async save_acceso_general({ uuid, action }) {
        const connection = await mysql.createConnection(config);

        try {
            const [resultGral] = await connection.query(' SELECT * FROM users WHERE uuid = ? limit 1', [uuid]);
            const [resultEcom] = await connection.query(' SELECT * FROM users_ecomondo WHERE uuid = ? limit 1', [uuid]);

            const result = resultGral.length > 0 ? resultGral : resultEcom;

            if (result.length > 0) {

                const [checkIns] = await connection.query('INSERT INTO aforo (uuid, action) VALUES (?, ?)', [uuid, action]);

                if (checkIns.affectedRows === 0) {
                    return {
                        status: false,
                        message: 'Error al registrar entrada'
                    }
                }

                return {
                    result: result[0],
                    message: 'Usuario encontrado',
                    status: true
                }
            } else {
                return {
                    status: false,
                    message: 'Usuario no encontrado / codigo invalido'
                };
            }
        } catch (error) {
            console.log(error)
            return {
                status: false,
            }
        } finally {
            await connection.end(); 
        }
    }

    static async save_acceso_ecostage({ uuid, action }) {
        const connection = await mysql.createConnection(config);
        try {
            const [resultGral] = await connection.query(' SELECT * FROM users WHERE uuid = ? limit 1', [uuid]);
            const [resultEcom] = await connection.query(' SELECT * FROM users_ecomondo WHERE uuid = ? limit 1', [uuid]);

            const result = resultGral.length > 0 ? resultGral : resultEcom;

            if (result.length > 0) {
                const [checkIns] = await connection.query('INSERT INTO asistencia_ecostage (uuid, action) VALUES (?, ?)', [uuid, action]);
                if (checkIns.affectedRows === 0) {
                    return {
                        status: false,
                        message: 'Error al registrar entrada'
                    }
                }
                return {
                    result: result[0],
                    message: 'Usuario encontrado',
                    status: true
                }
            } else {
                return {
                    status: false,
                    message: 'Usuario no encontrado / codigo invalido'
                };
            }
        } catch (error) {
            console.log(error)
            return {
                status: false,
            }
        } finally {
            await connection.end(); // Close the connection
        }
    }



}
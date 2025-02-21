import mysql from 'mysql2/promise';
import 'dotenv/config';

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

const productsDates = {
    1: ["2025-03-05", "2025-03-06", "2025-03-07"],
    2: "2025-03-05",
    3: "2025-03-05",
    4: "2025-03-06",
    5: "2025-03-07",
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
            await connection.end();
        }
    }

    static async save_acceso_ecopitch({ uuid, action }) {
        const connection = await mysql.createConnection(config);
        try {
            const [resultGral] = await connection.query(' SELECT * FROM users WHERE uuid = ? limit 1', [uuid]);
            const [resultEcom] = await connection.query(' SELECT * FROM users_ecomondo WHERE uuid = ? limit 1', [uuid]);
            const result = resultGral.length > 0 ? resultGral : resultEcom;
            if (result.length > 0) {
                const [checkIns] = await connection.query('INSERT INTO asistencia_ecopitch (uuid, action) VALUES (?, ?)', [uuid, action]);
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

    static async save_acceso_enlightenmentarea({ uuid, action }) {
        const connection = await mysql.createConnection(config);
        try {
            const [resultGral] = await connection.query(' SELECT * FROM users WHERE uuid = ? limit 1', [uuid]);
            const [resultEcom] = await connection.query(' SELECT * FROM users_ecomondo WHERE uuid = ? limit 1', [uuid]);
            const result = resultGral.length > 0 ? resultGral : resultEcom;
            if (result.length > 0) {
                const [checkIns] = await connection.query('INSERT INTO asistencia_enligtenment (uuid, action) VALUES (?, ?)', [uuid, action]);
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

    static async save_acceso_innovationarea({ uuid, action }) {
        const connection = await mysql.createConnection(config);
        try {
            const [resultGral] = await connection.query(' SELECT * FROM users WHERE uuid = ? limit 1', [uuid]);
            const [resultEcom] = await connection.query(' SELECT * FROM users_ecomondo WHERE uuid = ? limit 1', [uuid]);
            const result = resultGral.length > 0 ? resultGral : resultEcom;
            if (result.length > 0) {
                const [checkIns] = await connection.query('INSERT INTO asistencia_innovation (uuid, action) VALUES (?, ?)', [uuid, action]);
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

    //select COUNT(id) as cant, uuid, action, max(time) as time from asistencia_vip WHERE uuid = 'e3cd9539-81cd-4cc5-b2ea-77f4633cf788' GROUP BY action;
    //select COUNT(id) as cant, uuid, action, max(time) as time from asistencia_vip WHERE uuid = 'e128fb49-43f5-4343-8a1f-d4b726f79b33' GROUP BY action;
    /*  {
            p1: "a7a47931-3f42-4e46-a5b7-21b4c19818cd",
            p2: "c3b0c69d-3a45-4b13-826f-b4f2234be9d2",
            p3: "5cf09674-5dee-4751-b927-cc7ed8d521a7",
            p4: "27db4dc4-15a3-4965-aa95-8d9fc0dcb2aa",
            p5: "",
            ecomondo: "615b9f12-9ca7-49d5-8f85-e3e8af00469c",
            replus: "e3cd9539-81cd-4cc5-b2ea-77f4633cf788"
        }
    select ure.id, ure.user_id, u.uuid, p.id as productId, p.name from users_replus_vip ure 
                            join products p on p.id = ure.id_item 
                            join users u  on u.id = ure.user_id
                            WHERE u.uuid = '5cf09674-5dee-4751-b927-cc7ed8d521a7'
    select COUNT(id) as cant, uuid, action, max(time) as time from asistencia_vip WHERE uuid = 'a7a47931-3f42-4e46-a5b7-21b4c19818cd' GROUP BY action
     */
    static async save_acceso_vip({ uuid, action }) {
        const connection = await mysql.createConnection(config);

        try {
            const [result] = await connection.query(' SELECT * FROM users WHERE uuid = ? limit 1', [uuid]);
            if (result.length > 0) {
                const { id, uuid } = result[0];
                const [checkAction] = await connection.query('select COUNT(id) as cant, uuid, action, max(time) as time from asistencia_vip WHERE uuid = ? GROUP BY action', [uuid]);

                const entrances = checkAction[0] ? checkAction[0].cant : 0;
                const exits = checkAction[1] ? checkAction[1].cant : 0;

                if (action === 'check-in') {
                    if (entrances === exits) {
                        const [checkProduct] = await connection.query(`select ure.id, ure.user_id, u.uuid, p.id as productId, p.name from users_replus_vip ure join products p on p.id = ure.id_item join users u on u.id = ure.user_id WHERE u.uuid = ?`, [uuid]);

                        if (checkProduct.length <= 0) return { status: false, message: 'No tienes este producto' };

                        if (checkProduct.some(product => product.productId === 1)) {

                            const [checkIns] = await connection.query('INSERT INTO asistencia_vip (uuid, action) VALUES (?, ?)', [uuid, action]);
                            if (checkIns.affectedRows > 0) return { status: true, message: 'Acceso VIP: Entrada registrada con éxito' };
                        }
                        else if (checkProduct.some(product => [3, 4, 5].includes(product.productId))) {

                            const date = new Date(2025, 2, 5);
                            const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

                            if (checkProduct.some(product => today.includes(productsDates[product.productId]))) {
                                const [checkIns] = await connection.query('INSERT INTO asistencia_vip (uuid, action) VALUES (?, ?)', [uuid, action]);
                                if (checkIns.affectedRows > 0) return { status: true, message: 'Acceso VIP: Entrada registrada con éxito' };
                            } else {
                                return { status: false, message: 'Fecha de entrada no es válida' };
                            }
                        }
                        return { status: false, message: 'No tienes acceso' };
                    }
                    return {
                        status: false,
                        message: 'Entrada ya registrada. No puedes entrar dos veces'
                    }
                }

                else if (action === 'check-out') {

                    if (entrances <= 0) return {
                        status: false,
                        message: 'Error al registrar salida. Entrada no registrada'
                    }

                    if (entrances === (exits + 1)) {
                        const [checkIns] = await connection.query('INSERT INTO asistencia_vip (uuid, action) VALUES (?, ?)', [uuid, action]);
                        if (checkIns.affectedRows > 0) return { status: true, message: 'Acceso VIP: Salida registrada con éxito' };
                    }

                    return {
                        status: false,
                        message: 'Salida ya registrada. No puedes salir dos veces'
                    }
                }
                else {
                    return {
                        status: false,
                        message: 'Acción no válida'
                    }
                }
            }
            return {
                status: false,
                message: 'Usuario no encontrado',
            }
        } catch (error) {
            console.log(error)
            return {
                status: false,
                message: 'Usuario no encontrado / codigo invalido'
            }
        } finally {
            await connection.end();
        }

    }

    static async save_acceso_energynight({ uuid, action }) {
        const connection = await mysql.createConnection(config);

        try {
            const [result] = await connection.query(' SELECT * FROM users WHERE uuid = ? limit 1', [uuid]);
            if (result.length > 0) {
                const { id, uuid } = result[0];
                const [checkAction] = await connection.query('select COUNT(id) as cant, uuid, action, max(time) as time from asistencia_energynight WHERE uuid = ? GROUP BY action', [uuid]);

                const entrances = checkAction[0] ? checkAction[0].cant : 0;
                const exits = checkAction[1] ? checkAction[1].cant : 0;

                if (action === 'check-in') {
                    if (entrances === exits) {
                        const [checkProduct] = await connection.query(`select ure.id, ure.user_id, u.uuid, p.id as productId, p.name from users_replus_vip ure join products p on p.id = ure.id_item join users u on u.id = ure.user_id WHERE u.uuid = ? AND p.id <= 2 `, [uuid]);

                        if (checkProduct.length <= 0) return { status: false, message: 'No tienes este producto' };

                        const [checkIns] = await connection.query('INSERT INTO asistencia_energynight (uuid, action) VALUES (?, ?)', [uuid, action]);
                        if (checkIns.affectedRows > 0) return { status: true, message: 'Acceso VIP: Entrada registrada con éxito' };
                    }
                    return {
                        status: false,
                        message: 'Entrada ya registrada. No puedes entrar dos veces'
                    }
                }

                else if (action === 'check-out') {

                    if (entrances <= 0) return {
                        status: false,
                        message: 'Error al registrar salida. Entrada no registrada'
                    }

                    if (entrances === (exits + 1)) {
                        const [checkIns] = await connection.query('INSERT INTO asistencia_energynight (uuid, action) VALUES (?, ?)', [uuid, action]);
                        if (checkIns.affectedRows > 0) return { status: true, message: 'Acceso VIP: Salida registrada con éxito' };
                    }

                    return {
                        status: false,
                        message: 'Salida ya registrada. No puedes salir dos veces'
                    }
                }
                else {
                    return {
                        status: false,
                        message: 'Acción no válida'
                    }
                }
            }
            return {
                status: false,
                message: 'Usuario no encontrado',
            }
        } catch (error) {
            console.log(error)
            return {
                status: false,
                message: 'Usuario no encontrado / codigo invalido'
            }
        } finally {
            await connection.end();
        }
    }

}
import mysql from 'mysql2/promise';
import 'dotenv/config';

const db_replus = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const dashboard = mysql.createPool({
    host: process.env.DB_HOST2,
    user: process.env.DB_USER2,
    password: process.env.DB_PASSWORD2,
    database: process.env.DB_NAME2,
});

const productsDates = {
    2: "2025-03-05",
    3: "2025-03-05",
    4: "2025-03-06",
    5: "2025-03-07",
}

export class AttendanceModel {

    static async save_acceso_general({ uuid, action }) {
        try {
            const queries = [
                db_replus.query('SELECT * FROM users WHERE uuid = ? LIMIT 1', [uuid]),
                db_replus.query('SELECT * FROM users_ecomondo WHERE uuid = ? LIMIT 1', [uuid]),
                dashboard.query('SELECT * FROM exhibitors WHERE uuid = ? LIMIT 1', [uuid]),
                dashboard.query('SELECT * FROM ponentes WHERE uuid = ? LIMIT 1', [uuid])
            ];
            
            const results = await Promise.all(queries);
    
            // Extract only the data results (ignoring schema metadata)
            const user = results
                .map(res => res[0])  // Extract only the first element of each query result
                .find(data => data.length > 0); // Find the first non-empty result
    
            if (user && user.length > 0) {
                const [checkIns] = await db_replus.query(
                    'INSERT INTO aforo (uuid, action) VALUES (?, ?)',
                    [uuid, action]
                );
    
                if (checkIns.affectedRows === 0) {
                    return {
                        status: false,
                        message: 'Error al registrar entrada'
                    };
                }
    
                return {
                    result: user[0], // Return the first matched user object
                    message: 'Usuario encontrado',
                    status: true
                };
            } else {
                return {
                    status: false,
                    message: 'Usuario no encontrado / Código inválido'
                };
            }
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: 'Error en el servidor. Intente de nuevo.'
            };
        }
    }
    

    static async save_acceso_ecostage({ uuid, action }) {        
        try {
            const queries = [
                db_replus.query('SELECT * FROM users WHERE uuid = ? LIMIT 1', [uuid]),
                db_replus.query('SELECT * FROM users_ecomondo WHERE uuid = ? LIMIT 1', [uuid]),
                dashboard.query('SELECT * FROM exhibitors WHERE uuid = ? LIMIT 1', [uuid]),
                dashboard.query('SELECT * FROM ponentes WHERE uuid = ? LIMIT 1', [uuid])
            ];
            
            const results = await Promise.all(queries);
    
            // Extract only the data results (ignoring schema metadata)
            const user = results
                .map(res => res[0])  // Extract only the first element of each query result
                .find(data => data.length > 0); // Find the first non-empty result
    
            if (user && user.length > 0) {
                const [checkIns] = await db_replus.query('INSERT INTO asistencia_ecostage (uuid, action) VALUES (?, ?)', [uuid, action]);
                if (checkIns.affectedRows === 0) {
                    return {
                        status: false,
                        message: 'Error al registrar entrada'
                    }
                }
                return {
                    result: user[0],
                    message: 'Usuario encontrado',
                    status: true
                }
            } else {
                return {
                    status: false,
                    message: 'Error en el servidor. Intente de nuevo.'
                };
            }
        } catch (error) {
            console.log(error)
            return {
                status: false,
            }
        }
    }

    static async save_acceso_ecopitch({ uuid, action }) {       
        try {
            const queries = [
                db_replus.query('SELECT * FROM users WHERE uuid = ? LIMIT 1', [uuid]),
                db_replus.query('SELECT * FROM users_ecomondo WHERE uuid = ? LIMIT 1', [uuid]),
                dashboard.query('SELECT * FROM exhibitors WHERE uuid = ? LIMIT 1', [uuid]),
                dashboard.query('SELECT * FROM ponentes WHERE uuid = ? LIMIT 1', [uuid])
            ];
            
            const results = await Promise.all(queries);
    
            // Extract only the data results (ignoring schema metadata)
            const user = results
                .map(res => res[0])  // Extract only the first element of each query result
                .find(data => data.length > 0); // Find the first non-empty result
    
            if (user && user.length > 0) {
                const [checkIns] = await db_replus.query('INSERT INTO asistencia_ecopitch (uuid, action) VALUES (?, ?)', [uuid, action]);
                if (checkIns.affectedRows === 0) {
                    return {
                        status: false,
                        message: 'Error al registrar entrada'
                    }
                }
                return {
                    result: user[0],
                    message: 'Usuario encontrado',
                    status: true
                }
            } else {
                return {
                    status: false,
                    message: 'Error en el servidor. Intente de nuevo.'
                };
            }
        } catch (error) {
            console.log(error)
            return {
                status: false,
            }
        }
    }

    static async save_acceso_enlightenmentarea({ uuid, action }) {
        try {
            const queries = [
                db_replus.query('SELECT * FROM users WHERE uuid = ? LIMIT 1', [uuid]),
                db_replus.query('SELECT * FROM users_ecomondo WHERE uuid = ? LIMIT 1', [uuid]),
                dashboard.query('SELECT * FROM exhibitors WHERE uuid = ? LIMIT 1', [uuid]),
                dashboard.query('SELECT * FROM ponentes WHERE uuid = ? LIMIT 1', [uuid])
            ];
            
            const results = await Promise.all(queries);
    
            // Extract only the data results (ignoring schema metadata)
            const user = results
                .map(res => res[0])  // Extract only the first element of each query result
                .find(data => data.length > 0); // Find the first non-empty result
    
            if (user && user.length > 0) {
                const [checkIns] = await db_replus.query('INSERT INTO asistencia_enligtenment (uuid, action) VALUES (?, ?)', [uuid, action]);
                if (checkIns.affectedRows === 0) {
                    return {
                        status: false,
                        message: 'Error al registrar entrada'
                    }
                }
                return {
                    result: user[0],
                    message: 'Usuario encontrado',
                    status: true
                }
            } else {
                return {
                    status: false,
                    message: 'Error en el servidor. Intente de nuevo.'
                };
            }
        } catch (error) {
            console.log(error)
            return {
                status: false,
            }
        }
    }

    static async save_acceso_innovationarea({ uuid, action }) {        
        try {
            const queries = [
                db_replus.query('SELECT * FROM users WHERE uuid = ? LIMIT 1', [uuid]),
                db_replus.query('SELECT * FROM users_ecomondo WHERE uuid = ? LIMIT 1', [uuid]),
                dashboard.query('SELECT * FROM exhibitors WHERE uuid = ? LIMIT 1', [uuid]),
                dashboard.query('SELECT * FROM ponentes WHERE uuid = ? LIMIT 1', [uuid])
            ];
            
            const results = await Promise.all(queries);
    
            // Extract only the data results (ignoring schema metadata)
            const user = results
                .map(res => res[0])  // Extract only the first element of each query result
                .find(data => data.length > 0); // Find the first non-empty result
    
            if (user && user.length > 0) {
                const [checkIns] = await db_replus.query('INSERT INTO asistencia_innovation (uuid, action) VALUES (?, ?)', [uuid, action]);
                if (checkIns.affectedRows === 0) {
                    return {
                        status: false,
                        message: 'Error al registrar entrada'
                    }
                }
                return {
                    result: user[0],
                    message: 'Usuario encontrado',
                    status: true
                }
            } else {
                return {
                    status: false,
                    message: 'Error en el servidor. Intente de nuevo.'
                };
            }
        } catch (error) {
            console.log(error)
            return {
                status: false,
            }
        }
    }

    static async save_acceso_area_vip({ uuid, action }) {        
        try {
            const queries = [
                db_replus.query('SELECT * FROM users WHERE uuid = ? LIMIT 1', [uuid]),
                db_replus.query('SELECT * FROM users_ecomondo WHERE uuid = ? LIMIT 1', [uuid]),
                dashboard.query('SELECT * FROM exhibitors WHERE uuid = ? LIMIT 1', [uuid]),
                dashboard.query('SELECT * FROM ponentes WHERE uuid = ? LIMIT 1', [uuid])
            ];
            
            const results = await Promise.all(queries);
    
            // Extract only the data results (ignoring schema metadata)
            const user = results
                .map(res => res[0])  // Extract only the first element of each query result
                .find(data => data.length > 0); // Find the first non-empty result
    
            if (user && user.length > 0) {
                const [checkIns] = await db_replus.query('INSERT INTO asistencia_area_vip (uuid, action) VALUES (?, ?)', [uuid, action]);
                if (checkIns.affectedRows === 0) {
                    return {
                        status: false,
                        message: 'Error al registrar entrada'
                    }
                }
                return {
                    result: user[0],
                    message: 'Usuario encontrado',
                    status: true
                }
            } else {
                return {
                    status: false,
                    message: 'Error en el servidor. Intente de nuevo.'
                };
            }
        } catch (error) {
            console.log(error)
            return {
                status: false,
            }
        }
    }

    static async save_acceso_vip({ uuid, action }) {       
        try {
            const [result] = await db_replus.query(' SELECT * FROM users WHERE uuid = ? limit 1', [uuid]);
            if (result.length > 0) {
                const { uuid } = result[0];
                const [checkAction] = await db_replus.query('select COUNT(*) as cant, uuid, action, max(time) as time from asistencia_vip WHERE uuid = ? GROUP BY action', [uuid]);

                const entrances = checkAction[0] ? checkAction[0].cant : 0;
                const exits = checkAction[1] ? checkAction[1].cant : 0;

                if (action === 'check-in') {
                    if (entrances === exits) {
                        const [checkProduct] = await db_replus.query(`select ure.id, ure.user_id, u.uuid, p.id as productId, p.name from users_replus_vip ure join products p on p.id = ure.id_item join users u on u.id = ure.user_id WHERE u.uuid = ?`, [uuid]);

                        if (checkProduct.length === 0) return { status: false, message: 'No tienes este producto' };

                        if (checkProduct.some(product => product.productId === 1)) {

                            const [checkIns] = await db_replus.query('INSERT INTO asistencia_vip (uuid, action) VALUES (?, ?)', [uuid, action]);
                            if (checkIns.affectedRows > 0) return { status: true, message: 'Acceso VIP: Entrada registrada con éxito', result: result[0]  };
                        }
                        else if (checkProduct.some(product => [3, 4, 5].includes(product.productId))) {

                            const date = new Date(2025, 2, 5);
                            const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

                            if (checkProduct.some(product => today.includes(productsDates[product.productId]))) {
                                const [checkIns] = await db_replus.query('INSERT INTO asistencia_vip (uuid, action) VALUES (?, ?)', [uuid, action]);
                                if (checkIns.affectedRows > 0) return { status: true, message: 'Acceso VIP: Entrada registrada con éxito', result: result[0]  };
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

                    if (entrances === (exits + 1)) {
                        const [checkIns] = await db_replus.query('INSERT INTO asistencia_vip (uuid, action) VALUES (?, ?)', [uuid, action]);
                        if (checkIns.affectedRows > 0) return { status: true, message: 'Acceso VIP: Salida registrada con éxito', result: result[0] };
                    }

                    return {
                        status: false,
                        message: 'La salida ya se encuentra registrada'
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
                message: 'Usuario no encontrado / Código inválido',
            }
        } catch (error) {
            console.log(error)
            return {
                status: false,
                message: 'Error en el servidor. Intente de nuevo.'
            }
        }
    }

    static async save_acceso_energynight({ uuid, action }) {       
        try {
            const [result] = await db_replus.query(' SELECT * FROM users WHERE uuid = ? limit 1', [uuid]);
            if (result.length > 0) {
                const { uuid } = result[0];
                const [checkAction] = await db_replus.query('select COUNT(*) as cant, uuid, action, max(time) as time from asistencia_energynight WHERE uuid = ? GROUP BY action', [uuid]);

                const entrances = checkAction[0] ? checkAction[0].cant : 0;
                const exits = checkAction[1] ? checkAction[1].cant : 0;

                if (action === 'check-in') {
                    if (entrances === exits) {
                        const [checkProduct] = await db_replus.query(`select ure.id, ure.user_id, u.uuid, p.id as productId, p.name from users_replus_vip ure join products p on p.id = ure.id_item join users u on u.id = ure.user_id WHERE u.uuid = ? AND p.id <= 2 `, [uuid]);

                        if (checkProduct.length === 0) return { status: false, message: 'No tienes este producto' };

                        const [checkIns] = await db_replus.query('INSERT INTO asistencia_energynight (uuid, action) VALUES (?, ?)', [uuid, action]);
                        if (checkIns.affectedRows > 0) return { status: true, message: 'Acceso VIP: Entrada registrada con éxito', result: result[0]  };
                    }
                    return {
                        status: false,
                        message: 'Entrada ya registrada. No puedes entrar dos veces'
                    }
                }

                else if (action === 'check-out') {

                    if (entrances === (exits + 1)) {
                        const [checkIns] = await db_replus.query('INSERT INTO asistencia_energynight (uuid, action) VALUES (?, ?)', [uuid, action]);
                        if (checkIns.affectedRows > 0) return { status: true, message: 'Acceso VIP: Salida registrada con éxito', result: result[0] };
                    }

                    return {
                        status: false,
                        message: 'La salida ya se encuentra registrada'
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
                message: 'Usuario no encontrado / Código inválido',
            }
        } catch (error) {
            console.log(error)
            return {
                status: false,
                message: 'Error en el servidor. Intente de nuevo.'
            }
        }
    }

}
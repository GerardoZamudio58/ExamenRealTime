
import { Router, Request, Response } from 'express';
import mysql from 'mysql';
import { SERVER_BD, PORT_BD, BD, User_BD, Pass_BD } from '../global/environment';

const router = Router();

const CONNECTION = mysql.createConnection({
    host: SERVER_BD,
    user: User_BD,
    password: Pass_BD,
    database: BD
});


router.get('/Usuarios', ( req: Request, res: Response  ) => {
    CONNECTION.query('SELECT * FROM usuario', function (error, results, fields) {
        if (error) {
            res.status(200);
            res.json({
                ok: false,
                resp: 'Error',
                error
            });
        } else {
            res.status(200);
            res.json({
                ok: true,
                resp: results,
                error
            });
        }
    });
});

router.get('/Usuario/:idUsuario', (req: Request, res: Response) => {

    CONNECTION.query(`SELECT * FROM Usuario WHERE idUsuario = ${ req.params.idUsuario }`, function (error, results, fields) {
        if (error) {
            res.status(200);
            res.json({
                ok: false,
                resp: 'Error',
                error
            });
        } else {
            res.status(200);
            res.json({
                ok: true,
                resp: results[0],
                error
            });
        }
    });

});

router.put('/Usuario/:idUsuario', ( req: Request, res: Response  ) => {

    CONNECTION.query(`UPDATE Usuario SET nombre = '${req.body.nombre}', apPaterno = '${req.body.apPaterno}', apMaterno = '${req.body.apMaterno}', 
        correo = '${req.body.correo}', edad = ${req.body.edad } WHERE idUsuario = ${ req.params.idUsuario };`, function (error, results, fields) {
        if (error) {
            res.status(200);
            res.json({
                ok: false,
                resp: 'Error',
                error
            });
        } else {
            res.status(200);
            res.json({
                ok: true,
                resp: results[0],
                error
            });
        }
    });

});

router.delete('/Usuario/:idUsuario', (req: Request, res: Response) => {

    CONNECTION.query(`DELETE FROM Usuario WHERE idUsuario = ${req.params.idUsuario}`, function (error, results, fields) {
        if (error) {
            res.status(200);
            res.json({
                ok: false,
                resp: 'Error',
                error
            });
        } else {
            res.status(200);
            res.json({
                ok: true,
                resp: results[0],
                error
            });
        }
    });

});


router.post('/Usuario', ( req: Request, res: Response  ) => {

    CONNECTION.query(`INSERT INTO Usuario(nombre, apPaterno, apMaterno, correo, edad) values 
        ('${ req.body.nombre}', '${req.body.apPaterno}', '${req.body.apMaterno}', '${req.body.correo}', ${req.body.edad});`, function (error, results, fields) {
            if (error) {
                res.status(200);
                res.json({
                    ok: false,
                    resp: 'Error',
                    error
                });
            } else {
                res.status(200);
                res.json({
                    ok: true,
                    resp: results[0],
                    error
                });
            }
        });

});



export default router;



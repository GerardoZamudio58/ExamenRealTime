
import { Router, Request, Response } from 'express';
import mysql from 'mysql';
import { SERVER_BD, PORT_BD, BD, User_BD, Pass_BD } from '../global/environment';
import multer from 'multer';
import path from 'path';

const router = Router();

const CONNECTION = mysql.createConnection({
    host: SERVER_BD,
    user: User_BD,
    password: Pass_BD,
    database: BD
});


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Uploads');
    },
    filename: (req: Request, file, cb) => {
        cb(null, `${req.body.nombre}-${file.originalname}`);
    }
});

let upload = multer({
    storage: storage,
    limits: { fileSize: (10 * 1024 * 1024) }
}).single('avatar');

function subirAvatar(req: Request, res: Response, next: Function) {
    upload(req, res, (err) => {
        if (err) {
            res.send({
                ok: false,
                resp: 'Error',
                error: 'El avatar debe ser menor de 10 Mb'
            });
        } else {
            next();
        }
    });
}

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

router.put('/Usuario/:idUsuario', subirAvatar, ( req: Request, res: Response  ) => {
    let avatar = "";
    if (req.file) {
        // console.dir(req.file);
        avatar = `,  foto = '${req.file.filename}' `;
    } 
    CONNECTION.query(`UPDATE Usuario SET nombre = '${req.body.nombre}', apPaterno = '${req.body.apPaterno}', apMaterno = '${req.body.apMaterno}', 
        correo = '${req.body.correo}', edad = ${req.body.edad} ${avatar} WHERE idUsuario = ${ req.params.idUsuario };`, function (error, results, fields) {
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


router.post('/Usuario', subirAvatar, ( req: Request, res: Response  ) => {
    let avatar = "";

    if (req.file) {
        // console.dir(req.file);
        avatar = req.file.filename;
    }

    CONNECTION.query(`INSERT INTO Usuario(nombre, apPaterno, apMaterno, correo, edad, foto) values 
        ('${ req.body.nombre}', '${req.body.apPaterno}', '${req.body.apMaterno}', '${req.body.correo}', ${req.body.edad}, '${avatar}');`, function (error, results, fields) {
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

router.get('/GetAvatar/:avatar', (req: Request, res: Response) => {
    let avatar = req.params.avatar;
    res.sendFile(path.resolve(`./Uploads/${avatar}`));

});


export default router;



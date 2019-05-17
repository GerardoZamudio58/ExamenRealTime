
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
        cb(null, `${ Date.now() }${req.body.nombre}`);
    }
});

let storageParam = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Uploads');
    },
    filename: (req: Request, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

let upload = multer({
    storage: storage,
    limits: { fileSize: (10 * 1024 * 1024) }
}).single('avatar');

let uploadParams = multer({
    storage: storageParam,
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

function subirAvatarPAram(req: Request, res: Response, next: Function) {
    uploadParams(req, res, (err) => {
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
    CONNECTION.query(`select idUsuario, ifnull(nombre, '') as nombre, ifnull(apPaterno, '') as apPaterno, ifnull(apMaterno, '') as apMaterno, ifnull(correo, '') as correo, ifnull(foto, '') as foto, edad from Usuario;`, function (error, results, fields) {
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
    } else if (req.body.avatar) {
        avatar = `,  foto = '${req.body.avatar}' `;
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
    } else {
        avatar = req.body.avatar;
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

router.post('/UploadImg/:avatar', subirAvatarPAram, (req: Request, res: Response) => {
    if (req.file) {
        
        // console.dir(req.file);
        
        res.json({
            ok: true,
            resp: req.file,
            error: null
        });
	} else {
        res.json({
            ok: false,
            resp: req
        });
    }

});


export default router;



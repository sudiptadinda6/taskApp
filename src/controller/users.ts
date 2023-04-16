import { Request, Response } from 'express';
import { TaskStatus, userDataTodoApp } from '../models/userModel';
import multer from 'MULTER';
import path from 'path';
import { parse } from 'csv';
import fs from 'fs';
import { tmpdir } from 'os';


//DETAILES CHEACK ALL

export const getDetailes = async (req: Request, res: Response): Promise<void> => {

    try {
        const myDetalies = await userDataTodoApp.find()
        res.status(200).send(myDetalies)
    } catch (error: any) {
        res.send(error)
    }
}

//DETAILES ACTIVE TASK CHEACK ALL

export const getDetaileActive = async (req: Request, res: Response): Promise<void> => {
    console.log('active task call api')
    try {
        const myDetalies = await userDataTodoApp.find({ status: { $ne: TaskStatus.DELETED } })

        res.send(myDetalies)
    } catch (error: any) {
        res.send(error)
    }
}

//DETAILES CHEACK WITH ID

export const getDataindividual = async (req: Request, res: Response): Promise<void> => {
    console.log(`indivisual api call`)
    try {
        const id: string = req.params.id
        let user
        try {
            user = await userDataTodoApp.findOne({ _id: id })
        } catch (error) {
            res.status(404).send(`task not found`)
            return
        }
        if (user.status === TaskStatus.DELETED) {
            res.status(404).send(`requsted task has  allready delete`)
            return

        }
        res.send(user)
    } catch (error) {
        res.send(`not found data`)
    }
}

//CREATED DETAILES TASKS 

export const dataCreated = async (req: Request, res: Response): Promise<void> => {
    try {
        const result_id = []
        const taskFind = req.body.task
        for (const userValue of taskFind) {
            const user = await userDataTodoApp.find({ name: { $eq: userValue.name } })
            if (user.length) {
                res.send(`task name allready praent`)
                return
            }
            const userimageSaveDb = new userDataTodoApp({
                name: userValue.name,
                description: userValue.description,
                status: userValue.status,
            })
            result_id.push(userimageSaveDb._id)
            await userimageSaveDb.save()
        }
        res.status(201).send(result_id)
    } catch (error: any) {
        res.status(500).send(error.massege)
    }
}

export const dataCreatedindivual = async (req: Request, res: Response): Promise<void> => {
    console.log('api call create')
    try {
        const name = req.body.name
        const description = req.body.description
        const status = TaskStatus.CREATED
        const user = await userDataTodoApp.find({ $and: [{ name: { $eq: name } }, { status: { $ne: TaskStatus.DELETED } }] })
        if (user.length) {
            res.status(409).send({ message: "****Task Name Allready Present" })
            return
        }
        const userimageSaveDb = new userDataTodoApp({
            name: name,
            description: description,
            status: status,

        })
        await userimageSaveDb.save()

        res.status(201).send({ massage: " ***** Task Successfully Create !!! " })
    } catch (error: any) {
        res.status(500).send(error.massege)
    }
}
//TASK UPDATE

export const taskUpdated = async (req: Request, res: Response): Promise<void> => {
    console.log(`update api call`)
    try {
        const id: string = req.params.id
        let user
        try {
            user = await userDataTodoApp.findOne({ _id: id })
        } catch (error) {
            res.status(404).send({ massage: "****Task not found !!!!" })
            return
        }
        if (user.status === TaskStatus.DELETED) {
            res.status(404).send({ massage: "*****Requsted Task has Allready Delete" })

        }
        if (req.body.name) {
            user.name = req.body.name
        }
        if (req.body.description) {
            user.description = req.body.description
        }
        if (req.body.status) {
            user.status = req.body.status

        }
        await user.save()
        res.status(201).json({ massage: " ***** Task Successfully Update !!! " })
    } catch (error: any) {
        res.status(500).send(error.massage)
    }
}

//TASK DEETE API 

export const deletedtask = async (req: Request, res: Response): Promise<void> => {
    console.log('deleted call api')
    try {
        const id: string = req.params.id
        let user
        try {
            user = await userDataTodoApp.findOne({ _id: id })
        } catch (error) {
            res.status(404).send({ massage: " ***** Task Not Found !!! " })
            return
        }
        if (user) {
            user.status = TaskStatus.DELETED,
                user.save()
        }
        res.status(201).send({ massage: " ***** Task Successfully Delete !!! " })
    } catch (error: any) {
        res.status(500).send(error.massage)
    }
}


//UPLOAD MULTER FILES IN EXPRESS SERVER 

const storage = multer.diskStorage({
    destination: tmpdir(),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({ storage: storage }).single('file')



//FILE READ AND DONE WORK IN DATABASE

export const filedatasend = async (req: Request, res: Response): Promise<void> => {
    console.log(`file upload api call `)

    try {
        const namefile = req.file.filename
        const filePath: string = tmpdir() + `/${namefile}`
        const result_id: any = []
        const parser = parse({ columns: false }, async (err, records) => {
            for (const userValue of records) {
                const userimageSaveDb = new userDataTodoApp({
                    name: userValue[0],
                    description: userValue[1],
                    status: userValue[2],
                })
                result_id.push(userimageSaveDb._id)
                await userimageSaveDb.save()
            }
            res.status(201).send({ massage: "Csv_Task Files Successfully Save In Data Base !!! " })
        })
        fs.createReadStream(filePath).pipe(parser).on('end', () => fs.unlinkSync(filePath)).on('error', () => fs.unlinkSync(filePath))

    } catch (error: any) {
        res.send(error.massage)
    }
}




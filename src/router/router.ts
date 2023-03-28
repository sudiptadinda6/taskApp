import { Router } from 'express';
import {
    getDetailes,
    dataCreated,
    getDataindividual,
    deletedtask,
    taskUpdated,
    upload,
    filedatasend,
    getDetaileActive
     } from "../controller/users"

export const router = Router()

router.get('/tasks', getDetailes)

router.post('/tasks', dataCreated)

router.get('/tasks/:id', getDataindividual)

router.put('/tasks/:id', taskUpdated)

router.delete('/tasks/:id', deletedtask)

router.post('/csvfileupload', upload, filedatasend)

router.get('/activetasks', getDetaileActive)


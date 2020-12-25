import express, {Request, Response, Router} from 'express'
import { google } from 'googleapis'

const listEvents = require('../utils/listevents')

import monk from 'monk'

const url = 'localhost:27017/internshala';

const db : any = monk(url);

const router: Router = express.Router()

router.post('/check', async (req: Request, res: Response) => {
    console.log(req.body)
    const {data, id} = req.body
    
    const dbdata = db.get('data')
    dbdata.insert({
        id,
        data
    }, (err : Error, pos: any) => {
        if (err)
            res.send("Error Is here!")
        else 
            res.json("Data Added")
    })

})

router.post('/check1', async (req: Request, res: Response) => {
    const {id} = req.body
    const dbdata = db.get('data')
    dbdata.find({id}, {}, (err: Error, pos: any) => {
        if(err)
            res.json("Error is here!")
        else 
            res.json(pos)
    })
})

module.exports = router;
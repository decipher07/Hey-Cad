import express, {Request, Response, Router} from 'express'
const setCookie = require('../middlewares/setcookie')
const googleUtil = require('../configs/oauthcalendar')
const listEvents = require('../utils/listevents')
import axios from 'axios'

import { google } from 'googleapis'

const router: Router = express.Router()


router.get('/login', (req: Request, res: Response) => {
    res.redirect(googleUtil.urlGoogle());
})

// redirect uri
router.get('/auth/success', setCookie, (req: Request, res: Response) => {
    //@ts-ignore
    if (!(req.session.user as any)){
        res.send("Please Sign In !")
    } else {
        // get oauth2 client
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            // @ts-ignore
            access_token: req.session.user.accessToken
        });
        // @ts-ignore
        const id= req.session.user.id
        
        listEvents(oauth2Client, async (events: Array<Object>) => {  
            // console.log(events);
            const data = {
                // @ts-ignore
                name: req.session.user.name,// @ts-ignore
                displayPicture: req.session.user.displayPicture,// @ts-ignore
                id: req.session.user.id,// @ts-ignore
                email: req.session.user.email,// @ts-ignore
            }
            const arrayfortemps : Array<Object> = []
            events.forEach((event : any) => {
                let count = 0 ;
                if (event.recurringEventId){
                    events.forEach((check : any) => {
                        if (check.recurringEventId == event.recurringEventId){
                            count += 1
                        }
                    })
                }
                // console.log(`The Count of ${event.recurringEventId} is ${count}`)

                const template = {
                    summary: event.summary,
                    creator : event.creator,
                    organizer: event.organizer,
                    start: event.start,
                    end: event.end,
                    recurringEventId: event.recurringEventId,
                    count: count
                }
                arrayfortemps.push(template)
            })

            try {
                await axios.post('http://localhost:5000/check', {
                    data: arrayfortemps, // @ts-ignore
                    id
                })
                .then((res) => {
                    console.log("Done");
                })
                res.redirect('http://localhost:3000/loggedin?id='+data.id+'&name'+data.name)
            } catch (e : any) {
                res.send(e);
            }
        });
    }
})

module.exports = router 

import express, {Request, Response, Router, NextFunction} from 'express'
const googleUtil = require('../configs/oauthcalendar')
// middleware to check and save session cookie
const setCookie = async (req: Request, res: Response, next: NextFunction) => {
    googleUtil.getGoogleAccountFromCode(req.query.code, (err : Error, res: any) => {
        console.log("The Query is : ", req.query)
        if (err) {
            res.redirect('/login');
        } else {
            console.log("The Res in setCookie is : ", res); // @ts-ignore
            req.session.user = res; // @ts-ignore
            console.log("Req user is : ", req.session.user)
        }
        next();
    });
}

module.exports = setCookie;
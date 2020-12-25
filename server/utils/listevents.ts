import { google } from 'googleapis'

module.exports = function listEvents (auth : any, cb: any) {
  
    const calendar = google.calendar({
      version: 'v3',
      auth
    });
  
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 60,
      singleEvents: true,
      orderBy: 'startTime'
    }, (err : any, res: any) => {
      if (err) 
        return console.log('The API returned an error: ' + err);
      
        const events = res.data.items;
        if (events.length) {
          cb(events)
        } else {
          console.log('No upcoming events found.');
        }
  
    });
}
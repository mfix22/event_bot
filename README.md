##Eventer - Slack slash commands for event producers

Made for our student organization, [Transcend](http://transcend.engineering "Transcend"), to help with event coordination/production.

Utilize Slack slash commands to create an event. Type one line into the Slack input box and create a [MailcChimp](http://mailchimp.com/) campaign, embed event information in the email, and optionally send the campaign. 

###Usage
```
/event [title], [location], [date and time], [link], ['send']
```

###Response
![Bot Response](https://github.com/mfix22/event_bot/raw/master/img/response.JPG "Event Bot Response")


###Implementation
Utilizes the following APIs

* ![Slash Commands](https://github.com/mfix22/event_bot/raw/master/img/slack_50.png "Slack Slash Commands") Slash commands by [Slack](https://slack.com "Slack")
* ![Google Calendar API](https://github.com/mfix22/event_bot/raw/master/img/calendar_50.png "Google Calendar API") [Google Calendar API](https://developers.google.com/google-apps/calendar/)

#####Coming Soon
+ [Google Maps](https://developers.google.com/maps/) integration
+ [MapBox](https://www.mapbox.com/developers/) integration for better aesthetics in email




_Made with :coffee: in 24 hours at [HackIllinois](https://www.hackillinois.org/)_
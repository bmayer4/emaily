const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');  //default node module
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('Survey');


module.exports = (app) => {

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
        .select({ recipients: false });

        res.send({surveys: surveys});
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thank you for your feedback!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {

        const p = new Path('/api/surveys/:surveyId/:choice');

        const events = req.body.map(({ email, url }) => {
            const pathname = new URL(url).pathname;
            //console.log(p.test(pathname));  //{ surveyId: '5a72a6b60ab05e17635967e3', choice: 'yes' }    //if the p object can't extract both a surveyId and choice from, then it will return null, this helps us discard records that don't have these
            const match = p.test(pathname);  //match will either be an object or be null
            if (match) {
                return { email: email, surveyId: match.surveyId, choice: match.choice };  //we also need the email from the event object
            }
        });

        const compactEvents = _.compact(events);  //so events array won't contain undefined events
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');  //array will never have records with a duplicate email *AND* surveyId (same email, different surveys is ok)
        console.log('uq', uniqueEvents);

        uniqueEvents.forEach((event) => {
            Survey.updateOne({  //mongo query, and no async because we aren't doing anything after this query, just processing what sendgrid sent us
                _id: event.surveyId,
                recipients: {
                    $elemMatch: { email: event.email, responded: false }
                }
            }, {
                $inc: {[event.choice]: 1 },
                $set: { 'recipients.$.responded': true, dateResponded: new Date() }
            }).exec();
        });

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

        const { title, subject, body, recipients} = req.body;
        
        const survey = new Survey({  
            title, 
            subject, 
            body, 
            recipients: recipients.split(',').map((email) => {  //takes a list of email addresses, split them into an array, and return an object for every email address in there with a property of email and a value of the actual email address
                return { email: email.trim() };
            }),
            _user: req.user.id,   //id is an alias for _id
            dateSent: Date.now()
        });

        //great place to send an email
        //async in front of any function that uses some kind of asynchronous code
        //await in front of any statement that produces a promise
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
          } catch (err) {
            res.status(422).send(err);
          }
  });

};
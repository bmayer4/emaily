const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');


class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {   //desctructuring for first arg
        super();

        //sendgrid requires this all
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);  //first part, recipients is an array of object, each one has a key of email

        this.addContent(this.body);  //register body with Mailer
        this.addClickTracking();  //this is where sendgrid scans our email for links and replaces them with their special link
        this.addRecipients();
    }

    formatAddresses(recipients) {
        const emails = recipients.map(({email}) => {  //destructuring
            return new helper.Email(email);
        });
        return emails;
    };

    addClickTracking() {  //this is how sendgrid works
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    };

    addRecipients() {
        //second part, now we have to take this list of email helper object 
        const personalize = new helper.Personalization();
        this.recipients.forEach((recipient) => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    };

    async send() {
        //send the mailer off to sendgrid
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    };
}

module.exports = Mailer;
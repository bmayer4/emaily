
const validateEmails = (emails) => {
    const invalidEmails = emails.split(',').map(email => email.trim())
    .filter((email) => {
        if (!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                return email
            }
    }).join(", ");  //Join turns it from array to string!

    const backToArray = invalidEmails.split(',');  //invalidEmails will be '' if empty becuase of how I called it
    const emailphrase = backToArray.length === 1 ? 'This email is' : 'These emails are';

    if (invalidEmails.length) {
        return `${emailphrase} invalid: ${invalidEmails}`;
    }

    return;
};

export default validateEmails;


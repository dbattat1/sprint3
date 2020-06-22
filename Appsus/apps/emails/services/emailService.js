import util from '../../../services/utilService.js'
import storageService from '../../../services/storageService.js'

export default {
    query,
    getById,
    remove,
    toggleStar,
    toggleRead,
    toggleTrash,
    createEmail,
    numOfUnread,
    querySearch
}

const gDefaultEmails = [{
    id: util.makeId(),
    subject: 'Your API key has been stolen!!',
    body: 'Don\'t upload your Google Maps API key to GitHub dumbass',
    isRead: false,
    sentAt: 1588152030009,
    sender: util.makeLoremSender(),
    senderAddress: 'frauds@Google.com',
    isStarred: false,
    isTrash: false
},
{
    id: util.makeId(),
    subject: 'Don\'t forget to do a pishpull',
    body: 'Before you go asleep let\'s do a push and pull, push and pull.',
    isRead: false,
    sentAt: 1588152030009,
    sender: util.makeLoremSender(),
    senderAddress: 'pushpull@github.org',
    isStarred: false,
    isTrash: false
},
{
    id: util.makeId(),
    subject: 'My best independence day ever!',
    body: 'How didn\'t I do it before. It is such a pleasure!',
    isRead: false,
    sentAt: 1588152030009,
    sender: util.makeLoremSender(),
    senderAddress: 'loremIpsum@gmail.com',
    isStarred: false,
    isTrash: false
},
{
    id: util.makeId(),
    subject: 'It is working!!! OMG!!!',
    body: 'Let\'s tell Nevo! I can\'t believe this. We have an appsus!',
    isRead: false,
    sentAt: 1588152030002,
    sender: util.makeLoremSender(),
    senderAddress: 'nevo@gmail.com',
    isStarred: false,
    isTrash: false
},
{
    id: util.makeId(),
    subject: 'Wassap?',
    body: 'Pick up!',
    isRead: true,
    sentAt: 1551133930594,
    sender: util.makeLoremSender(),
    senderAddress: 'address@gmail.com',
    isStarred: true,
    isTrash: true
},
{
    id: util.makeId(),
    subject: 'manshma?',
    body: 'hello there!',
    isRead: false,
    sentAt: 1551133930594,
    sender: util.makeLoremSender(),
    senderAddress: 'my@gmail.com',
    isStarred: false,
    isTrash: false
},
{
    id: util.makeId(),
    subject: 'New Email',
    body: 'Done at createEmail a loooong time ago',
    isRead: false,
    sentAt: 155118390594,
    sender: util.makeLoremSender(),
    senderAddress: 'stam@gmail.com',
    isStarred: false,
    isTrash: false
}
]


const STORAGE_KEY = 'emails'
var gEmails = null;

createEmails();

function createEmails() {
    gEmails = storageService.loadFromStorage(STORAGE_KEY);
    if (!gEmails || !gEmails.length) {
        gEmails = gDefaultEmails;
        storageService.saveToStorage(STORAGE_KEY, gEmails)
    }
}

function query(filter) {
    if (filter === 'inbox') return Promise.resolve(_getInbox());
    if (filter === 'trash') return Promise.resolve(_getTrash());
    if (filter === 'starred') return Promise.resolve(_getStarred());
    if (filter === 'unread') return Promise.resolve(_getUnread());
    return Promise.resolve(gEmails);
}

function querySearch(filterBy) {
    let filter = filterBy.toLowerCase();
    let emails = gEmails.filter(email =>
        (email.subject.toLowerCase().includes(filter) ||
            email.body.toLowerCase().includes(filter) ||
            email.sender.toLowerCase().includes(filter))
    )
    return Promise.resolve(emails);
}


function _getTrash() {
    const result = gEmails.filter(email => email.isTrash);
    return result;
}

function _getUnread() {
    const result = gEmails.filter(email => !email.isRead);
    return result;
}

function _getStarred() {
    const result = gEmails.filter(email => email.isStarred);
    return result;
}

function _getInbox() {
    const result = gEmails.filter(email => !email.isTrash);
    return result;
}

function getById(emailId) {
    const email = gEmails.find(email => email.id === emailId)
    return Promise.resolve(email);
}

function remove(emailId) {
    const emailIdx = _getIdxById(emailId)
    gEmails.splice(emailIdx, 1)
    storageService.saveToStorage(STORAGE_KEY, gEmails)
    return Promise.resolve();
}

function _getIdxById(emailId) {
    return gEmails.findIndex(email => email.id === emailId)
}

function toggleStar(emailId) {
    const email = gEmails.find(email => email.id === emailId)
    email.isStarred = !email.isStarred;
    return Promise.resolve(email);
}

function toggleRead(emailId) {
    const email = gEmails.find(email => email.id === emailId)
    email.isRead = !email.isRead;
    return Promise.resolve(email);
}

function toggleTrash(emailId) {
    const email = gEmails.find(email => email.id === emailId)
    email.isTrash = (!email.isTrash);
    return Promise.resolve(email);
}

function createEmail(subject, body, senderAddress) {
    let newMail = {
        id: util.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        sender: util.makeLoremSender(),
        senderAddress,
        isStarred: false,
        isTrash: false,
    }
    gEmails.unshift(newMail);
    storageService.saveToStorage(STORAGE_KEY, gEmails)
}

function numOfUnread() {
    var counter = 0;
    gEmails.forEach(email => { if (!email.isRead) counter++ });
    return counter;
}
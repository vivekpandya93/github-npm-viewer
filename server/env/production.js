
module.exports = {
    "DATABASE_URI": process.env.MONGOLAB_URI,
    "SESSION_SECRET": process.env.SESSION_SECRET,
    "GITHUB": {
        "consumerKey": process.env.GITHUB_CONSUMER_KEY,
        "consumerSecret": process.env.GITHUB_CONSUMER_SECRET,
        "callbackUrl": process.env.GITHUB_CALLBACK
    }
};
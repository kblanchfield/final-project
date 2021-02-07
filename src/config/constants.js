const PORT = process.env.PORT || 4000

const mongoDbUri = `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.fl4xw.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`

module.exports = {
    PORT,
    mongoDbUri
}

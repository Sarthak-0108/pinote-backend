import 'dotenv/config'
import app from "./src/app.js";
import connectToDb from './src/db/db.js';

connectToDb()

app.listen('5000', () => {
    console.log('server is running at port 5000')
})
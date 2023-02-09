import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration,OpenAIApi } from 'openai'
import mongoose from 'mongoose';
const promptSchema = mongoose.Schema({
    body: String,
  });
  const Prompt = mongoose.model("Prompt", promptSchema);
dotenv.config()

const PORT = process.env.port || 5000;
const MONGODB_URL = 'mongodb+srv://syed_abdulrab:syedabdulrab@cluster0.nt7qb.mongodb.net/ARsAI?retryWrites=true&w=majority';
const configuration = new Configuration({
    apiKey: "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"
})

const openai = new OpenAIApi(configuration)

const app = express()
app.use(cors());
app.use(express.json())

app.get('/',async(req,res)=>{
    res.status(200).send({
        message:'AR says hewwo'
    })
})
app.post('/',async (req,res)=>{
    try {
        const prompt = req.body.prompt
        console.log(prompt)
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
          });
          const mongoPrompt = new Prompt({
            body:prompt
          })

          res.status(200).send({
            bot:response.data.choices[0].text
          })
          const finalizedMongoPrompt = await mongoPrompt.save();
          


    }catch(err){
        console.log(err)
        res.status(500).send({err})
    }
})


mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    return app.listen(5000);
  })
  .then((res) => console.log(`server running at ${res.url}`))
  .catch(err=>{
    console.error(err)
  })







// ok Sooooooo, I have an idea :- I'm gonna make this chat gpt thing and connect it to mongo db at the backend, 
// whenever someone makes a prompt, i'll send it to mongo db alog with the person's name.
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();


const configuration = new GoogleGenerativeAI(process.env.API_KEY);




let transcripts = JSON.parse(fs.readFileSync('in.json', 'utf8'));
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });

async function processTranscripts(transcripts) {
  const batchSize = 5;

  for (let i = 0; i < transcripts.length; i += batchSize) {
    const batch = transcripts.slice(i, i + batchSize);

    const combinedTranscripts = batch.map(t => t.text).join("###DELIMITER###");

    const previousPrompt = "You are an advanced language model. Your task is to correct the following transcripts that contain some errors, each transcript is seperated by '###DELIMITER###', The input is in arabic and output should be as well. I'm gonna provide the previos transcript line for you to get some context, Please output the corrected versions only, separated by '###DELIMITER###', without any additional comments.";
    let prevContent = "no prev context";
    try {
      prevContent = `${transcripts[i - 1].text}; ${transcripts[i - 2].text}`;
    } catch (error) {}

    try {
      const chat = model.startChat({
        generationConfig: {
          maxOutputTokens: 100000, 
        },
      });

      const result = await chat.sendMessage(`${previousPrompt}\n\nPrev Content: ${prevContent}\n\nTranscripts: ${combinedTranscripts}`);
      const response = await result.response;
      const responseText = response.text();

      const correctedTranscripts = responseText.split("###DELIMITER###");

      for (let j = 0; j < batch.length; j++) {
        transcripts[i + j].text = correctedTranscripts[j].trim();
        console.log(`Transcript ${i + j + 1}/${transcripts.length} corrected.`);
        console.log(`Corrected text: ${correctedTranscripts[j].trim()}`);
      }

    } catch (error) {
      if(error.toString().includes("Too Many Requests")) {
        await new Promise(resolve => setTimeout(resolve, 60000));
        console.log("Too many requests, waiting for 1 minute...");
      } else  {
        console.error(`Error correcting batch ${Math.floor(i / batchSize) + 1}:`, error);
      }
      console.log("Retrying batch correction...");
      i -= batchSize; 
    }
  }

  return transcripts;
}

processTranscripts(transcripts).then((transcripts) => {
  fs.writeFileSync('out.json', JSON.stringify(transcripts, null, 2));
  console.log("All transcripts corrected and saved to out.json");
})

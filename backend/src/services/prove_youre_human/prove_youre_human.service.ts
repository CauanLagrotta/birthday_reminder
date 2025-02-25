import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

export const proveYoureHumanService = async (user_response: string) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: "Você é um assistente que classifica respostas do usuário como 'INSULTO' ou 'ELOGIO'. Responda apenas com 'INSULTO' ou 'ELOGIO'."
    });

    const prompt = `A resposta do usuário foi: "${user_response}". Classifique esta resposta.`;

    const result = await model.generateContent(prompt);

    if(result.response.text().includes("INSULTO")){
        return "INSULTO";

    }else{
        return "ELOGIO";
    }
};

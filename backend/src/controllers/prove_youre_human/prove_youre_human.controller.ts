import { proveYoureHumanService } from "../../services/prove_youre_human/prove_youre_human.service";

export const proveYoureHumanController = async (req: any, res: any) => {
    const { user_response } = req.body;

    try {
        const result = await proveYoureHumanService(user_response);
        return res.status(200).json({ result }); 

    } catch (error) {
        return res.status(500).json({ error: error }); 
    }
};
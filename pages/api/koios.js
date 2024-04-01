import { KoiosProvider } from '@meshsdk/core';

export default async function handler(req, res) {
    // console.log("Request received:", req.query); // Debug log

    const { action, params } = req.query;
    const apiKey = process.env.KOIOS_API_KEY;

    // Basic validation
    if (!action || !apiKey) {
        console.error("Missing required parameters");
        return res.status(400).json({ message: "Missing required parameters." });
    }

    try {
        const koiosProvider = new KoiosProvider('api', apiKey);
        if (typeof koiosProvider[action] !== 'function') {
            console.error("Invalid action:", action);
            return res.status(400).json({ message: "Invalid action." });
        }

        
        // Debugging: Log the method and parameters
        // console.log("Calling method:", action, "with params:", params);

        const data = await koiosProvider[action](...Object.values(JSON.parse(params)));

        // console.log("Data received:", data); // Debug log

        return res.status(200).json(data);
    } catch (error) {
        console.error("Direct error log:", error);
    
        if (error instanceof Error) {
            // It's an error object; log its message and stack.
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        } else {
            // The caught item is not an Error object; log it verbatim.
            console.error("Caught non-Error object:", error);
        }
    
        return res.status(500).json({ message: "Internal server error. See server logs for more details." });
    }
    

}

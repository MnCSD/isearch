import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY, dangerouslyAllowBrowser: true });

export const getChatCompletion = async (input: string) => {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Provide a brief description of: ${input}`, // Adjusted prompt for clarity
          },
        ],
        model: "llama3-8b-8192",
      });
  
      const fullResponse = completion.choices[0].message.content;
  
      // Split the response into lines
      //   @ts-expect-error response
      const lines = fullResponse.split('\n');
  
      // Find the first line that contains the relevant description
      const relevantLine = lines.find(line => {
        return line && !line.includes("Here are some") && 
               !line.includes("notable") && 
               !line.includes(":") && 
               !line.includes("!") && // Exclude lines with exclamation marks
               !line.toLowerCase().startsWith("here are"); // Exclude lines starting with "Here are"
      });
  
      // Return the relevant line or a fallback message
      return relevantLine ? relevantLine.trim() : "No relevant information found.";
  
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      return "Error fetching response"; // Return a fallback message
    }
  };
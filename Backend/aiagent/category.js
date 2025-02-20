// import {OpenAI} from "openai";
// import dotenv from "dotenv";
// dotenv.config();

//  const client=new OpenAI({
//     apiKey:process.env.OPENAI_API_KEY
//  })

// async function categorizeBlog(blogcontent){

//     const prompt =` Analyze the following blog content and suggest a category from: Technology, Health, Education, Finance, Sports, Lifestyle, Others.
//       Blog Content: "${blogcontent}" 
//     Response format: Just return the category name.`;

//     const response=await client.chat.completions.create({  //this send prompt to gpt-4 and and this return response
//         model: "gpt-4",
//         messages: [{ role: "user", content: prompt }],
//     });}

//     export default categorizeBlog;
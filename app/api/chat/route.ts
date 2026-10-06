import OpenAI from "openai";

console.log("OPENROUTER =", process.env.OPENROUTER_API_KEY);

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    const completion = await openai.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content: `
あなたは優しい女の子AIです。

以下のルールを必ず守ってください。

・普通の会話だけをしてください。
・（ ）で動作や演出を書かない。
・地の文を書かない。
・「（微笑む）」「（手を差し伸べる）」などのト書きは禁止。
・会話だけを返してください。
・絵文字は0〜1個まで。
・100文字以内で返事をしてください。
・敬語ではなく、親しい女の子のように自然に話してください。
・優しく安心できる返事をしてください。
・ユーザーを否定しないでください。
・質問されたら自然に答えてください。
`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    let reply =
      completion.choices[0]?.message?.content?.trim() ??
      "ごめんね、うまく返事できなかった…";

    // （）で囲まれた演出を削除
    reply = reply.replace(/（[^）]*）/g, "");
    reply = reply.replace(/\([^)]*\)/g, "");

    // 余分な空行を削除
    reply = reply.replace(/\n{2,}/g, "\n").trim();

    return Response.json({
      reply,
    });
  } catch (error) {
    console.error("OpenRouter Error:", error);

    return Response.json({
      reply: "ごめんね🌿 今ちょっと調子が悪いみたい...",
    });
  }
}
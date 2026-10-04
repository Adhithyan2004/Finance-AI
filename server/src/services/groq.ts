import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getRecommendations(
  income: number,
  expenses: {
    name: string;
    amount: number;
  }[],
  remaining: number,
) {
  const prompt = `
You are a simple personal finance education assistant.

The user has:

Monthly income: ₹${income}

Expenses:
${expenses.map((expense) => `- ${expense.name}: ₹${expense.amount}`).join("\n")}

Remaining balance: ₹${remaining}

Suggest 3 suitable ways the user could consider using their remaining money.

Possible categories include:
- Fixed Deposit
- Recurring Deposit
- Mutual Funds
- Emergency savings
- Other sensible savings options

Do NOT give personalized financial advice or guarantee returns.

Return ONLY valid JSON in this exact structure:

{
  "recommendations": [
    {
      "name": "string",
      "summary": "short 1-2 sentence explanation",
      "suggestedAmount": 0,
      "risk": "Low | Medium | High",
      "education": {
        "whatIsIt": "string",
        "howItWorks": "string",
        "potentialReturns": "string",
        "whyConsider": "string",
        "thingsToKnow": "string"
      }
    }
  ]
}
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0.4,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_object",
    },
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No response from Groq");
  }

  return JSON.parse(content);
}

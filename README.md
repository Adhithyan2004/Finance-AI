# Finance AI

An AI-powered personal finance assistant that helps you understand your monthly finances and find smarter ways to use your leftover money.

## Live Demo

https://finance-recommendor.vercel.app/

## What It Does

Finance AI lets you:

- Enter your monthly income
- Add your regular expenses
- Calculate your remaining balance
- Get AI-powered recommendations for using the leftover money
- Learn about each recommendation, including risks, how it works, and potential returns

The core flow is:

**Income → Expenses → Remaining Balance → AI Recommendations → Financial Education**

The goal is to make personal finance simpler and easier to understand, especially for people who are new to saving and investing.

## AI

Finance AI uses **Groq** with the open-weight **GPT-OSS 120B** model to generate structured financial recommendations.

The AI receives the user's income, expenses, and remaining balance and returns three possible ways to consider using the leftover money.

Each recommendation includes:

- Summary
- Suggested amount
- Risk level
- What it is
- How it works
- Potential returns
- Why to consider it
- Things to know

The application is designed as **educational guidance, not personalized financial advice**.

## Tech Stack

- **Next.js**
- **TypeScript**
- **React**
- **Tailwind CSS**
- **Groq**
- **GPT-OSS 120B**
- **Vercel**

## Architecture

```text
User
  │
  ▼
Next.js Frontend
  │
  ▼
/api/recommendations
  │
  ▼
Groq
  │
  ▼
GPT-OSS 120B
  │
  ▼
Structured Recommendations
  │
  ▼
Finance AI UI
```

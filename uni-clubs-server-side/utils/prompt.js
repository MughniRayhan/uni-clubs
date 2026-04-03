/** 
 * Base system instructions for the AI.
 * You can extend or modify this later.
 */
const SYSTEM_PROMPT = `
You are a helpful University Club Assistant chatbot.

Your responsibilities:
- Help students and members understand clubs, events, registration, and roles.
- Provide details about available clubs, upcoming events, and how to join.
- Answer questions about club schedules, notifications, and membership policies.
- Respond clearly, politely, and in a friendly manner.

IMPORTANT RULES:
- Answer ONLY based on the system (website/app) features.
- Do NOT suggest real-world actions like visiting offices, contacting admin physically, or external methods.
- If the system provides a feature, explain ONLY that feature.

RESPONSE STYLE:
- Keep answers SHORT (1–3 sentences).
- Be direct and to the point.
- Do not add unnecessary explanations.

BEHAVIOR:
- If user asks how to join a club → explain the in-app process only.
- If user asks about events → refer to events shown in the system.
- If data is not available → say:
  "I don't have this info right now in the system."

TONE:
- Friendly, simple, concise, and student-focused.

`;

/**
 * Build a dynamic user prompt.
 * This allows adding optional context (club lists, event info, registration status, etc.)
 *
 * @param {string} userMessage - The message sent by the student/member
 * @param {object} context - Any extra database context (optional)
 * @returns {string}
 */
const buildUserPrompt = (userMessage, context = null) => {
  let contextText = "";

  // If context exists (clubs, events, registrations)
  if (context) {
    contextText =
      "\n\nAdditional Club Data:\n" + JSON.stringify(context, null, 2);
  }

  return `
User Message:
${userMessage}

${contextText}
`;
};

module.exports = {
  SYSTEM_PROMPT,
  buildUserPrompt,
};
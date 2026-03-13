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
- If you don't know something, say: "I don't have this info right now, please contact the club office."
- Keep answers simple, concise, and student-focused.
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
const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini client
const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file.'
    );
  }

  return new GoogleGenAI({ apiKey });
};

/*
 * Medical / Health related keywords.
 * This is only a quick first-level filter.
 */
const medicalKeywords = [
  'health',
  'medical',
  'medicine',
  'disease',
  'symptom',
  'symptoms',
  'fever',
  'cold',
  'cough',
  'headache',
  'pain',
  'stomach',
  'vomiting',
  'diarrhea',
  'dehydration',
  'allergy',
  'allergies',
  'asthma',
  'diabetes',
  'blood pressure',
  'hypertension',
  'heart',
  'lung',
  'kidney',
  'liver',
  'skin',
  'infection',
  'virus',
  'bacteria',
  'flu',
  'covid',
  'nutrition',
  'vitamin',
  'protein',
  'pregnancy',
  'sleep',
  'mental health',
  'stress',
  'anxiety',
  'doctor',
  'hospital',
  'treatment',
  'diagnosis',
  'tablet',
  'medicine',
  'drug',
  'dose',
  'dosage',
  'first aid',
  'injury',
  'blood',
  'cancer',
  'immune',
  'immunity',
  'cholesterol',
  'thyroid',
  'migraine',
  'wound',
  'rash',
  'breathing',
  'dizziness',
  'nausea'
];

/**
 * Check whether the question is related to medical / health topics.
 */
const isMedicalQuestion = (question) => {
  const text = question.toLowerCase();

  return medicalKeywords.some((keyword) => text.includes(keyword));
};

/**
 * System instruction for Gemini.
 */
const MEDICAL_SYSTEM_INSTRUCTION = `
You are a medical and health information assistant.

Your scope is ONLY medical, healthcare, wellness, nutrition, symptoms,
diseases, medicines, general first aid, prevention, body functions,
mental health information, and other health-related educational topics.

If the user asks about a topic that is NOT related to health or medicine,
do not answer it.

For non-medical questions, respond exactly with:
"I'm sorry, I can only answer questions related to medical and health information."

Important rules:
- Provide general educational information only.
- Do not claim to diagnose the user.
- Do not prescribe medicines or provide personalized treatment plans.
- Do not tell users to change or stop prescribed medication.
- Encourage the user to consult a qualified healthcare professional when
  professional medical evaluation may be needed.
- For emergencies, advise the user to seek immediate local emergency care.
- Use clear, simple language.
- Do not make up medical facts.
- Do not present yourself as a doctor.
`;

/**
 * Generates a medical / health answer.
 *
 * @param {string} question
 * @returns {Promise<string>}
 */
const generateAnswer = async (question) => {
  try {
    if (!question || typeof question !== 'string') {
      throw new Error('A valid question is required.');
    }

    const cleanQuestion = question.trim();

    if (!cleanQuestion) {
      throw new Error('Question cannot be empty.');
    }

    /*
     * First-level medical topic filter.
     */
    if (!isMedicalQuestion(cleanQuestion)) {
      return "I'm sorry, I can only answer questions related to medical and health information.";
    }

    const ai = getClient();

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',

      contents: cleanQuestion,

      config: {
        systemInstruction: MEDICAL_SYSTEM_INSTRUCTION,
        maxOutputTokens: 800,
      },
    });

    if (!response || !response.text) {
      throw new Error('No response text received from Gemini API');
    }

    return response.text.trim();

  } catch (error) {
    console.error('Error in geminiService.generateAnswer:', error);

    throw new Error(
      `AI Answer Generation failed: ${error.message}`
    );
  }
};


/**
 * Generates a single medical FAQ question and answer pair.
 *
 * @param {string} topic
 * @returns {Promise<{question: string, answer: string}>}
 */
const generateFAQ = async (topic) => {
  try {
    if (!topic || typeof topic !== 'string') {
      throw new Error('A valid medical topic is required.');
    }

    const cleanTopic = topic.trim();

    /*
     * FAQ generation is also restricted to medical topics.
     */
    if (!isMedicalQuestion(cleanTopic)) {
      throw new Error(
        'FAQ generation is available only for medical and health topics.'
      );
    }

    const ai = getClient();

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',

      contents: `
Generate one frequently asked question and a helpful educational answer
about this medical/health topic:

"${cleanTopic}"
      `,

      config: {
        systemInstruction: MEDICAL_SYSTEM_INSTRUCTION,

        responseMimeType: 'application/json',

        responseSchema: {
          type: 'OBJECT',

          properties: {
            question: {
              type: 'STRING',
              description:
                'A clear and common medical or health-related question.'
            },

            answer: {
              type: 'STRING',
              description:
                'A clear educational answer about the medical or health topic.'
            }
          },

          required: ['question', 'answer'],
        },

        maxOutputTokens: 1000,
      },
    });

    if (!response || !response.text) {
      throw new Error('No response received from Gemini API');
    }

    const faqPair = JSON.parse(response.text);

    return faqPair;

  } catch (error) {
    console.error('Error in geminiService.generateFAQ:', error);

    throw new Error(
      `AI FAQ Generation failed: ${error.message}`
    );
  }
};


module.exports = {
  generateAnswer,
  generateFAQ,
};
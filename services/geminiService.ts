import { GoogleGenAI } from "@google/genai";
import { ProductPreferences, ComparisonResult, ModelType, StructuredComparisonData } from "../types";

const getSystemInstruction = () => {
  return `Jesteś zaawansowanym analitykiem produktów. Twoim zadaniem jest porównanie dwóch produktów i zwrócenie wyniku w formacie JSON.
  
  Zasady:
  1. Użyj Google Search, aby znaleźć aktualne dane.
  2. Bądź obiektywny, ale zdecydowany w ocenach.
  3. Zwróć WYŁĄCZNIE poprawny obiekt JSON. Nie dodawaj formatowania Markdown (np. \`\`\`json) na początku ani na końcu. Czysty tekst JSON.
  4. Kategorie porównania dobierz dynamicznie w zależności od typu produktu (np. dla laptopów: "Wydajność", "Ekran", "Bateria"; dla butów: "Wygoda", "Trwałość", "Design"). Stwórz od 4 do 6 kategorii.
  5. Oceny (scoreA, scoreB) muszą być w skali 1-10.
  `;
};

export const compareProducts = async (
  url1: string,
  url2: string,
  preferences: ProductPreferences,
  model: ModelType
): Promise<ComparisonResult> => {
  if (!process.env.API_KEY) {
    throw new Error("Brak klucza API. Upewnij się, że environment variable API_KEY jest ustawione.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const priorityString = preferences.priorities.length > 0
    ? preferences.priorities.join(", ")
    : "Ogólny balans (brak specyficznych preferencji)";

  // Definiujemy oczekiwaną strukturę JSON w prompcie, ponieważ przy użyciu tools (Google Search)
  // responseSchema w configu jest zabronione.
  const prompt = `
  Porównaj te dwa produkty:
  Produkt A: ${url1}
  Produkt B: ${url2}
  
  Preferencje użytkownika: ${priorityString}. ${preferences.customDescription || ""}
  
  Zwróć odpowiedź ściśle w następującym formacie JSON:
  {
    "productAName": "Krótka nazwa produktu A",
    "productBName": "Krótka nazwa produktu B",
    "summary": "Krótkie wprowadzenie (max 2 zdania)",
    "categories": [
      {
        "name": "Nazwa kategorii (np. Cena, Jakość)",
        "winner": "A" lub "B" lub "Remis",
        "scoreA": liczba od 1 do 10,
        "scoreB": liczba od 1 do 10,
        "reasoning": "Krótkie uzasadnienie werdyktu w tej kategorii"
      }
    ],
    "prosA": ["Zaleta 1", "Zaleta 2"],
    "consA": ["Wada 1", "Wada 2"],
    "prosB": ["Zaleta 1", "Zaleta 2"],
    "consB": ["Wada 1", "Wada 2"],
    "finalVerdict": {
      "winner": "A" lub "B" lub "Remis",
      "explanation": "Podsumowanie dlaczego ten produkt wygrywa dla tego użytkownika."
    }
  }
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(),
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    let jsonString = response.text || "";
    
    // Cleaning potential markdown wrappers often added by LLMs despite instructions
    jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();

    let parsedData: StructuredComparisonData;
    try {
      parsedData = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse JSON from AI:", jsonString);
      throw new Error("AI zwróciło niepoprawny format danych. Spróbuj ponownie.");
    }
    
    // Extract grounding chunks for citations if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingSources = chunks
      .filter((c: any) => c.web?.uri)
      .map((c: any) => ({
        uri: c.web.uri,
        title: c.web.title || "Źródło",
      }));

    return {
      data: parsedData,
      groundingSources,
    };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Wystąpił błąd podczas komunikacji z AI.");
  }
};

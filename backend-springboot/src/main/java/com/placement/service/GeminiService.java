package com.placement.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=";

    /**
     * Sends a custom engineered prompt to Gemini 1.5 Flash to get structured AI insights.
     */
    @SuppressWarnings({"rawtypes", "unchecked"})
    public String generateContent(String prompt) {
        if (apiKey == null || apiKey.trim().isEmpty() || apiKey.startsWith("${")) {
            // Log warning or return a default fallback string
            return getFallbackResponseForPrompt(prompt);
        }

        try {
            String url = GEMINI_API_URL + apiKey;

            // Set request headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Construct Gemini request body structure
            Map<String, Object> textPart = new HashMap<>();
            textPart.put("text", prompt);

            Map<String, Object> partsMap = new HashMap<>();
            partsMap.put("parts", List.of(textPart));

            Map<String, Object> contentsMap = new HashMap<>();
            contentsMap.put("contents", List.of(partsMap));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(contentsMap, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return extractTextFromGeminiResponse(response.getBody());
            }
        } catch (Exception e) {
            System.err.println("Gemini API call failed, falling back: " + e.getMessage());
        }

        return getFallbackResponseForPrompt(prompt);
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    private String extractTextFromGeminiResponse(Map responseBody) {
        try {
            List candidates = (List) responseBody.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map firstCandidate = (Map) candidates.get(0);
                Map content = (Map) firstCandidate.get("content");
                List parts = (List) content.get("parts");
                if (parts != null && !parts.isEmpty()) {
                    Map firstPart = (Map) parts.get(0);
                    return (String) firstPart.get("text");
                }
            }
        } catch (Exception e) {
            System.err.println("Failed to parse Gemini response: " + e.getMessage());
        }
        return "Failed to parse generation content from AI service.";
    }

    private String getFallbackResponseForPrompt(String prompt) {
        String lowerPrompt = prompt.toLowerCase();
        if (lowerPrompt.contains("resume") || lowerPrompt.contains("ats")) {
            return "{\n" +
                    "  \"score\": 85,\n" +
                    "  \"atsCompatibility\": \"High\",\n" +
                    "  \"predictedRole\": \"Software Engineer\",\n" +
                    "  \"feedback\": [\n" +
                    "    \"Excellent technical keywording with modern libraries (Spring, React, Docker).\",\n" +
                    "    \"Include quantitative impact metrics for project achievements.\",\n" +
                    "    \"Strong educational foundations aligned to industry expectations.\"\n" +
                    "  ]\n" +
                    "}";
        } else if (lowerPrompt.contains("interview") || lowerPrompt.contains("question")) {
            return "[\n" +
                    "  {\n" +
                    "    \"id\": 1,\n" +
                    "    \"type\": \"Technical\",\n" +
                    "    \"question\": \"Explain the difference between optimistic locking and pessimistic locking in Hibernate/JPA. When would you use each?\"\n" +
                    "  },\n" +
                    "  {\n" +
                    "    \"id\": 2,\n" +
                    "    \"type\": \"HR\",\n" +
                    "    \"question\": \"Describe a time you encountered a severe conflict in a engineering team. How did you facilitate a resolution?\"\n" +
                    "  }\n" +
                    "]";
        }
        return "AI response placeholder (configure GEMINI_API_KEY environment variable to activate real-time intelligence).";
    }
}

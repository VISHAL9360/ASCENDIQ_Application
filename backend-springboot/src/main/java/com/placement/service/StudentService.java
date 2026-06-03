package com.placement.service;

import com.placement.entity.Application;
import com.placement.entity.Student;
import com.placement.entity.InterviewSchedule;
import com.placement.repository.ApplicationRepository;
import com.placement.repository.StudentRepository;
import com.placement.repository.InterviewScheduleRepository;
import com.placement.exception.ResourceNotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private InterviewScheduleRepository interviewRepository;

    @Autowired
    private GeminiService geminiService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public Student getStudentByUserId(Long userId) {
        return studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for user ID: " + userId));
    }

    public Optional<Student> getProfileByUserId(Long userId) {
        return studentRepository.findByUserId(userId);
    }

    public Student updateProfile(Student student) {
        return studentRepository.save(student);
    }

    public List<Application> getMyApplicationsByUserId(Long userId) {
        Student student = getStudentByUserId(userId);
        return applicationRepository.findByStudentId(student.getId());
    }

    public List<InterviewSchedule> getMyInterviewsByUserId(Long userId) {
        Student student = getStudentByUserId(userId);
        return interviewRepository.findByApplicationStudentId(student.getId());
    }

    public Map<String, Object> analyzeResumeWithAI(String resumeText) {
        if (resumeText == null || resumeText.trim().isEmpty()) {
            throw new IllegalArgumentException("Resume text cannot be blank.");
        }

        String prompt = "Analyze this resume text for ATS compatibility. Respond ONLY with a valid JSON object matching the following structure:\n" +
                "{\n" +
                "  \"score\": (integer between 0 and 100),\n" +
                "  \"atsCompatibility\": (\"High\", \"Medium\", or \"Low\"),\n" +
                "  \"predictedRole\": (predicted job title, e.g. \"Software Engineer\"),\n" +
                "  \"feedback\": [\n" +
                "    \"feedback point 1\",\n" +
                "    \"feedback point 2\",\n" +
                "    \"feedback point 3\"\n" +
                "  ]\n" +
                "}\n" +
                "Do not include any markdown backticks, explanations, or additional text. Just output the raw JSON.\n" +
                "Resume text:\n" +
                resumeText;

        String aiResponse = geminiService.generateContent(prompt);
        try {
            // Clean markdown blocks if Gemini wraps it in ```json
            String cleanedResponse = aiResponse.replaceAll("```json|```", "").trim();
            return objectMapper.readValue(cleanedResponse, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            System.err.println("Failed to parse Gemini response as JSON: " + e.getMessage());
            // Safe developer fallback structures
            return Map.of(
                    "score", calculateResumeScore(resumeText),
                    "atsCompatibility", "Medium",
                    "predictedRole", "Software Developer",
                    "feedback", List.of(
                            "Strong base metrics, but LLM parsing had an issue.",
                            "Include quantitative details for project deliverables.",
                            "Verify technical sections for proper standard keyword definitions."
                    )
            );
        }
    }

    public int calculateResumeScore(String resumeText) {
        // Mock AI Resume Scoring Logic
        if (resumeText == null || resumeText.isEmpty()) return 0;
        int score = 0;
        if (resumeText.toLowerCase().contains("java")) score += 20;
        if (resumeText.toLowerCase().contains("spring")) score += 20;
        if (resumeText.toLowerCase().contains("react")) score += 20;
        if (resumeText.toLowerCase().contains("sql")) score += 20;
        if (resumeText.length() > 500) score += 20;
        return Math.min(score, 100);
    }
}

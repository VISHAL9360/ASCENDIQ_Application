package com.placement.controller;

import com.placement.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private GeminiService geminiService;

    // 1. This endpoint generates questions for the interview
    @GetMapping("/interview/generate")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> generateInterview(@RequestParam String role) {
        String prompt = "Act as an elite technical interviewer. Generate exactly 5 challenging questions for the role of: "
                + role +
                ". Respond ONLY with a valid JSON array of objects matching this scheme: " +
                "[ { \"id\": 1, \"type\": \"Technical\", \"question\": \"...\" } ]. " +
                "Do not include any markdown backticks, explanations, or additional text. Just output raw JSON.";

        String response = geminiService.generateContent(prompt);
        String cleaned = response.replaceAll("```json|```", "").trim();
        return ResponseEntity.ok(cleaned);
    }

    // 2. This endpoint grades the student's answer
    @PostMapping("/interview/evaluate")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> evaluateAnswer(@RequestBody Map<String, String> payload) {
        String question = payload.get("question");
        String answer = payload.get("answer");

        String prompt = "Review this interview answer. Question: \"" + question + "\". Answer: \"" + answer + "\". " +
                "Evaluate the response. " +
                "Respond ONLY with a valid JSON matching this schema: " +
                "{ \"score\": (integer between 0 and 10), \"feedback\": \"...\", \"modelAnswer\": \"...\" }. " +
                "Do not include any markdown backticks, explanations, or additional text. Just output raw JSON.";

        String response = geminiService.generateContent(prompt);
        String cleaned = response.replaceAll("```json|```", "").trim();
        return ResponseEntity.ok(cleaned);
    }

    @Autowired
    private com.placement.service.StudentService studentService;

    // 3. This endpoint reads student profile and generates personalized AI
    // feedback!
    @GetMapping("/career-insights")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> getCareerInsights() {
        // Find who is logged in
        com.placement.security.UserDetailsImpl userDetails = (com.placement.security.UserDetailsImpl) org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        try {
            // Get student profile from database
            com.placement.entity.Student student = studentService.getStudentByUserId(userDetails.getId());

            String prompt = "Review this student's profile details. " +
                    "Department: " + student.getDepartment() + ". " +
                    "CGPA: " + student.getCgpa() + ". " +
                    "Skills listed: " + student.getSkills() + ". " +
                    "Analyze their profile strength out of 100, provide a detailed feedback paragraph, " +
                    "and give two actionable tips to improve. " +
                    "Respond ONLY with a valid JSON matching this schema: " +
                    "{ \"profileScore\": (integer 0-100), \"analysis\": \"...\", \"tips\": [\"tip 1\", \"tip 2\"] }. " +
                    "Do not include any markdown backticks or explanations. Just output raw JSON.";

            String response = geminiService.generateContent(prompt);
            String cleaned = response.replaceAll("```json|```", "").trim();
            return ResponseEntity.ok(cleaned);
        } catch (Exception e) {
            // Fallback JSON in case the student has not filled their profile yet!
            return ResponseEntity.ok("{" +
                    "\"profileScore\": 50," +
                    "\"analysis\": \"Please complete your Student Profile academic details and skills section to unlock your custom AI Evaluation.\","
                    +
                    "\"tips\": [\"Add at least 3 coding skills\", \"Update your CGPA in profile page\"]" +
                    "}");
        }
    }

    @Autowired
    private com.placement.repository.PlacementDriveRepository placementDriveRepository;

    // 4. This endpoint analyzes the skill gap between a student and a placement
    // drive!
    @GetMapping("/skill-gap")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> getSkillGap(@RequestParam Long driveId) {
        // Find logged-in user
        com.placement.security.UserDetailsImpl userDetails = (com.placement.security.UserDetailsImpl) org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        try {
            // Fetch student profile & target drive from database
            com.placement.entity.Student student = studentService.getStudentByUserId(userDetails.getId());
            com.placement.entity.PlacementDrive drive = placementDriveRepository.findById(driveId)
                    .orElseThrow(() -> new RuntimeException("Drive not found"));

            String prompt = "Compare this student profile with the job drive.\n" +
                    "Job: " + drive.getTitle() + " - " + drive.getDescription() + ".\n" +
                    "Student Skills: " + student.getSkills() + ".\n" +
                    "Analyze the skill gap. Calculate a compatibility percentage (0-100), " +
                    "identify missing key skills, and generate a 2-week preparation roadmap.\n" +
                    "Respond ONLY with a valid JSON matching this schema:\n" +
                    "{ \"compatibility\": 75, \"missingSkills\": [\"skill 1\", \"skill 2\"], \"roadmap\": [\"Week 1: Focus on ...\", \"Week 2: Practice ...\"] }.\n"
                    +
                    "Do not include any markdown backticks. Just output raw JSON.";

            String response = geminiService.generateContent(prompt);
            String cleaned = response.replaceAll("```json|```", "").trim();
            return ResponseEntity.ok(cleaned);
        } catch (Exception e) {
            return ResponseEntity.ok("{" +
                    "\"compatibility\": 60," +
                    "\"missingSkills\": [\"System Design\", \"Spring Security\"]," +
                    "\"roadmap\": [\"Day 1-5: Study key MVC flow\", \"Day 6-10: Practice coding challenges\"]" +
                    "}");
        }
    }

}

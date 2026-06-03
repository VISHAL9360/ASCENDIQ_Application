package com.placement.controller;

import com.placement.entity.Application;
import com.placement.entity.Student;
import com.placement.service.S3Service;
import com.placement.service.StudentService;
import com.placement.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private S3Service s3Service;

    // ─── GET: My Profile ─────────────────────────────────────────────
    @GetMapping("/profile/me")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> getMyProfile() {
        UserDetailsImpl userDetails = (UserDetailsImpl)
                SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return studentService.getProfileByUserId(userDetails.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ─── POST: Create / Update Profile with optional S3 Resume Upload ─
    @PostMapping("/profile")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> saveProfile(
            @RequestParam(value = "resume", required = false) MultipartFile resumeFile,
            @RequestParam(value = "rollNumber", required = false) String rollNumber,
            @RequestParam(value = "department", required = false) String department,
            @RequestParam(value = "course", required = false) String course,
            @RequestParam(value = "batch", required = false) String batch,
            @RequestParam(value = "cgpa", required = false) Double cgpa,
            @RequestParam(value = "skills", required = false) String skills) {

        UserDetailsImpl userDetails = (UserDetailsImpl)
                SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Student student = studentService.getProfileByUserId(userDetails.getId())
                .orElse(new Student());

        // Map form fields to entity
        if (rollNumber != null) student.setRollNumber(rollNumber);
        if (department != null) student.setDepartment(department);
        if (cgpa != null) student.setCgpa(cgpa);
        if (skills != null) student.setSkills(skills);

        // Resolve user relationship if creating a new profile
        if (student.getUser() == null) {
            com.placement.entity.User u = new com.placement.entity.User();
            u.setId(userDetails.getId());
            student.setUser(u);
        }

        // Upload resume to AWS S3 if file provided
        if (resumeFile != null && !resumeFile.isEmpty()) {
            // Validate file type — only PDF or Word documents allowed
            String contentType = resumeFile.getContentType();
            if (contentType == null ||
                    (!contentType.equals("application/pdf") &&
                     !contentType.equals("application/msword") &&
                     !contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Only PDF or Word documents are accepted for resume upload."));
            }

            // Validate file size — max 10MB
            if (resumeFile.getSize() > 10 * 1024 * 1024) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Resume file must be smaller than 10MB."));
            }

            try {
                String s3Url = s3Service.uploadFile(resumeFile);
                student.setResumeUrl(s3Url);
            } catch (Exception e) {
                return ResponseEntity.internalServerError()
                        .body(Map.of("error", "Resume upload failed. Please try again."));
            }
        }

        Student saved = studentService.updateProfile(student);
        return ResponseEntity.ok(saved);
    }

    // ─── POST: Analyze Resume Text with Gemini AI ────────────────────
    @PostMapping("/analyze-resume")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> analyzeResume(@RequestBody Map<String, String> request) {
        String resumeText = request.get("resumeText");
        Map<String, Object> result = studentService.analyzeResumeWithAI(resumeText);
        return ResponseEntity.ok(result);
    }

    // ─── GET: My Applications ─────────────────────────────────────────
    @GetMapping("/applications/me")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Application>> getMyApplications() {
        UserDetailsImpl userDetails = (UserDetailsImpl)
                SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(studentService.getMyApplicationsByUserId(userDetails.getId()));
    }

    // ─── GET: My Interviews ───────────────────────────────────────────
    @GetMapping("/interviews/me")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<com.placement.entity.InterviewSchedule>> getMyInterviews() {
        UserDetailsImpl userDetails = (UserDetailsImpl)
                SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(studentService.getMyInterviewsByUserId(userDetails.getId()));
    }
}

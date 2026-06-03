package com.placement.controller;

import com.placement.repository.CompanyRepository;
import com.placement.repository.JobPostingRepository;
import com.placement.repository.PlacementDriveRepository;
import com.placement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    JobPostingRepository jobPostingRepository;

    @Autowired
    PlacementDriveRepository placementDriveRepository;

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("students", studentRepository.count());
        stats.put("companies", companyRepository.count());
        stats.put("jobs", jobPostingRepository.count());
        stats.put("drives", placementDriveRepository.count());
        return ResponseEntity.ok(stats);
    }
}

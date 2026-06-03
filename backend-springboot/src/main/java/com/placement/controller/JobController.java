package com.placement.controller;

import com.placement.entity.JobPosting;
import com.placement.repository.JobPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/jobs")
public class JobController {
    @Autowired
    JobPostingRepository jobPostingRepository;

    @GetMapping("/all")
    public List<JobPosting> getAllJobs() {
        return jobPostingRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Long id) {
        return jobPostingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('RECRUITER') or hasRole('ADMIN')")
    public JobPosting createJob(@RequestBody JobPosting jobPosting) {
        return jobPostingRepository.save(jobPosting);
    }
}

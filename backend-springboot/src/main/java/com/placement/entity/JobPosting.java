package com.placement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_postings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String requirements;

    private String role;
    private String location;
    private String salaryRange;
    private Double minCgpa;
    private String type; // Full-time, Internship

    private LocalDateTime deadline;
    private LocalDateTime postedAt;

    @PrePersist
    protected void onCreate() {
        postedAt = LocalDateTime.now();
    }
}

package com.placement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private JobPosting jobPosting;

    private String status; // Pending, Shortlisted, Rejected, Selected
    
    private LocalDateTime appliedAt;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @PrePersist
    protected void onCreate() {
        appliedAt = LocalDateTime.now();
        if (status == null) status = "Pending";
    }
}

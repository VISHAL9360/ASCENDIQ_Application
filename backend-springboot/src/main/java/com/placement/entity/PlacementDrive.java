package com.placement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "placement_drives")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlacementDrive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    private LocalDateTime driveDate;
    private String venue;
    private String status; // Scheduled, Ongoing, Completed, Cancelled
    
    private String jobRole;
    private String salaryPackage;
    private String location;
    private LocalDateTime deadline;
    
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

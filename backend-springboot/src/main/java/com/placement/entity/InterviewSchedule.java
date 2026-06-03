package com.placement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "interview_schedules")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    private LocalDateTime interviewTime;
    private String interviewType; // Technical, HR, Group Discussion
    private String location; // Link for online or address for offline
    private String status; // Scheduled, Completed, Rescheduled, Cancelled
    
    @Column(columnDefinition = "TEXT")
    private String notes;
}

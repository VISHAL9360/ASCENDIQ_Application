package com.placement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String fullName;
    private String rollNumber;
    private String department;
    private Double cgpa;
    private String resumeUrl;
    private Integer graduationYear;
    
    @Column(columnDefinition = "TEXT")
    private String skills;
}

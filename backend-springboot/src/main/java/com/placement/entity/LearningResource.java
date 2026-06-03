package com.placement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "learning_resources")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningResource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String category; // Aptitude, Technical, Soft Skills, Mock Interview
    private String contentUrl; // Link to PDF, Video, or Article
    private String type; // VIDEO, PDF, ARTICLE
    
    private boolean isPremium;
}

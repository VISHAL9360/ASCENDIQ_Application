package com.placement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String industry;
    private String website;
    private String email;
    private String contactNumber;
    private String location;
    private String logoUrl;
    
    private boolean isVerified = false;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}

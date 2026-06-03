package com.placement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "alumni")
public class Alumni {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String batch;
    private String company;
    private String role;
    private String location;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBatch() { return batch; }
    public void setBatch(String batch) { this.batch = batch; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }
}

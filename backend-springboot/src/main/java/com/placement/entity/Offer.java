package com.placement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "offers")
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String role;
    private String ctc;
    private String status; // Accepted, Pending, Declined
    private String date;
    private String location;

    @Column(name = "user_id")
    private Long userId;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getCtc() { return ctc; }
    public void setCtc(String ctc) { this.ctc = ctc; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}

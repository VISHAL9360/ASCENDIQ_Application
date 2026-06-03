package com.placement.controller;

import com.placement.entity.*;
import com.placement.repository.*;
import com.placement.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/features")
public class FeatureController {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private AlumniRepository alumniRepository;

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private EventRepository eventRepository;

    // --- OFFERS ---
    @GetMapping("/offers")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Offer>> getOffers() {
        Long userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return ResponseEntity.ok(offerRepository.findByUserId(userId));
    }

    @PostMapping("/offers")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Offer> createOffer(@RequestBody Offer offer) {
        Long userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        offer.setUserId(userId);
        return ResponseEntity.ok(offerRepository.save(offer));
    }

    // --- CERTIFICATES ---
    @GetMapping("/certificates")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Certificate>> getCertificates() {
        Long userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return ResponseEntity.ok(certificateRepository.findByUserId(userId));
    }

    @PostMapping("/certificates")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Certificate> createCertificate(@RequestBody Certificate cert) {
        Long userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        cert.setUserId(userId);
        cert.setStatus("Pending Verification");
        return ResponseEntity.ok(certificateRepository.save(cert));
    }

    // --- ALUMNI ---
    @GetMapping("/alumni")
    @PreAuthorize("hasRole('STUDENT') or hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<List<Alumni>> getAlumni() {
        List<Alumni> list = alumniRepository.findAll();
        // Return some defaults if DB is empty to match our UI
        if (list.isEmpty()) {
            Alumni a1 = new Alumni(); a1.setName("Rahul Sharma"); a1.setBatch("2022"); a1.setCompany("Google"); a1.setRole("Software Engineer"); a1.setLocation("Bangalore"); a1.setLinkedinUrl("https://www.linkedin.com/in/rahulsharma");
            Alumni a2 = new Alumni(); a2.setName("Priya Patel"); a2.setBatch("2021"); a2.setCompany("Amazon"); a2.setRole("SDE-2"); a2.setLocation("Seattle, WA"); a2.setLinkedinUrl("https://www.linkedin.com/in/priyapatel");
            alumniRepository.saveAll(List.of(a1, a2));
            return ResponseEntity.ok(alumniRepository.findAll());
        }
        return ResponseEntity.ok(list);
    }

    // --- EVENTS ---
    @GetMapping("/events")
    @PreAuthorize("hasRole('STUDENT') or hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<List<Event>> getEvents() {
        List<Event> list = eventRepository.findAll();
        // Return defaults if empty
        if (list.isEmpty()) {
            Event e1 = new Event(); e1.setTitle("TCS NQT Pre-Placement Talk"); e1.setDate("Oct 12"); e1.setTime("10:00 AM"); e1.setType("Placement Drive"); e1.setLocation("Main Auditorium"); e1.setAttendees(450);
            Event e2 = new Event(); e2.setTitle("Mock Interview Workshop"); e2.setDate("Oct 15"); e2.setTime("02:00 PM"); e2.setType("Workshop"); e2.setLocation("Online"); e2.setAttendees(120);
            eventRepository.saveAll(List.of(e1, e2));
            return ResponseEntity.ok(eventRepository.findAll());
        }
        return ResponseEntity.ok(list);
    }
}

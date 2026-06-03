package com.placement.controller;

import com.placement.entity.Company;
import com.placement.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    @Autowired
    CompanyRepository companyRepository;

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @PutMapping("/verify/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> verifyCompany(@PathVariable Long id) {
        return companyRepository.findById(id)
                .map(company -> {
                    company.setVerified(true);
                    companyRepository.save(company);
                    return ResponseEntity.ok("Company verified");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

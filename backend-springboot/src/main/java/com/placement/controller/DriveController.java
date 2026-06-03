package com.placement.controller;

import com.placement.entity.PlacementDrive;
import com.placement.payload.response.DriveDTO;
import com.placement.repository.PlacementDriveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/drives")
public class DriveController {
    @Autowired
    PlacementDriveRepository placementDriveRepository;

    // Legacy unpaginated endpoint - deprecated, kept for backwards compatibility during migration
    @GetMapping
    public List<PlacementDrive> getAllDrives() {
        return placementDriveRepository.findAll(Sort.by("createdAt").descending());
    }

    // Enterprise Paginated Endpoint
    @GetMapping("/paged")
    public ResponseEntity<Page<DriveDTO>> getPagedDrives(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<PlacementDrive> drives = placementDriveRepository.findAll(pageable);
        
        Page<DriveDTO> dtoPage = drives.map(drive -> {
            DriveDTO dto = new DriveDTO();
            dto.setId(drive.getId());
            dto.setTitle(drive.getTitle());
            dto.setJobRole(drive.getJobRole());
            dto.setDescription(drive.getDescription());
            dto.setStatus(drive.getStatus());
            dto.setSalaryPackage(drive.getSalaryPackage());
            dto.setLocation(drive.getLocation());
            dto.setDriveDate(drive.getDriveDate());
            dto.setDeadline(drive.getDeadline());
            dto.setCreatedAt(drive.getCreatedAt());
            if (drive.getCompany() != null) {
                dto.setCompanyName(drive.getCompany().getName());
                dto.setCompanyLogo(drive.getCompany().getLogoUrl());
            }
            return dto;
        });

        return ResponseEntity.ok(dtoPage);
    }
}

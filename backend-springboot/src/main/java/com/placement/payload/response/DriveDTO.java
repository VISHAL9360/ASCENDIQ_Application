package com.placement.payload.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DriveDTO {
    private Long id;
    private String title;
    private String jobRole;
    private String description;
    private String companyName;
    private String companyLogo;
    private String status;
    private String salaryPackage;
    private String location;
    private LocalDateTime driveDate;
    private LocalDateTime deadline;
    private LocalDateTime createdAt;
}

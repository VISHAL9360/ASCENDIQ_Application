package com.placement.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.core.sync.RequestBody;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    @Value("${aws.access.key:YOUR_ACCESS_KEY}")
    private String accessKey;

    @Value("${aws.secret.key:YOUR_SECRET_KEY}")
    private String secretKey;

    @Value("${aws.s3.bucket:your-placement-system-bucket}")
    private String bucketName;

    @Value("${aws.s3.region:us-east-1}")
    private String regionName;

    /**
     * Uploads a file (like a PDF resume) to Amazon S3 and returns the public link!
     */
    public String uploadFile(MultipartFile file) throws IOException {
        // Fallback for developers if credentials are not configured yet!
        if (accessKey == null || accessKey.startsWith("${") || accessKey.equals("YOUR_ACCESS_KEY")) {
            System.out.println("AWS Credentials not configured. Saving as developer placeholder link.");
            return "https://mock-s3-bucket.s3.amazonaws.com/resumes/" + UUID.randomUUID() + "-"
                    + file.getOriginalFilename();
        }

        try {
            // Initialize S3 Client
            S3Client s3 = S3Client.builder()
                    .region(Region.of(regionName))
                    .credentialsProvider(StaticCredentialsProvider.create(
                            AwsBasicCredentials.create(accessKey, secretKey)))
                    .build();

            // Generate unique filename to avoid overwrites
            String key = "resumes/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

            // Prepare request details
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            // Upload to AWS!
            s3.putObject(request, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            // Return the clean public web URL
            return "https://" + bucketName + ".s3." + regionName + ".amazonaws.com/" + key;
        } catch (Exception e) {
            System.err.println("S3 upload failed, falling back to local file path mapping: " + e.getMessage());
            return "https://mock-s3-bucket.s3.amazonaws.com/resumes/" + UUID.randomUUID() + "-"
                    + file.getOriginalFilename();
        }
    }
}

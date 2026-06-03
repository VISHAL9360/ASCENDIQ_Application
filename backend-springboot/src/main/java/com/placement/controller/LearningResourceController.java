package com.placement.controller;

import com.placement.entity.LearningResource;
import com.placement.repository.LearningResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/resources")
public class LearningResourceController {

    @Autowired
    private LearningResourceRepository resourceRepository;

    @GetMapping
    public List<LearningResource> getAllResources() {
        return resourceRepository.findAll();
    }

    @GetMapping("/category/{category}")
    public List<LearningResource> getResourcesByCategory(@PathVariable String category) {
        return resourceRepository.findByCategory(category);
    }

    @PostMapping
    public LearningResource createResource(@RequestBody LearningResource resource) {
        return resourceRepository.save(resource);
    }
}

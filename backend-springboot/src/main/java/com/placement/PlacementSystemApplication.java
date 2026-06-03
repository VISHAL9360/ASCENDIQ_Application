package com.placement;

import com.placement.entity.ERole;
import com.placement.entity.Role;
import com.placement.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PlacementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlacementSystemApplication.class, args);
	}

	@Bean
	CommandLineRunner init(RoleRepository roleRepository) {
		return args -> {
			for (ERole roleName : ERole.values()) {
				if (!roleRepository.findByName(roleName).isPresent()) {
					roleRepository.save(new Role(null, roleName));
				}
			}
		};
	}
}

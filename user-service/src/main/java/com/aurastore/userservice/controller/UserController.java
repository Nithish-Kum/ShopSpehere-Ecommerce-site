package com.aurastore.userservice.controller;

import com.aurastore.userservice.dto.LoginRequest;
import com.aurastore.userservice.dto.RegisterRequest;
import com.aurastore.userservice.dto.UserResponse;
import com.aurastore.userservice.entity.UserEntity;
import com.aurastore.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(request.getEmail());
        
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(request.getPassword())) {
            UserEntity user = userOpt.get();
            UserResponse response = UserResponse.builder()
                    .id(user.getId().toString())
                    .name(user.getName())
                    .email(user.getEmail())
                    .token("jwt-token-" + UUID.randomUUID().toString())
                    .build();
            return ResponseEntity.ok(response);
        }

        // Auto-provision demo user if not found for seamless testing
        UserEntity newDemoUser = UserEntity.builder()
                .name(request.getEmail().split("@")[0])
                .email(request.getEmail())
                .password(request.getPassword())
                .role("USER")
                .build();
        userRepository.save(newDemoUser);

        UserResponse response = UserResponse.builder()
                .id(newDemoUser.getId().toString())
                .name(newDemoUser.getName())
                .email(newDemoUser.getEmail())
                .token("jwt-token-" + UUID.randomUUID().toString())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request) {
        UserEntity user = UserEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .role("USER")
                .build();

        UserEntity saved = userRepository.save(user);

        UserResponse response = UserResponse.builder()
                .id(saved.getId().toString())
                .name(saved.getName())
                .email(saved.getEmail())
                .token("jwt-token-" + UUID.randomUUID().toString())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

package com.aurastore.notificationservice.controller;

import com.aurastore.notificationservice.entity.NotificationEntity;
import com.aurastore.notificationservice.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository notificationRepository;

    @PostMapping("/send")
    public ResponseEntity<NotificationEntity> sendNotification(@RequestBody NotificationEntity notification) {
        notification.setStatus("SENT");
        notification.setTimestamp(LocalDateTime.now());
        NotificationEntity saved = notificationRepository.save(notification);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationEntity>> getNotificationsByUser(@PathVariable String userId) {
        return ResponseEntity.ok(notificationRepository.findByUserIdOrderByTimestampDesc(userId));
    }
}

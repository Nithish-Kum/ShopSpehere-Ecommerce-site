package com.aurastore.notificationservice.repository;

import com.aurastore.notificationservice.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findByUserIdOrderByTimestampDesc(String userId);
}

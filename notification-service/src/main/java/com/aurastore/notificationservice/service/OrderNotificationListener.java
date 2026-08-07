package com.aurastore.notificationservice.service;

import com.aurastore.notificationservice.entity.NotificationEntity;
import com.aurastore.notificationservice.event.OrderPlacedEvent;
import com.aurastore.notificationservice.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderNotificationListener {

    private final NotificationRepository notificationRepository;

    @KafkaListener(topics = "order-events", groupId = "notification-group")
    public void handleOrderPlacedEvent(OrderPlacedEvent event) {
        log.info("Received Kafka OrderPlacedEvent for Order ID: {} | Total: ₹{}", event.getOrderId(), event.getTotalAmount());

        NotificationEntity notification = NotificationEntity.builder()
                .userId(event.getUserId())
                .recipientEmail(event.getCustomerEmail() != null ? event.getCustomerEmail() : "customer@aurastore.com")
                .subject("Order Confirmation - " + event.getOrderId())
                .message("Your order " + event.getOrderId() + " for total amount ₹" + event.getTotalAmount() + " has been successfully placed!")
                .status("SENT")
                .timestamp(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
        log.info("Saved order notification confirmation record to database for Order ID: {}", event.getOrderId());
    }
}

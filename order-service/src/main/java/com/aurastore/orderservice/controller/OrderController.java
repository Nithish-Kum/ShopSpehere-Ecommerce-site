package com.aurastore.orderservice.controller;

import com.aurastore.orderservice.config.KafkaProducerConfig;
import com.aurastore.orderservice.entity.OrderEntity;
import com.aurastore.orderservice.event.OrderPlacedEvent;
import com.aurastore.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;

    @GetMapping
    public ResponseEntity<List<OrderEntity>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderEntity>> getOrdersByUser(@PathVariable String userId) {
        return ResponseEntity.ok(orderRepository.findByUserIdOrderByDateDesc(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable String id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<OrderEntity> createOrder(@RequestBody OrderEntity order) {
        if (order.getId() == null || order.getId().isEmpty()) {
            order.setId("ORD-" + (1000 + new Random().nextInt(9000)));
        }
        if (order.getDate() == null) {
            order.setDate(LocalDate.now());
        }
        if (order.getStatus() == null) {
            order.setStatus("Processing");
        }

        OrderEntity saved = orderRepository.save(order);

        // Publish OrderPlacedEvent to Kafka topic
        try {
            OrderPlacedEvent event = OrderPlacedEvent.builder()
                    .orderId(saved.getId())
                    .userId(saved.getUserId())
                    .totalAmount(saved.getTotal())
                    .orderDate(saved.getDate())
                    .status(saved.getStatus())
                    .customerEmail(saved.getUserId() != null ? saved.getUserId() + "@aurastore.com" : "customer@aurastore.com")
                    .build();

            kafkaTemplate.send(KafkaProducerConfig.ORDER_TOPIC, saved.getId(), event);
            log.info("Published OrderPlacedEvent to Kafka topic [{}] for Order ID: {}", KafkaProducerConfig.ORDER_TOPIC, saved.getId());
        } catch (Exception e) {
            log.warn("Kafka broker unreachable. Order saved to DB without real-time Kafka emission. Exception: {}", e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}

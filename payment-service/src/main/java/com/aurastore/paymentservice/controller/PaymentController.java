package com.aurastore.paymentservice.controller;

import com.aurastore.paymentservice.entity.PaymentEntity;
import com.aurastore.paymentservice.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentRepository paymentRepository;

    @PostMapping("/process")
    public ResponseEntity<PaymentEntity> processPayment(@RequestBody PaymentEntity payment) {
        payment.setTransactionId("TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        payment.setStatus("SUCCESS");
        payment.setTimestamp(LocalDateTime.now());
        if (payment.getPaymentMethod() == null) {
            payment.setPaymentMethod("CARD");
        }
        PaymentEntity saved = paymentRepository.save(payment);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<PaymentEntity> getPaymentByOrder(@PathVariable String orderId) {
        return paymentRepository.findByOrderId(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

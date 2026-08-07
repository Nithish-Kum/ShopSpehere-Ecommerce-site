package com.aurastore.notificationservice.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderPlacedEvent implements Serializable {
    private String orderId;
    private String userId;
    private Double totalAmount;
    private String customerEmail;
    private LocalDate orderDate;
    private String status;
}

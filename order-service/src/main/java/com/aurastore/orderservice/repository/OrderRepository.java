package com.aurastore.orderservice.repository;

import com.aurastore.orderservice.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, String> {
    List<OrderEntity> findByUserIdOrderByDateDesc(String userId);
}

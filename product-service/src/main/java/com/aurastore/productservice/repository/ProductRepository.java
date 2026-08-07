package com.aurastore.productservice.repository;

import com.aurastore.productservice.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, String> {
    List<ProductEntity> findByCategoryIgnoreCase(String category);
    List<ProductEntity> findByNameContainingIgnoreCase(String name);
}

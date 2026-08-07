package com.aurastore.productservice.controller;

import com.aurastore.productservice.entity.ProductEntity;
import com.aurastore.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<List<ProductEntity>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search
    ) {
        if (category != null && !category.equalsIgnoreCase("All")) {
            return ResponseEntity.ok(productRepository.findByCategoryIgnoreCase(category));
        }
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(productRepository.findByNameContainingIgnoreCase(search));
        }
        return ResponseEntity.ok(productRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductEntity> getProductById(@PathVariable String id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProductEntity> createProduct(@RequestBody ProductEntity product) {
        return ResponseEntity.ok(productRepository.save(product));
    }
}

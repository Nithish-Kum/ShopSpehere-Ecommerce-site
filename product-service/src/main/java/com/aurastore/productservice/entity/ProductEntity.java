package com.aurastore.productservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductEntity {

    @Id
    private String id;

    private String name;

    private Double price;

    private Double originalPrice;

    private String category;

    private Double rating;

    private Integer reviewsCount;

    private String tag;

    @Column(length = 1000)
    private String image;

    @Column(length = 2000)
    private String description;
}

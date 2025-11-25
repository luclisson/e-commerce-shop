package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "product_image")
public class ProductImage {
    @Column(name = "image_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int imageId;

    @Column(name = "product_id")
    int productId;

    @Column(name = "image_url")
    String imageUrl;

    @Column
    String text;

    @Column(name = "sort_order")
    String sortOrder; //?

    @Column(name = "is_main")
    Boolean isMain;
}

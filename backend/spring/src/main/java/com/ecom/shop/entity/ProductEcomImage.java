package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "product_ecommerce_image")
public class ProductEcomImage implements ProductImage {
    @Column(name = "image_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int imageId;

    @Column(name = "product_ecommercd_id")
    private int productId;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "alt_text")
    private String text;

    @Column(name = "sort_order")
    private String sortOrder; //?

    @Column(name = "is_main")
    private Boolean isMain;
}

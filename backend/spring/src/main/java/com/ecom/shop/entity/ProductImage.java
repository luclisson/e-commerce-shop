package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "product_image")
public class ProductImage {
    @Column(name = "image_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int imageId;

    @Column(name = "product_secondhand_id")
    private Integer secondHandId;

    @Column(name = "product_ecommerce_id")
    private Integer ecommerceId;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "alt_text")
    private String text;

    @Column(name = "sort_order")
    private String sortOrder; //?

    @Column(name = "is_main")
    private Boolean isMain;
}

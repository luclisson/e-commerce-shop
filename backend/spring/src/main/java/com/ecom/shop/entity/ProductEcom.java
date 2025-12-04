package com.ecom.shop.entity;

import com.ecom.shop.type.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "product_ecommerce")
public class ProductEcom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "product_ecommerce_id")
    private int productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryId")
    private Category category;

    private String title;

    private String description;

    private String price;

    private int stock;

    private String sku;

    @Column(name = "created_at")
    private Date createdAt;

    private Status status;
}

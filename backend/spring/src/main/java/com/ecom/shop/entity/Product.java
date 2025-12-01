package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table
public class Product {
    @Column(name = "product_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int productId;

    @Column(name = "account_id")
    private int accountId;

    @Column
    private String description;

    @Column
    private int price; //in cents!

    @Column
    private int amount;

    @Column
    private String condition;

    @Column
    private String title;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}

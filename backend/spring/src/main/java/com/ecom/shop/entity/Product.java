package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table
public class Product {
    @Column(name = "product_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int productId;

    @Column(name = "category_id")
    int categoryId;

    @Column(name = "account_id")
    int accountId;

    @Column
    String description;

    @Column
    int price; //in cents!

    @Column
    int amount;

    @Column
    String condition;

    @Column
    String title;

    @Column
    String status;
}

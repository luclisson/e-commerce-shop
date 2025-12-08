package com.ecom.shop.entity;

import com.ecom.shop.type.Condition;
import com.ecom.shop.type.Status;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "product_secondhand")
public class ProductSecondHand {
    @Column(name = "product_secondhand_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "account_seller_id")
    private int accountId;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private int price; //in cents!

    @Column
    private int amount;

    @Column
    private Condition condition;

    @Column
    private Status status;
}

package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table
public class Offer {
    @Column(name="offer_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int offerId;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private List<Product> product;

    @Column(name = "account_seller_id")
    private int accountId;

    @Column(name = "offer_price")
    private int offerPrice; //in cent!

    @Column(name = "offer_amount")
    private int offerAmount;

    @Column(name = "offer_title")
    private String offerTitle;

    @Column
    private String status;

}

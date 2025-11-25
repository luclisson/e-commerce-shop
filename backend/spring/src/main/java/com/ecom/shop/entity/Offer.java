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
public class Offer {
    @Column(name="offer_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int offerId;

    @Column(name = "product_id") //brauchen wir hier nicht eigentlich die product_offer id?
    int productId;

    @Column(name = "account_id")
    int accountId;

    @Column(name = "offer_price")
    int offerPrice; //in cent!

    @Column(name = "offer_amount")
    int offerAmount;

    @Column(name = "offer_title")
    String offerTitle;

}

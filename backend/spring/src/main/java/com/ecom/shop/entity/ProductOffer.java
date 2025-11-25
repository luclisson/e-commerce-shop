package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "product_offer")
public class ProductOffer {
    @Column(name = "prod_off_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int prodOffId;

    @Column(name = "offer_id")
    int offerId;

    @Column(name = "product_id")
    int productId;

    @Column
    int quantity;
}

package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "order_offer")
public class OrderOffer {
    @Column(name = "order_item_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int orderItemId;

    @Column(name = "oder_id")
    int orderId;

    @Column(name = "offer_id")
    int offerId;

    @Column
    int quantity;
}

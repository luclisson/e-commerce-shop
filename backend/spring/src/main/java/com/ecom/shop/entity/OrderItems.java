package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "order_items")
public class OrderItems {
    @Column(name = "order_item_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderItemId;

    @Column(name = "order_id")
    private int orderId;

    @Column(name = "product_secondhand_id")
    private int productShId;

    @Column(name = "product_ecommerce_id")
    private int productEcId;

    @Column
    private int quantity; //wir brauchen aber leider zweimal quantity oder quantity bezieht sich nur auf ecommerce

    @Column(name = "price_at_sale")
    private int priceAtSale;

}

package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table
public class Order {
    @Column(name = "order_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int orderId;

    @Column(name = "payment_method")
    String paymentMethod;

    @Column(name = "order_price")
    int orderPrice;

    @Column
    Date date;

    @Column
    String status;
}

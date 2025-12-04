package com.ecom.shop.entity;

import com.ecom.shop.type.PaymentMethod;
import com.ecom.shop.type.Status;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "orders")
public class Order {
    @Column(name = "order_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderId;

    @Column(name = "account_buyer_id")
    private int buyerId;

    @Column(name = "order_price")
    private int orderPrice;

    @Column(name = "datum")
    private Date date;

    @Column
    private Status status;

    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;
}

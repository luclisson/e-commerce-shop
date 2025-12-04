package com.ecom.shop.dto;

import com.ecom.shop.type.PaymentMethod;
import com.ecom.shop.type.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private String buyerUsername;

    private int orderPrice;

    private Date date;

    private Status status;

    private PaymentMethod paymentMethod;
}


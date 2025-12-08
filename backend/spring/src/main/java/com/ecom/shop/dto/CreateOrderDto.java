package com.ecom.shop.dto;

import com.ecom.shop.type.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateOrderDto {

    String buyerUsername;
    PaymentMethod paymentMethod;
    Integer secondhandProductId;
    Integer ecommerceProductId;
    int quantity;
}

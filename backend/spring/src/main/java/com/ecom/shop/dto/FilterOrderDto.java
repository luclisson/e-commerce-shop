package com.ecom.shop.dto;

import com.ecom.shop.type.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FilterOrderDto {
    int buyerId;
    int productId;
    Status status;
    Date orderDate;
}

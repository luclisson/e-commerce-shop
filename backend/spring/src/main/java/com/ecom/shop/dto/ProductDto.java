package com.ecom.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    int categoryId;
    int accountId;
    String description;
    int price;
    int amount;
    String condition;
    String title;
    String status;
}


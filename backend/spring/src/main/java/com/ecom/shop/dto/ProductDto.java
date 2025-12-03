package com.ecom.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    int productId;
    String description;
    int price;
    int amount;
    String condition;
    String title;
    List<ProductImageDto> images;
}


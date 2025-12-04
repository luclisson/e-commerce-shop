package com.ecom.shop.dto;

import com.ecom.shop.entity.Category;
import com.ecom.shop.type.Condition;
import com.ecom.shop.type.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductSecHandDto {
    private int productId;

    private String sellerUsername;

    private String category;

    private String title;

    private String description;

    private int price; //in cents!

    private Condition condition;

    private Status status;

    private List<ProductImageDto> images;
}

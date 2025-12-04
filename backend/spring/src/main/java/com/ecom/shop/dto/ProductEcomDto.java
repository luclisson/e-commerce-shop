package com.ecom.shop.dto;

import com.ecom.shop.entity.Category;
import com.ecom.shop.type.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductEcomDto {
    private int productId;

    private Category category;

    private String title;

    private String description;

    private String price;

    private int stock;

    private Status status;

    private List<ProductImageDto> images;
}

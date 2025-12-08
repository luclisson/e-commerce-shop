package com.ecom.shop.dto;

import com.ecom.shop.type.Condition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateOfferDto {
    int categoryId;
    int sellerId;
    String title;
    String description;
    int price; //in cents
    int amount;
    Condition condition;
    String[] imageUrls;
    String[] alts;
    int mainIndex;
}

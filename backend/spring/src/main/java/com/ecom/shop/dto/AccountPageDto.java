package com.ecom.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountPageDto {
    AccountDto accountData;
    List<ProductSecHandDto> products;
}

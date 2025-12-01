package com.ecom.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {
    String firstName;
    String lastName;
    AddressDto addressDto;
    String email;
    Date birthday;
    String gender;
    Boolean isGuest;
}


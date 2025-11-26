package com.ecom.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CredentialsDto {
    String username;
    String password;
    Timestamp lastLogin;

    @Override
    public String toString() {
        return "CredentialsDto{" +
                "username='" + username + '\'' +
                ", password='" + "[PROTECTED]" + '\'' +
                ", lastLogin=" + (lastLogin != null ? lastLogin.toString() : "null") +
                '}';
    }
}

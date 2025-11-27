package com.ecom.shop.entity;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="account_credentials")
public class Credentials {
    @Column(name = "credentials_id")
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int credentialId;

    @Column(name = "account_id")
    private int accountId;

    @Column
    private String username;

    @Column(name = "password_hash")
    private String password;

    @Column(name = "last_login")
    private Timestamp lastLogin;
}

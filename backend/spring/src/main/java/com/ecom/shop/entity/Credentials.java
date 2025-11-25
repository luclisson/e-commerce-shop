package com.ecom.shop.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="account-credentials")
public class Credentials {
    @Column
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    int credentialId;

    @Column(name = "account_id")
    int accountId;

    @Column
    String username;

    @Column
    String password;

    @Column(name = "last_login")
    Timestamp lastLogin;
}

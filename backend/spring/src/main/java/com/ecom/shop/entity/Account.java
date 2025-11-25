package com.ecom.shop.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="account")
public class Account {
    @Column
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    int accountId;

    @Column(name="address_id")
    String addressId;

    @Column
    String name;

    @Column
    String email;

    @Column
    Date birthday;


}

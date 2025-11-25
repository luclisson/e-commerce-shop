package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="address")
public class Address {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column
    int addressId;

    @Column
    String street;

    @Column
    String postcode;

    @Column
    String province;
}

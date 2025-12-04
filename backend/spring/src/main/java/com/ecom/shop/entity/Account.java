package com.ecom.shop.entity;


import com.ecom.shop.type.Gender;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="account")
public class Account {
    @Column(name = "account_id")
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int accountId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    Address address;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    @Column
    private String email;

    @Column
    private Date birthday;

    @Column(name = "is_guest")
    private Boolean isGuest;

    private Gender gender;
}

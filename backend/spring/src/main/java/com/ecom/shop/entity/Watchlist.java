package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name= "watchlist")
public class Watchlist {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="watchlist_id")
    private int watchlistId;

    @Column(name = "account_id")
    private int accountId;

    @Column(name = "offer_id")
    private int offerId;
}

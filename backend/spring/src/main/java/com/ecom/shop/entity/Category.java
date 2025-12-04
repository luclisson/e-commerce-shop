package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table
public class Category {
    // ist nicht 1:1 gemapped. ich habe die img url und parentId nicht gemapped
    @Column(name = "category_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int categoryId;

    @Column
    private String name;

    @Column
    private String description;
}

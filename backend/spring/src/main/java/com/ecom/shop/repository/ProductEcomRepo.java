package com.ecom.shop.repository;

import com.ecom.shop.entity.ProductEcom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductEcomRepo extends JpaRepository<ProductEcom,Integer> {
    @Query(value = "select p from ProductEcom p where p.stock >= 1")
    List<ProductEcom> getAllAvailableProducts();
}

package com.ecom.shop.repository;

import com.ecom.shop.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductImagesRepo extends JpaRepository<ProductImage,Integer> {
    @Query(value = "select pi from ProductImage pi where pi.secondHandId=:productId")
    List<ProductImage> findAllBySecHandId(
            @Param("productId") Integer productId
            );
}

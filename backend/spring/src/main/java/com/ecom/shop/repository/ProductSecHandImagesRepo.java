package com.ecom.shop.repository;

import com.ecom.shop.entity.ProductSecondHandImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductSecHandImagesRepo extends JpaRepository<ProductSecondHandImage,Integer> {
    @Query(value = "select pi from ProductSecondHandImage pi where pi.productId=:productId")
    List<ProductSecondHandImage> findAllByProductId(
            @Param("productId") Integer productId
            );
}

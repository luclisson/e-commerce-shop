package com.ecom.shop.repository;

import com.ecom.shop.entity.ProductSecondHand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSecHandRepo extends JpaRepository<ProductSecondHand, Integer>, JpaSpecificationExecutor<ProductSecondHand> {
    @Query("select p " +
            "from ProductSecondHand p " +
            "where p.status = 0") //0 is the index of active in the enum java class
    List<ProductSecondHand> getAllAvailableProducts();

    @Query("select p " +
            "from ProductSecondHand p " +
            "join Credentials c on p.accountId = c.accountId " +
            "where p.status = 0 " +
            "and c.username = :username")
    List<ProductSecondHand> getAllByUsername(@Param("username")String username);

    /*
    @Query("select ")
     */
}

package com.ecom.shop.repository;

import com.ecom.shop.dto.ProductFilterDto;
import com.ecom.shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {
    @Query("select p " +
            "from Product p " +
            "join ProductOffer po on po.productId = p.productId " +
            "join Offer o on po.offerId = o.offerId " +
            "where o.status = 'Aktiv'")
    List<Product> getAllAvailableProducts();

    @Query("select p " +
            "from Product p " +
            "join ProductOffer po on po.productId = p.productId " +
            "join Offer o on po.offerId = o.offerId " +
            "join Credentials c on c.accountId = o.accountId " +
            "where o.status = 'Aktiv' " +
            "and c.username = :username")
    List<Product> getAllByUsername(@Param("username")String username);


    @Query(value = "select p from ProductOffer po join Product p on p.productId = po.productId where po.offerId= :offerId")
    List<Product> getProductByOfferId(@Param("offerId") int OfferId);

}

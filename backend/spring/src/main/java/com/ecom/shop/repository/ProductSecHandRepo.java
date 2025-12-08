package com.ecom.shop.repository;

import com.ecom.shop.entity.ProductSecondHand;
import com.ecom.shop.type.Condition;
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

    @Query(value = """
            SELECT nichtdiebohne.create_product_secondhand(
                _category_id       := :categoryId,
                _account_seller_id := :accountSellerId,
                _title             := :title,
                _description       := :description,
                _price             := :price,
                _amount            := :amount,
                _condition         := :condition, 
                _image_urls        := NULL,
                _image_alts        := NULL,
                _main_index        := :mainIndex
            )
        """, nativeQuery = true)
    void createProduct(
            @Param("categoryId") int categoryId,
            @Param("accountSellerId") int accountSellerId,
            @Param("title") String title,
            @Param("description") String description,
            @Param("price") int price,
            @Param("amount") int amount,
            @Param("condition") Condition condition,
            @Param("mainIndex") int mainIndex
    );

    
}

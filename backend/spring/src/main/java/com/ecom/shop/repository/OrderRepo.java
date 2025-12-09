package com.ecom.shop.repository;

import com.ecom.shop.entity.Order;
import com.ecom.shop.type.PaymentMethod;
import com.ecom.shop.type.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
import java.util.Date;
import java.util.List;

public interface OrderRepo extends JpaRepository<Order, Integer> , CrudRepository<Order,Integer> {
        @Query(value = """
        SELECT nichtdiebohne.create_mixed_order(
            _account_buyer_id    := :account_buyer_id,
            _payment_method      := :payment_method,
            _sh_ids              := :secondhand_product_id,
            _sh_quantities       := :secondhand_quantity,
            _ecom_ids            := NULL::integer[],
            _ecom_quantities     := NULL::integer[]
        ) AS new_order_id;
            """, nativeQuery = true)

        void createOrderSecHand(
                @Param("account_buyer_id") int account_buyer_id,
                @Param("payment_method") PaymentMethod payment_method,
                @Param("secondhand_product_id") Integer[] secondhand_product_id,
                @Param("secondhand_quantity") int[] secondhandQuantity
        );


        @Query(value = """
            SELECT nichtdiebohne.create_mixed_order(
                _account_buyer_id    := :account_buyer_id,
                _payment_method      := :payment_method,
                _sh_ids              := NULL::integer[],
                _sh_quantities       := NULL::integer[],
                _ecom_ids            := :ecommerce_product_id,
                _ecom_quantities     := :ecomm_quantity
            ) AS new_order_id;
        """, nativeQuery = true)
        void createOrderEcom(
                @Param("account_buyer_id") int account_buyer_id,
                @Param("payment_method") PaymentMethod payment_method,
                @Param("ecommerce_product_id") Integer[] ecommerce_product_id,
                @Param("ecomm_quantity") int[] ecommQuantity
        );
    @Query(value = """
        SELECT o.orderId FROM Order o
         inner join OrderItem oi on o.orderId = oi.orderId
         where
         oi.productShId = :productId AND
         o.date = :orderDate AND 
         o.buyerId = :buyerId AND 
         o.status = :status 
         
    """)
    List<Integer> findOrderIdByFilter(
            @Param("productId") int productId,
            @Param("orderDate") Date orderDate,
            @Param("buyerId") Integer buyerId,
            @Param("status") Status status,
            Pageable pageable
    );

    @Query(value = """
        Select nichtdiebohne.cancel_order(
            p_order_id := :orderId
        )
    """,nativeQuery = true)
    void cancelOrderByID(@Param("orderId") Integer orderId);
}

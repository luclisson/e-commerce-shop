package com.ecom.shop.repository;

import com.ecom.shop.entity.Order;
import com.ecom.shop.type.PaymentMethod;
import com.ecom.shop.type.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface OrderRepo extends JpaRepository<Order, Integer> {
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
/*
    @Query(value = """
        SELECT o.orderId FROM Order o WHERE 
        (:orderDate::date IS NULL OR o.date = :orderDate) AND 
        (:buyerId IS NULL OR o.buyerId = :buyerId) AND 
        (:status IS NULL OR o.status = :status)
    """)
    int findOrderIdByFilter(
            @Param("orderDate") Date orderDate,
            @Param("buyerId") Integer buyerId,
            @Param("status") Status status
    );
 */
}

package com.ecom.shop.service;

import com.ecom.shop.dto.FilterOrderDto;
import com.ecom.shop.repository.AccountRepo;
import com.ecom.shop.repository.OrderRepo;
import com.ecom.shop.type.PaymentMethod;
import lombok.RequiredArgsConstructor;
import org.aspectj.apache.bcel.classfile.JavaClass;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepo orderRepo;
    private final AccountRepo accountRepo;
    private static final Logger logger = Logger.getLogger(JavaClass.class.getName());

    public void createOrderSecHand(String accountUsername, PaymentMethod paymentMethod, Integer[] secondhandProductId, int[] secondhandQuantity) {
        int accountId = accountRepo.findByUsername(accountUsername).getAccountId();
         orderRepo.createOrderSecHand(accountId,paymentMethod,secondhandProductId,secondhandQuantity);
    }

    public void createOrderEcom(String accountUsername, PaymentMethod paymentMethod, Integer[] ecommerceProductId, int[] ecommerceQuantity) {
        int accountId = accountRepo.findByUsername(accountUsername).getAccountId();
         orderRepo.createOrderEcom(accountId,paymentMethod,ecommerceProductId,ecommerceQuantity);
    }

    public void cancelOrderByFilter(FilterOrderDto filter) {
        int orderId = orderRepo.findOrderIdByFilter(
                filter.getOrderDate(),
                filter.getBuyerId(),
                filter.getStatus());
        logger.info("orderId: " + orderId);
    }
}

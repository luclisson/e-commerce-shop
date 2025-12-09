package com.ecom.shop.service;

import com.ecom.shop.dto.FilterOrderDto;
import com.ecom.shop.entity.Account;
import com.ecom.shop.repository.AccountRepo;
import com.ecom.shop.repository.OrderRepo;
import com.ecom.shop.type.PaymentMethod;
import lombok.RequiredArgsConstructor;
import org.aspectj.apache.bcel.classfile.JavaClass;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepo orderRepo;
    private final AccountRepo accountRepo;
    private static final Logger logger = Logger.getLogger(JavaClass.class.getName());

    public void createOrderSecHand(String accountUsername, PaymentMethod paymentMethod, Integer[] secondhandProductId, int[] secondhandQuantity) {
        int accountId = accountRepo.findByUsername(accountUsername).map(Account::getAccountId).orElseThrow();
         orderRepo.createOrderSecHand(accountId,paymentMethod,secondhandProductId,secondhandQuantity);
    }

    public void createOrderEcom(String accountUsername, PaymentMethod paymentMethod, Integer[] ecommerceProductId, int[] ecommerceQuantity) {
        int accountId = accountRepo.findByUsername(accountUsername).map(Account::getAccountId).orElseThrow();
         orderRepo.createOrderEcom(accountId,paymentMethod,ecommerceProductId,ecommerceQuantity);
    }

    //absolut nicht die schoenste loesung aber ich baue aktuell nur um die datenbank herumt
    public void cancelOrderByFilter(FilterOrderDto filter) {
        List<Integer> ids = orderRepo.findOrderIdByFilter(
                filter.getProductId(),
                filter.getOrderDate(),
                filter.getBuyerId(),
                filter.getStatus(),
                PageRequest.of(0,1)
        );
        Integer orderId = ids.isEmpty() ? null : ids.get(0);
        logger.info("orderId: " + orderId);
        orderRepo.cancelOrderByID(orderId);
    }
}

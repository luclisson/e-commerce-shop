package com.ecom.shop.service;

import com.ecom.shop.repository.AccountRepo;
import com.ecom.shop.repository.OrderRepo;
import com.ecom.shop.type.PaymentMethod;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepo orderRepo;
    private final AccountRepo accountRepo;

    public void createOrderSecHand(String accountUsername, PaymentMethod paymentMethod, Integer[] secondhandProductId, int[] secondhandQuantity) {
        int accountId = accountRepo.findByUsername(accountUsername).getAccountId();
         orderRepo.createOrderSecHand(accountId,paymentMethod,secondhandProductId,secondhandQuantity);
    }

    public void createOrderEcom(String accountUsername, PaymentMethod paymentMethod, Integer[] ecommerceProductId, int[] ecommerceQuantity) {
        int accountId = accountRepo.findByUsername(accountUsername).getAccountId();
         orderRepo.createOrderEcom(accountId,paymentMethod,ecommerceProductId,ecommerceQuantity);
    }
}

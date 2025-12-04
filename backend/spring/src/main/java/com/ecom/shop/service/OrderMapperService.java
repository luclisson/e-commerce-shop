// ...existing code...
package com.ecom.shop.service;

import com.ecom.shop.dto.AccountDto;
import com.ecom.shop.dto.OrderDto;
import com.ecom.shop.entity.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderMapperService {

    private final AccountService accountService;
    public OrderDto toOrderDto(Order o) {
        if (o == null) return null;
        return new OrderDto(
                accountService.getAccountById(o.getBuyerId())
                        .map(AccountDto::getUsername)
                        .orElse(""),
                o.getOrderPrice(),
                o.getDate(),
                o.getStatus(),
                o.getPaymentMethod()
        );
    }
}


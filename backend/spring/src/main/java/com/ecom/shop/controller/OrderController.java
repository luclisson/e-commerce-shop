package com.ecom.shop.controller;

import com.ecom.shop.dto.CreateOrderDto;
import com.ecom.shop.dto.FilterOrderDto;
import com.ecom.shop.dto.OrderDto;
import com.ecom.shop.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    /*
    create order
     */

    @PostMapping("/createOrder/secondHand")
    public void createOrder(@RequestBody CreateOrderDto order) {
        orderService.createOrderSecHand(
                order.getBuyerUsername(),
                order.getPaymentMethod(),
                new Integer[]{order.getSecondhandProductId()}, //prototype only one item in an order
                new int[]{order.getQuantity()}
        );
    }
    @PostMapping("/createOrder/ecom")
    public void createOrderEcom(@RequestBody CreateOrderDto order) {
        orderService.createOrderEcom(
                order.getBuyerUsername(),
                order.getPaymentMethod(),
                new Integer[]{order.getEcommerceProductId()}, //prototype only one item in an order
                new int[]{order.getQuantity()}
        );
    }

    @PostMapping("/cancelOrder")
    public void cancelOrder(@RequestBody FilterOrderDto order) {
        orderService.cancelOrderByFilter(order);
    }



    /*
    cancel order by id
     */
}

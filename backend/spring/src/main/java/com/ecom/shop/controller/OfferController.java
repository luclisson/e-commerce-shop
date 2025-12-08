package com.ecom.shop.controller;

import com.ecom.shop.dto.CreateOfferDto;
import com.ecom.shop.dto.FilterOrderDto;
import com.ecom.shop.service.ProductSecHandService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/offer")
public class OfferController {

    private final ProductSecHandService productSecHandService;

    @PostMapping("/createOffer")
    public void createOffer(@RequestBody CreateOfferDto createOfferDto){
        productSecHandService.createProduct(createOfferDto);
    }

}

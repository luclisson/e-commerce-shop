package com.ecom.shop.controller;

import com.ecom.shop.dto.ProductDto;
import com.ecom.shop.dto.ProductFilterDto;
import com.ecom.shop.dto.WatchlistDto;
import com.ecom.shop.service.ProductService;
import com.ecom.shop.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/offer")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/getAvailableProducts")
    public List<ProductDto> getAllProduct(){
        return productService.getAllAvailableOffers();
    }

    @GetMapping("/getAvailableProducts/{username}")
    public List<ProductDto>getAllProductByUsername(@PathVariable String username){
        return productService.getAllAvailableOffersByUsername(username);
    }

    @GetMapping("/getAvailableProductsByFilter")
    public List<ProductDto> getProductsByFilter(@RequestBody ProductFilterDto filter){
        return productService.getProductsByFilter(filter);
    }
}

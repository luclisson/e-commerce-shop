package com.ecom.shop.controller;

import com.ecom.shop.dto.CreateOfferDto;
import com.ecom.shop.dto.ProductEcomDto;
import com.ecom.shop.dto.ProductSecHandDto;
import com.ecom.shop.dto.ProductFilterDto;
import com.ecom.shop.service.ProductEcomService;
import com.ecom.shop.service.ProductSecHandService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductSecHandService productSecHandService;
    private final ProductEcomService productEcomService;

    @GetMapping("/getAvailableProducts")
    public List<ProductSecHandDto> getAllProduct(){
        return productSecHandService.getAllAvailableOffers();
    }

    @GetMapping("/getAvailableProducts/{username}")
    public List<ProductSecHandDto>getAllProductByUsername(@PathVariable String username){
        return productSecHandService.getAllAvailableOffersByUsername(username);
    }

    @GetMapping("/getAvailableProductsByFilter")
    public List<ProductSecHandDto> getProductsByFilter(@RequestBody ProductFilterDto filter){
        return productSecHandService.getProductsByFilter(filter);
    }

    @GetMapping("/getProductById/{id}")
    public Optional<ProductSecHandDto> getProductById(@PathVariable int id){
        return productSecHandService.getProductById(id);
    }

    @GetMapping("/getAvailableEcom")
    public List<ProductEcomDto> getAllAvailableEcomProducts(){
        return productEcomService.getAllAvailableEcomProducts();
    }
    @GetMapping("/getEcomById/{id}")
    public Optional<ProductEcomDto> getEcomById(@PathVariable int id) {
        return productEcomService.getEcomById(id);
    }

}

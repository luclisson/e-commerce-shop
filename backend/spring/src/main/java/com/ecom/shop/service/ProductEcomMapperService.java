package com.ecom.shop.service;

import com.ecom.shop.dto.ProductEcomDto;
import com.ecom.shop.entity.ProductEcom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductEcomMapperService {
    private final ProductImagesService productImagesService;
    public ProductEcomDto productEcomDto(ProductEcom p){
        if (p == null) return null;
        return new ProductEcomDto(
                p.getProductId(),
                p.getCategory().getName(),
                p.getTitle(),
                p.getDescription(),
                p.getPrice(),
                p.getStock(),
                p.getStatus(),
                productImagesService.getImagesByEcomId(p.getProductId())
        );
    }
}

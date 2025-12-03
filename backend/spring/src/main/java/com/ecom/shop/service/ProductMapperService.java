// ...existing code...
package com.ecom.shop.service;

import com.ecom.shop.dto.ProductDto;
import com.ecom.shop.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductMapperService {

    private final ProductImagesService productImagesService;

    public ProductDto toProductDto(Product p) {
        if (p == null) return null;
        return new ProductDto(
                p.getProductId(),
                p.getDescription(),
                p.getPrice(),
                p.getAmount(),
                p.getCondition(),
                p.getTitle(),
                productImagesService.getImagesById(p.getProductId())
        );
    }
}


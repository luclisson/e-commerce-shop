package com.ecom.shop.service;

import com.ecom.shop.dto.ProductImageDto;
import com.ecom.shop.entity.ProductImage;
import org.springframework.stereotype.Service;

@Service
public class ProductImageMapperService {

    public ProductImageDto toProductImageDto(ProductImage pi) {
        if (pi == null) return null;
        return new ProductImageDto(
                pi.getImageUrl(),
                pi.getText(),
                pi.getSortOrder(),
                pi.getIsMain()
        );
    }
}

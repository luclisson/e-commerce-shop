package com.ecom.shop.service;

import com.ecom.shop.dto.ProductSecHandDto;
import com.ecom.shop.entity.ProductSecondHand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductSecHandMapperService {

    private final ProductImagesService productImagesService;
    private final CredentialService credentialService;

    public ProductSecHandDto toProductSecHandDto(ProductSecondHand p) {
        if (p == null) return null;
        return new ProductSecHandDto(
                p.getProductId(),
                credentialService.findUsernameByAccountId(p.getAccountId()),
                p.getCategory().getName(),
                p.getTitle(),
                p.getDescription(),
                p.getPrice(),
                p.getCondition(),
                p.getStatus(),
                productImagesService.getImagesById(p.getProductId())
        );
    }
}

package com.ecom.shop.service;

import com.ecom.shop.dto.ProductImageDto;
import com.ecom.shop.repository.ProductImagesRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductImagesService {
    private final ProductImagesRepo productImagesRepo;
    private final ProductImageMapperService productImageMapperService;

    public List<ProductImageDto> getImagesById(Integer id){
        return productImagesRepo.findAllBySecHandId(id)
                                .stream().map(productImageMapperService::toProductImageDto)
                                .collect(Collectors.toList());
    }
}

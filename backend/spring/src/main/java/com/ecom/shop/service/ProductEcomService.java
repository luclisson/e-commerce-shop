package com.ecom.shop.service;

import com.ecom.shop.dto.ProductEcomDto;
import com.ecom.shop.repository.ProductEcomRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductEcomService {
    private final ProductEcomRepo productEcomRepo;
    private final ProductEcomMapperService productEcomMapperService;

    public List<ProductEcomDto> getAllAvailableEcomProducts(){
        return productEcomRepo.getAllAvailableProducts()
                .stream().map(productEcomMapperService::productEcomDto)
                .collect(Collectors.toList());
    }

    public Optional<ProductEcomDto> getEcomById(int id){
        return productEcomRepo.findById(id)
                .map(productEcomMapperService::productEcomDto);
    }
}

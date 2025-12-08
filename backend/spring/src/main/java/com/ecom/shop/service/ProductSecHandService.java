package com.ecom.shop.service;

import com.ecom.shop.dto.ProductSecHandDto;
import com.ecom.shop.dto.ProductFilterDto;
import com.ecom.shop.repository.ProductSecHandRepo;
import com.ecom.shop.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductSecHandService {
    private final ProductSecHandRepo productSecHandRepo;
    private final ProductSecHandMapperService productSecHandMapperService;
    private final ProductSpecification productSpecification;

    public List<ProductSecHandDto> getAllAvailableOffers(){
        return productSecHandRepo.getAllAvailableProducts()
                            .stream().map(productSecHandMapperService::toProductSecHandDto)
                            .collect(Collectors.toList());
    }

    public List<ProductSecHandDto> getAllAvailableOffersByUsername(String username){
        return productSecHandRepo.getAllByUsername(username)
                            .stream().map(productSecHandMapperService::toProductSecHandDto)
                            .collect(Collectors.toList());
    }

    public List<ProductSecHandDto> getProductsByFilter(ProductFilterDto filter){
        return productSecHandRepo.findAll(productSpecification.filterProducts(filter))
                .stream().map(productSecHandMapperService::toProductSecHandDto)
                .collect(Collectors.toList());
    }

    public Optional<ProductSecHandDto> getProductById(int id){
        return productSecHandRepo.findById(id).map(productSecHandMapperService::toProductSecHandDto);
    }




}

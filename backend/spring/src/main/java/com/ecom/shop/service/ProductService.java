package com.ecom.shop.service;

import com.ecom.shop.dto.ProductDto;
import com.ecom.shop.dto.ProductFilterDto;
import com.ecom.shop.repository.ProductRepo;
import com.ecom.shop.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepo productRepo;
    private final ProductMapperService productMapperService;
    private final ProductSpecification productSpecification;

    public List<ProductDto> getAllAvailableOffers(){
        return productRepo.getAllAvailableProducts()
                            .stream().map(productMapperService :: toProductDto)
                            .collect(Collectors.toList());
    }

    public List<ProductDto> getAllAvailableOffersByUsername(String username){
        return productRepo.getAllByUsername(username)
                            .stream().map(productMapperService::toProductDto)
                            .collect(Collectors.toList());
    }

    public List<ProductDto> getProductsByFilter(ProductFilterDto filter){
        return productRepo.findAll(productSpecification.filterProducts(filter))
                .stream().map(productMapperService::toProductDto)
                .collect(Collectors.toList());
    }

    public Optional<ProductDto> getProductById(int id){
        return productRepo.findById(id).map(productMapperService::toProductDto);
    }


}

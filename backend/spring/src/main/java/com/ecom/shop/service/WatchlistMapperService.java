package com.ecom.shop.service;

import com.ecom.shop.dto.ProductDto;
import com.ecom.shop.dto.WatchlistDto;
import com.ecom.shop.entity.Watchlist;
import com.ecom.shop.repository.ProductRepo;
import com.ecom.shop.repository.WatchlistRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WatchlistMapperService {
    private final WatchlistRepo watchlistRepo;

    //return ProductDto list
    private final ProductRepo productRepo;
    private final ProductMapperService productMapperService;
    public WatchlistDto toWatchListDto(List<Watchlist> watchlist) {
        List<ProductDto> resultList = new ArrayList<>();
        for(Watchlist element: watchlist){
           List<ProductDto> productsFromOfferMarked =  productRepo.getProductByOfferId(element.getOfferId())
                   .stream().map(productMapperService::toProductDto).collect(Collectors.toList());
           resultList.addAll(productsFromOfferMarked);
        }

        return new WatchlistDto(
                resultList
        );
    }

}

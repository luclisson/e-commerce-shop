package com.ecom.shop.service;

import com.ecom.shop.dto.ProductSecHandDto;
import com.ecom.shop.dto.WatchlistDto;
import com.ecom.shop.entity.Watchlist;
import com.ecom.shop.repository.ProductSecHandRepo;
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
    private final ProductSecHandRepo productSecHandRepo;
    private final ProductSecHandMapperService productSecHandMapperService;
    public WatchlistDto toWatchListDto(List<Watchlist> watchlist) {
        return new WatchlistDto(
                watchlist.stream().map(Watchlist::getProduct)
                        .map(productSecHandMapperService::toProductSecHandDto)
                        .collect(Collectors.toList())
        );
    }

}

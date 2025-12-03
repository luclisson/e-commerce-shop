package com.ecom.shop.service;

import com.ecom.shop.dto.WatchlistDto;
import com.ecom.shop.repository.WatchlistRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WatchlistService {

    private final WatchlistRepo watchlistRepo;
    private final WatchlistMapperService watchlistMapperService;

    public WatchlistDto getWatchlistByUsername(String username){
        return watchlistMapperService.toWatchListDto(watchlistRepo.getWatchlistByUsername(username));
    }
}

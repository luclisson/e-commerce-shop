package com.ecom.shop.controller;

import com.ecom.shop.dto.WatchlistDto;
import com.ecom.shop.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/watchlist")
@RequiredArgsConstructor
public class WatchlistContoller {
    private final WatchlistService watchlistService;

    @GetMapping("/getWatchlist/{username}")
    public WatchlistDto getWatchlist(@PathVariable String username){
        return watchlistService.getWatchlistByUsername(username);
    }
}

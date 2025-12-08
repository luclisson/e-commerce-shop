package com.ecom.shop.controller;

import com.ecom.shop.dto.WatchlistDto;
import com.ecom.shop.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/watchlist")
@RequiredArgsConstructor
public class WatchlistContoller {
    private final WatchlistService watchlistService;

    @GetMapping("/getWatchlist/{username}")
    public WatchlistDto getWatchlist(@PathVariable String username){
        return watchlistService.getWatchlistByUsername(username);
    }

    @PostMapping("/add/{username}/{productId}")
    public void addToWatchlist(@PathVariable String username, @PathVariable Integer productId){
        watchlistService.addToWatchlist(username, productId);}

    @PostMapping("/remove/{username}/{productId}")
    public void removeFromWatchlist(@PathVariable String username, @PathVariable Integer productId){
        watchlistService.removeFromWatchlist(username, productId);
    }
}

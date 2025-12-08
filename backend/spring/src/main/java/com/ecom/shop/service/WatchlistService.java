package com.ecom.shop.service;

import com.ecom.shop.dto.WatchlistDto;
import com.ecom.shop.entity.Watchlist;
import com.ecom.shop.repository.AccountRepo;
import com.ecom.shop.repository.ProductSecHandRepo;
import com.ecom.shop.repository.WatchlistRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WatchlistService {

    private final WatchlistRepo watchlistRepo;
    private final AccountRepo accountRepo;
    private final ProductSecHandRepo productSecHandRepo;
    private final WatchlistMapperService watchlistMapperService;

    public WatchlistDto getWatchlistByUsername(String username){
        return watchlistMapperService.toWatchListDto(watchlistRepo.getWatchlistByUsername(username));
    }
    public void addToWatchlist(String username, Integer productId){
        Watchlist watchlistItem = new Watchlist();
        watchlistItem.setAccountId(accountRepo.findByUsername(username).getAccountId());
        watchlistItem.setProduct(productSecHandRepo.findById(productId).orElseThrow());
        watchlistRepo.save(watchlistItem);
    }

    public void removeFromWatchlist(String username, Integer productId){
        int accountId = accountRepo.findByUsername(username).getAccountId();
        Watchlist watchlistItem = watchlistRepo.getWatchlistByUsername(username).stream()
                .filter(w -> w.getProduct().getProductId() == productId && w.getAccountId() == accountId)
                .findFirst()
                .orElseThrow();
        watchlistRepo.delete(watchlistItem);
    }

}

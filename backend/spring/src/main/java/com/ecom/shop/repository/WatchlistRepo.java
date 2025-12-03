package com.ecom.shop.repository;

import com.ecom.shop.dto.WatchlistDto;
import com.ecom.shop.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WatchlistRepo extends JpaRepository<Watchlist,Integer> {
    @Query(value = "select w from Watchlist w join Credentials c on w.accountId = c.accountId where c.username = :username")
    List<Watchlist> getWatchlistByUsername(@Param("username") String username);
}

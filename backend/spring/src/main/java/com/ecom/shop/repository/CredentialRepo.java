package com.ecom.shop.repository;

import com.ecom.shop.entity.Credentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CredentialRepo extends JpaRepository<Credentials,Integer> {
    @Query(value = "Select c from Credentials c where c.username = :username",nativeQuery = false)
    public Credentials findByUsername(@Param("username") String username);

    @Query(value = "Select c.username from Credentials c where c.accountId = :accountId")
    public String findUsernameByAccountId(@Param("accountId")int accountId);
}

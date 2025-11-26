package com.ecom.shop.service;

import com.ecom.shop.entity.Account;
import com.ecom.shop.repository.AccountRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepo accountRepo;

    public Optional<Account> getAccountById(Integer id){
        return accountRepo.findById(id);
    }

    public void createAccount(String street
                            , String postcode
                            , String province
                            , String firstName
                            , String lastName
                            , String email
                            , Date birthday
                            , String username
                            , String password
                            , Boolean isGuest){
        accountRepo.createAccount(street, postcode, province,firstName, lastName, email, birthday, username, password, isGuest);
    }
}

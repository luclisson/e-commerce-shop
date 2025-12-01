package com.ecom.shop.service;

import com.ecom.shop.dto.AccountDto;
import com.ecom.shop.dto.AccountPageDto;
import com.ecom.shop.entity.Account;
import com.ecom.shop.repository.AccountRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepo accountRepo;
    private final AccountMapperService accountMapperService;
    private final ProductService productService;

    public Optional<AccountDto> getAccountById(Integer id){
        return accountRepo.findById(id)
                .map(accountMapperService::toAccountDto);
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

    public AccountPageDto getAccountPageData(String username){
        return new AccountPageDto(
                accountMapperService.toAccountDto(accountRepo.findByUsername(username)),
                productService.getAllAvailableOffersByUsername(username)
        );
    };
}

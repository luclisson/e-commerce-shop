package com.ecom.shop.service;

import com.ecom.shop.dto.AccountDto;
import com.ecom.shop.dto.AccountPageDto;
import com.ecom.shop.entity.Account;
import com.ecom.shop.repository.AccountRepo;
import com.ecom.shop.repository.AddressRepo;
import com.ecom.shop.repository.ProductSecHandRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepo accountRepo;
    private final AccountMapperService accountMapperService;
    private final ProductSecHandRepo productSecHandRepo;
    private final ProductSecHandMapperService productSecHandMapperService;

    public Optional<AccountDto> getAccountById(Integer id){
        return accountRepo.findById(id)
                .map(accountMapperService::toAccountDto);
    }

    public Optional<Account> getAccountByUsername(String username){
        return accountRepo.findByUsername(username);
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
                accountMapperService.toAccountDto(accountRepo.findByUsername(username).orElseThrow()),
                productSecHandRepo.getAllByUsername(username)
                        .stream()
                        .map(productSecHandMapperService::toProductSecHandDto)
                        .collect(Collectors.toList())
        );
    };


    public void updateAccountData(AccountDto accountDto){

        Account account = accountRepo.findByUsername(accountDto.getUsername()).orElseThrow();
        account.setFirstName(accountDto.getFirstName());
        account.setLastName(accountDto.getLastName());
        account.setEmail(accountDto.getEmail());
        account.setBirthday(accountDto.getBirthday());
        account.setGender(accountDto.getGender());

        account.getAddress().setPostcode(accountDto.getAddressDto().getPostcode());
        account.getAddress().setProvince(accountDto.getAddressDto().getProvince());
        account.getAddress().setStreet(accountDto.getAddressDto().getStreet());

        accountRepo.save(account);

    }
}

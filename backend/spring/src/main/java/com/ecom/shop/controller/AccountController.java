package com.ecom.shop.controller;

import com.ecom.shop.dto.AccountCreationDto;
import com.ecom.shop.dto.AccountDto;
import com.ecom.shop.dto.AccountPageDto;
import com.ecom.shop.dto.CredentialsDto;
import com.ecom.shop.entity.Watchlist;
import com.ecom.shop.repository.WatchlistRepo;
import com.ecom.shop.service.AccountService;
import com.ecom.shop.service.CredentialService;
import lombok.RequiredArgsConstructor;
import org.aspectj.apache.bcel.classfile.JavaClass;
import org.jboss.logging.Logger;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.sql.Date;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private static final Logger logger = Logger.getLogger(JavaClass.class.getName());
    private final AccountService accountService;
    private final CredentialService credentialService;

    @GetMapping("/getAccountById/{id}")
    public Optional<AccountDto> getAccountById(@PathVariable int id){
        return accountService.getAccountById(id);
    }

    @PostMapping("/createAccount")
    public AccountCreationDto createAccount(@RequestBody AccountCreationDto accountDto){
        logger.info("user creation was called using the following rq body:\n" + accountDto.toString());

        accountService.createAccount(accountDto.getStreet(),
                                    accountDto.getPostcode(),
                                    accountDto.getProvince(),
                                    accountDto.getFirstname(),
                                    accountDto.getLastname(),
                                    accountDto.getEmail(),
                                    new Date(accountDto.getBirthday().getDate()),
                                    accountDto.getUsername(),
                                    accountDto.getPassword(),
                                    false
        );
        return accountDto;
    }

    @PostMapping("/validateLogin")
    public Boolean validateLogin(@RequestBody CredentialsDto credentialsDto){
        logger.info("user wants to log in" + credentialsDto.toString());
        CredentialsDto backendCredentialsObject = credentialService.findByUsername(credentialsDto.getUsername());
        if (backendCredentialsObject == null) return false; //if user isnt found, return false
        return backendCredentialsObject.getPassword().equals(credentialsDto.getPassword());
    }
    @GetMapping("/getAccountPageData/{username}")
    public AccountPageDto getAccountPageData(@PathVariable String username){
        return accountService.getAccountPageData(username);
    }
    /*
    @PostMapping("/updateUserData/{username}")

     */
}

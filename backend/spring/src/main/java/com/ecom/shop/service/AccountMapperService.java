// ...existing code...
package com.ecom.shop.service;

import com.ecom.shop.dto.AccountDto;
import com.ecom.shop.entity.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountMapperService {
    private final AddressMapperService mapper;
    private final CredentialService credentialService;
    public AccountDto toAccountDto(Account a) {
        if (a == null) return null;
        return new AccountDto(
                a.getFirstName(),
                a.getLastName(),
                credentialService.findUsernameByAccountId(a.getAccountId()),
                mapper.toAddressDto(a.getAddress()),
                a.getEmail(),
                a.getBirthday(),
                a.getGender(),
                a.getIsGuest()
        );
    }
}


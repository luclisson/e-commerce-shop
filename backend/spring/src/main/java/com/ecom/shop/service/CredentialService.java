package com.ecom.shop.service;

import com.ecom.shop.dto.CredentialsDto;
import com.ecom.shop.entity.Credentials;
import com.ecom.shop.repository.CredentialRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CredentialService {
    private final CredentialRepo credentialRepo;
    private final CredentialsMapperService credentialsMapperService;

    public CredentialsDto findByUsername(String username){
        Credentials creds = credentialRepo.findByUsername(username);
        return credentialsMapperService.toCredentialsDto(creds);
    }

    public String findUsernameByAccountId(int id){
        return credentialRepo.findUsernameByAccountId(id);
    }
}

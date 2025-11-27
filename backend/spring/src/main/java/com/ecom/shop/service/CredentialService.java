package com.ecom.shop.service;

import com.ecom.shop.dto.CredentialsDto;
import com.ecom.shop.entity.Credentials;
import com.ecom.shop.repository.CredentialRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CredentialService {
    private final CredentialRepo credentialRepo;
    private final DtoMapperService dtoMapperService;

    public CredentialsDto findByUsername(String username){
        return dtoMapperService.toCredentialsDto(credentialRepo.findByUsername(username));
    }
}

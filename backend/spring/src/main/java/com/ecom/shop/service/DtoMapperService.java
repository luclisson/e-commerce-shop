package com.ecom.shop.service;

import com.ecom.shop.dto.*;
import com.ecom.shop.entity.*;
import org.springframework.stereotype.Service;

@Service
public class DtoMapperService {

    public AccountDto toAccountDto(Account a) {
        if (a == null) return null;
        return new AccountDto(
                a.getFirstName(),
                a.getLastName(),
                a.getEmail(),
                a.getBirthday(),
                a.getGender(),
                a.getIsGuest()
        );
    }

    public AddressDto toAddressDto(Address a) {
        if (a == null) return null;
        return new AddressDto(
                a.getStreet(),
                a.getPostcode(),
                a.getProvince()
        );
    }

    public CategoryDto toCategoryDto(Category c) {
        if (c == null) return null;
        return new CategoryDto(
                c.getName(), c.getDescription()
        );
    }

    public CredentialsDto toCredentialsDto(Credentials c) {
        if (c == null) return null;
        return new CredentialsDto(
                c.getUsername(),
                c.getPassword(),
                c.getLastLogin()
        );
    }

    public OfferDto toOfferDto(Offer o) {
        if (o == null) return null;
        return new OfferDto(
                o.getProductId(),
                o.getAccountId(),
                o.getOfferPrice(),
                o.getOfferAmount(),
                o.getOfferTitle()
        );
    }

    public OrderDto toOrderDto(Order o) {
        if (o == null) return null;
        return new OrderDto(
                o.getPaymentMethod(),
                o.getOrderPrice(),
                o.getDate(),
                o.getStatus()
        );
    }

    public OrderOfferDto toOrderOfferDto(OrderOffer oo) {
        if (oo == null) return null;
        return new OrderOfferDto(
                oo.getOrderId(),
                oo.getOfferId(),
                oo.getQuantity()
        );
    }

    public ProductDto toProductDto(Product p) {
        if (p == null) return null;
        return new ProductDto(
                p.getCategoryId(),
                p.getAccountId(),
                p.getDescription(),
                p.getPrice(),
                p.getAmount(),
                p.getCondition(),
                p.getTitle(),
                p.getStatus()
        );
    }

    public ProductImageDto toProductImageDto(ProductImage pi) {
        if (pi == null) return null;
        return new ProductImageDto(
                pi.getProductId(),
                pi.getImageUrl(),
                pi.getText(),
                pi.getSortOrder(),
                pi.getIsMain()
        );
    }

    public ProductOfferDto toProductOfferDto(ProductOffer po) {
        if (po == null) return null;
        return new ProductOfferDto(
                po.getOfferId(),
                po.getProductId(),
                po.getQuantity()
        );
    }
}


package com.ecom.shop.repository;

import com.ecom.shop.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AddressRepo extends JpaRepository<Address, Integer> {
    @Query(value = "select a from Address a join Account ac on ac.address.addressId = a.addressId join Credentials c on ac.accountId = c.accountId where c.username = :username")
    public Address findAddressByUsername(@Param("username")String username);
}

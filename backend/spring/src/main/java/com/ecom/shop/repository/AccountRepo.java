package com.ecom.shop.repository;

import com.ecom.shop.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.sql.Date;

@Repository
public interface AccountRepo extends JpaRepository<Account,Integer> {
    @Query(value = "SELECT nichtdiebohne.create_account_with_address_and_credentials("+
            ":street, :postcode, :province, :firstName, :lastName, :email, :birthday, :username, :password, :isGuest) AS new_account_id",
           nativeQuery = true)
    void createAccount(
            @Param("street") String street,
            @Param("postcode") String postcode,
            @Param("province") String province,
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("email") String email,
            @Param("birthday") Date birthday,
            @Param("username") String username,
            @Param("password") String password,
            @Param("isGuest") Boolean isGuest
    );

    @Query(value = "select a from Account a join Credentials c on a.accountId=c.accountId where c.username = :username")
    Account findByUsername(@Param("username") String username);



}


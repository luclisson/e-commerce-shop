package com.ecom.shop.repository;

import com.ecom.shop.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {

    Optional<Category> findByName(String name);

    @Query(value = "SELECT * FROM get_category_descendants(:categoryName)", nativeQuery = true)
    List<Integer> getCategoryIdsIncludingSubcategories(@Param("categoryName") String categoryName);

}


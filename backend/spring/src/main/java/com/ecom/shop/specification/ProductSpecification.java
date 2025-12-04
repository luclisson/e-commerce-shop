package com.ecom.shop.specification;

import com.ecom.shop.dto.ProductFilterDto;
import com.ecom.shop.entity.ProductSecondHand;
import com.ecom.shop.repository.CategoryRepo;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductSpecification {
    private final CategoryRepo categoryRepo;

    public Specification<ProductSecondHand> filterProducts(ProductFilterDto filter){
        return ((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if(filter.getCategory() != null && !filter.getCategory().isEmpty()){
                List<Integer> categoryIds = categoryRepo.getCategoryIdsIncludingSubcategories(filter.getCategory());
                if (categoryIds == null || categoryIds.isEmpty()) {
                    return criteriaBuilder.disjunction(); // No matches
                }
                if (!categoryIds.isEmpty()) {
                    predicates.add(root.get("category").get("id").in(categoryIds));
                }
            }
            if(filter.getMinPrice() != null){
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"),filter.getMinPrice()));
            }
            if(filter.getMaxPrice() != null){
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"),filter.getMaxPrice()));
            }


            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }
}
